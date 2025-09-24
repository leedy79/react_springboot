package com.site29cm.service;

import com.site29cm.entity.Board;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
@Log4j2
class BoardServiceTest {
    @Autowired
    private BoardService boardService;

    @Test
    public void testInsert(){
        Board board = new Board();
        board.setTitle("제목 테스트5");
        board.setContent("내용 테스트5");
        board.setCreatedAt(LocalDateTime.now());
        board.setCreatedBy("leedy83");

        boardService.register(board);
    }

    @Test
    public void testupdate(){
        Board board = new Board();
        board.setId(1L);
        board.setTitle("제목수정");
        board.setContent("내용수정");
        board.setCreatedAt(LocalDateTime.now());
        boardService.update(board);
    }

    @Test
    public void testRead(){
        Long boardId = 1L;
        Board contents = boardService.read(boardId);
        log.info("contents : " + contents);
    }

    @Test
    public void testReadAll(){
        List<Board> contents = boardService.readAll();
        contents.forEach(member -> log.info(contents));
    }

    @Test
    public void testDelete(){
        Long boardId = 3L;
        boardService.delete(boardId);
    }

}