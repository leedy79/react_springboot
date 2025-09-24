package com.site29cm.service;

import com.site29cm.entity.Board;
import com.site29cm.repository.BoardRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Getter
@Setter
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public void register(Board board) {
        boardRepository.save(board);
    }

    public Board read(Long boardId){
        //memberId 값을 DB에서 조회해서  없으면 예외 발생
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found with id: " + boardId));
        return  board;
    }

    public void update(Board board) {
        boardRepository.save(board);
    }

    public List<Board> readAll(){
        List<Board> contents = boardRepository.findAll();
        return contents;
    }

    public void delete(Long boardId) {
        boardRepository.deleteById(boardId);
    }

    //paging
    public Page<Board> readAllPage(Pageable pageable){
        Page<Board> boardPage = boardRepository.findAll(pageable);
        return boardPage;
    }
}
