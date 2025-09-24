package com.site29cm.repository;

import com.site29cm.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // username으로 사용자 조회 (로그인 시 사용)
    Optional<User> findByUsername(String username);
}