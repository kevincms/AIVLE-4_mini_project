package com.example.miniproject04.service;

import com.example.miniproject04.Entity.User;
import com.example.miniproject04.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User login(String loginId, String password) {

        // 사용자 조회
        User user = userRepository.findByLoginId(loginId)
                .orElseThrow(() ->
                        new IllegalArgumentException("아이디 또는 비밀번호가 잘못되었습니다.")
                );

        // 비밀번호 검증
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        // 로그인 성공
        return user;
    }
}
