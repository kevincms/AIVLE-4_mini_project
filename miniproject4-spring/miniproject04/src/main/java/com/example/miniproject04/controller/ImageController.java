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
     * 1) 이미지 생성 (POST /api/v1/image)
     * ======================================================= */
    @PostMapping
    public ResponseEntity<?> createImage(@RequestBody Map<String, Object> req) {

        try {
            String tempUrl = (String) req.get("image_url");
            Long bookId = Long.valueOf(req.get("book_id").toString());

            // ⭐ 저장된 이미지 URL 반환
            String savedUrl = imageService.createImage(tempUrl, bookId);

            return ResponseEntity.ok(
                    Map.of(
                            "status", "success",
                            "image_url", savedUrl
                    )
            );

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", "error", "message", e.getMessage())
            );
        }
    }

    /** =======================================================
     * 2) 이미지 조회 (POST /api/v1/image/check)
     * ======================================================= */
    @PostMapping("/check")
    public ResponseEntity<?> getImage(@RequestBody Map<String, Object> req) {

        try {
            Long bookId = Long.valueOf(req.get("book_id").toString());
            GeneratedImage img = imageService.getImage(bookId);

            // img.getImageUrl() → "/images/파일명.png"
            return ResponseEntity.ok(
                    Map.of(
                            "power", "이용자",
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
     * 3) 이미지 수정 (PUT /api/v1/image/put)
     * ======================================================= */
    @PutMapping("/put")
    public ResponseEntity<?> updateImage(@RequestBody Map<String, Object> req) {

        try {
            Long bookId = Long.valueOf(req.get("book_id").toString());
            Long userId = Long.valueOf(req.get("user_id").toString());
            String tempUrl = (String) req.get("image_url");

            // ⭐ 새 이미지 URL 반환
            String updatedUrl = imageService.updateImage(bookId, tempUrl, userId);

            return ResponseEntity.ok(
                    Map.of(
                            "status", "success",
                            "image_url", updatedUrl
                    )
            );

        } catch (IllegalArgumentException e) {

            if (e.getMessage().equals("권한 없음")) {
                return ResponseEntity.status(403).body(
                        Map.of("status", "error", "message", e.getMessage())
                );
            }

            return ResponseEntity.status(404).body(
                    Map.of("status", "error", "message", e.getMessage())
            );
        }
    }
}
