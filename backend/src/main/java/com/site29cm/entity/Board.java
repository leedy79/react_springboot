package com.site29cm.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "board")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;
    private String title;
    private String content;

    @CreationTimestamp // 자동 생성@CreationTimestamp // 자동 생성
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String createdBy; // 작성자 정보 (로그인한 사용자 ID)

}
