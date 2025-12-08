package com.example.miniproject04.controller;

import com.example.miniproject04.Entity.User;
import com.example.miniproject04.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> request) {

        // API 명세상 user_id:null을 포함해야 하지만, User 엔티티로 직접 매핑 시 login_id 매핑 오류가 발생하여 Controller에서는 Map으로 받아 login_id, password만 파싱함.
        try {
            String loginId = (String) request.get("login_id");
            String password = (String) request.get("password");

            // service 호출
            User user = userService.login(loginId, password);

            return ResponseEntity.ok(
                    Map.of("user_id", user.getUserId())
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "status", "error",
                            "message", "아이디 또는 비밀번호가 잘못되었습니다."
                    ));
        }
    }
}
