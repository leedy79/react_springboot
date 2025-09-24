package com.site29cm.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Controller
@Log4j2
@RequestMapping("/sentiment")
public class SentimentController {

    /**
     * 감성 분석 폼을 보여주는 메서드.
     * 최근 리뷰 5개도 함께 조회하여 전달한다.
     */
    @GetMapping("/form")
    public String showForm(Model model) {
        String apiUrl = "http://localhost:5000/api/reviews"; // Flask API 주소
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Flask 서버로부터 최근 리뷰 5개 GET 요청
            ResponseEntity<Object[]> recentResponse = restTemplate.getForEntity(apiUrl, Object[].class);

            // 응답이 성공이고 본문이 null이 아닌 경우 → 뷰에 recent_reviews 전달
            if (recentResponse.getStatusCode() == HttpStatus.OK && recentResponse.getBody() != null) {
                model.addAttribute("recent_reviews", recentResponse.getBody());
            } else {
                model.addAttribute("recent_reviews", new Object[0]);  // 빈 배열 전달
            }
        } catch (Exception e) {
            log.error("최근 리뷰 가져오기 실패", e);
            model.addAttribute("recent_reviews", new Object[0]); // 예외 발생 시에도 빈 배열
        }

        return "sentiment/form";
    }

    /**
     * 사용자가 입력한 리뷰를 Flask 서버에 전달해 감성 분석 후
     * 결과와 유사 리뷰 추천, 최근 리뷰를 model에 담아 result.html로 이동한다.
     */
    @PostMapping("/analyze")
    public String analyze(@RequestParam("review") String review, Model model) {
        String analyzeUrl = "http://localhost:5000/api/analyze";  // 감성 분석 API
        String recentUrl = "http://localhost:5000/api/reviews";   // 최근 리뷰 API

        // Flask API에 HTTP 요청을 보내기 위한 RestTemplate 객체 생성
        RestTemplate restTemplate = new RestTemplate();

        // Flask에 전달할 JSON 요청 바디 구성
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("review", review);

        // JSON 요청 헤더 구성
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 최종 요청 객체 구성
        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            // 감성 분석 POST 요청
            ResponseEntity<Map> analyzeResponse = restTemplate.postForEntity(analyzeUrl, requestEntity, Map.class);

            if (analyzeResponse.getStatusCode() == HttpStatus.OK && analyzeResponse.getBody() != null) {
                Object sentiment = analyzeResponse.getBody().get("sentiment");
                Object recommendations = analyzeResponse.getBody().get("recommendations");

                // 응답에서 감성 점수와 추천 리뷰 추출
                model.addAttribute("review", review);
                model.addAttribute("sentiment", sentiment);
                model.addAttribute("recommendations", recommendations);
            } else {
                model.addAttribute("error", "감성 분석 결과를 받지 못했습니다. 다시 시도해주세요.");
            }
        } catch (Exception e) {
            log.error("Flask API 호출 실패", e);
            model.addAttribute("error", "감성 분석 요청 실패: " + e.getMessage());
        }

        // 최근 리뷰도 같이 요청
        try {
            ResponseEntity<Object[]> recentResponse = restTemplate.getForEntity(recentUrl, Object[].class);

            if (recentResponse.getStatusCode() == HttpStatus.OK && recentResponse.getBody() != null) {
                model.addAttribute("recent_reviews", recentResponse.getBody());
            } else {
                model.addAttribute("recent_reviews", new Object[0]);
            }
        } catch (Exception e) {
            log.error("최근 리뷰 가져오기 실패", e);
            model.addAttribute("recent_reviews", new Object[0]);
        }

        return "sentiment/result";
    }
}
