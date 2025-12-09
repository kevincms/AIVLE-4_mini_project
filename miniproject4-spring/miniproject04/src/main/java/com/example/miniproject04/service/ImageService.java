package com.example.miniproject04.service;

import com.example.miniproject04.Entity.Book;
import com.example.miniproject04.Entity.GeneratedImage;
import com.example.miniproject04.repository.BookRepository;
import com.example.miniproject04.repository.GeneratedImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.net.URL;
import java.nio.file.*;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final GeneratedImageRepository imageRepository;
    private final BookRepository bookRepository;

    // 실제 이미지 저장 경로
    private static final String IMAGE_SAVE_DIR = "C:/images";

    /**
     * =======================================================
     * 1. 이미지 등록 (이미지 저장 후 URL 반환)
     * =======================================================
     */
    @Transactional
    public String createImage(String tempUrl, Long bookId) {

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("책을 찾을 수 없습니다."));

        // 이미지 저장 + URL 생성
        String imageUrl = downloadImageToLocal(tempUrl, bookId);

        GeneratedImage img = new GeneratedImage();
        img.setBook(book);
        img.setImageUrl(imageUrl);

        imageRepository.save(img);

        return imageUrl; // ⭐ 프론트에 반환
    }

    /**
     * =======================================================
     * 2. 이미지 조회
     * =======================================================
     */
    @Transactional(readOnly = true)
    public GeneratedImage getImage(Long bookId) {

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("삭제된 목록입니다."));

        GeneratedImage img = imageRepository.findByBook(book);

        if (img == null) {
            throw new IllegalArgumentException("삭제된 목록입니다.");
        }

        return img;
    }

    /**
     * =======================================================
     * 3. 이미지 수정 (새 이미지 덮어쓰기)
     * =======================================================
     */
    @Transactional
    public String updateImage(Long bookId, String tempUrl, Long userId) {

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("삭제된 목록입니다."));

        // 권한 확인
        if (!book.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("권한 없음");
        }

        GeneratedImage img = imageRepository.findByBook(book);

        if (img == null) {
            throw new IllegalArgumentException("삭제된 목록입니다.");
        }

        // 새 이미지 저장
        String newImageUrl = downloadImageToLocal(tempUrl, bookId);

        img.setImageUrl(newImageUrl);
        imageRepository.save(img);

        return newImageUrl; // ⭐ 프론트에 반환
    }

    /**
     * =======================================================
     * tempUrl → 로컬 저장 후 접근 가능한 URL 반환
     * =======================================================
     */
    private String downloadImageToLocal(String tempUrl, Long bookId) {

        try {
            URL url = new URL(tempUrl);
            InputStream in = url.openStream();

            // 저장 폴더 생성
            Path saveDir = Paths.get(IMAGE_SAVE_DIR);
            if (!Files.exists(saveDir)) {
                Files.createDirectories(saveDir);
            }

            // 파일명 생성
            String fileName = "book_" + bookId + "_" + UUID.randomUUID() + ".png";

            // 로컬 저장 경로
            Path destination = saveDir.resolve(fileName);

            // 이미지 저장
            Files.copy(in, destination, StandardCopyOption.REPLACE_EXISTING);

            // ⭐ DB에는 URL 경로만 저장
            return "/images/" + fileName;

        } catch (Exception e) {
            throw new RuntimeException("이미지 다운로드 실패: " + e.getMessage());
        }
    }
}
