package com.site29cm.controller;

import com.site29cm.entity.Board;
import com.site29cm.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/board")
@RequiredArgsConstructor
@Log4j2
public class BoardController {

    private final BoardService boardService;

    //@GetMapping("/list")
    //public String list(Model model){
    //    List<Board> contents = boardService.readAll();
    //    model.addAttribute("contents", contents);
    //    log.info(contents);
    //    return "board/list";
    //}

    @GetMapping("/list")
    public String list2(@RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "3") int size, Model model) {
        Pageable pageable = (Pageable) PageRequest.of(page, size);
        Page<Board> boardPage = boardService.readAllPage(pageable);
        model.addAttribute("boardPage", boardPage);
        // return "list";
        return "board/list";
    }

    @GetMapping("/new")
    public String createForm(Model model){
        log.info("create.............");
        model.addAttribute("board", new Board());
        return "board/newForm";
    }
    @PostMapping("/new")
    public String create(@ModelAttribute("board") Board board){
        log.info("------------------------");
        boardService.register(board);
        return "redirect:list";
    }

    @GetMapping("/edit/{id}")
    public String updateForm(@PathVariable("id") String id, Model model){
        Long boardId = Long.parseLong(id);
        Board content = boardService.read(boardId);
        model.addAttribute("content", content);
        return "board/updateForm";
    }

    @PostMapping("/update")
    public String update(@ModelAttribute Board board){
        log.info("update..........." + board);
        boardService.register(board);
        return "redirect:list";
    }

    @PostMapping("/delete/{id}")
    public String delete(@PathVariable("id") String id){
        Long boardId = Long.parseLong(id);
        boardService.delete(boardId);
        return "redirect:/board/list";
    }



}
