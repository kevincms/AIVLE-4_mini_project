package com.example.miniproject04.controller;

import com.example.miniproject04.Entity.GeneratedImage;
import com.example.miniproject04.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/image")
@CrossOrigin(origins = "*")
public class ImageController {

    private final ImageService imageService;

    /** =======================================================
     *  1) 이미지 생성 (POST /api/v1/image)
     * ======================================================= */
    @PostMapping
    public ResponseEntity<?> createImage(@RequestBody Map<String, Object> req) {

        try {
            String tempUrl = (String) req.get("image_url");   // 프론트가 보내는 DALL·E URL
            Long bookId = Long.valueOf(req.get("book_id").toString());

            imageService.createImage(tempUrl, bookId);

            return ResponseEntity.ok(Map.of("status", "success"));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", "error", "message", e.getMessage())
            );
        }
    }


    /** =======================================================
     *  2) 이미지 조회 (POST /api/v1/image/check)
     * ======================================================= */
    @PostMapping("/check")
    public ResponseEntity<?> getImage(@RequestBody Map<String, Object> req) {

        try {
            Long bookId = Long.valueOf(req.get("book_id").toString());

            GeneratedImage img = imageService.getImage(bookId);

            return ResponseEntity.ok(
                    Map.of(
                            "power", "이용자",     // 명세서에 맞춤 (작성자인지 여부는 책 조회에서 처리)
                            "image_url", img.getImageUrl()
                    )
            );

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", "error", "message", e.getMessage())
            );
        }
    }


    /** =======================================================
     *  3) 이미지 수정 (PUT /api/v1/image/put)
     * ======================================================= */
    @PutMapping("/put")
    public ResponseEntity<?> updateImage(@RequestBody Map<String, Object> req) {

        try {
            Long bookId = Long.valueOf(req.get("book_id").toString());
            Long userId = Long.valueOf(req.get("user_id").toString());
            String tempUrl = (String) req.get("image_url");

            imageService.updateImage(bookId, tempUrl, userId);

            return ResponseEntity.ok(Map.of("status", "success"));

        } catch (IllegalArgumentException e) {
            // 명세서: 권한 없음 → 403 / 등록 이미지 없음 → 404
            String msg = e.getMessage();

            if (msg.equals("권한 없음")) {
                return ResponseEntity.status(403).body(
                        Map.of("status", "error", "message", msg)
                );
            } else {
                return ResponseEntity.status(404).body(
                        Map.of("status", "error", "message", msg)
                );
            }
        }
    }
}
