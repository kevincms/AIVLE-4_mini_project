package com.example.miniproject04.controller;

import com.example.miniproject04.Entity.User;
import com.example.miniproject04.dto.ResponseDto;
import com.example.miniproject04.dto.UserDto;
import com.example.miniproject04.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ResponseDto<?>> login(@RequestBody UserDto.LoginRequest request) {

        try {

            User user = userService.login(request.getLogin_id(), request.getPassword());

            UserDto.LoginResponse responseData =
                    new UserDto.LoginResponse(user.getUserId());

            return ResponseEntity.ok(
                    new ResponseDto<>(
                            "success",
                            "로그인 성공",
                            responseData
                    )
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseDto<>(
                            "error",
                            "이메일 또는 비밀번호가 잘못되었습니다.",
                            null
                    ));
        }
    }
}
