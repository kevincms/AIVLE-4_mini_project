package com.example.miniproject04.service;

import com.example.miniproject04.Entity.Book;
import com.example.miniproject04.Entity.GeneratedImage;
import com.example.miniproject04.repository.BookRepository;
import com.example.miniproject04.repository.GeneratedImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.*;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final GeneratedImageRepository imageRepository;
    private final BookRepository bookRepository;

    
    private static final String IMAGE_SAVE_DIR = System.getProperty("user.home") + File.separator + "4mp_image";

    /** =======================================================
     * 1. 이미지 등록 (프론트에서 받은 tempUrl 다운로드)
     * ======================================================= */
    @Transactional
    public void createImage(String tempUrl, Long bookId) {

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("책을 찾을 수 없습니다."));

        // 1) 프론트에서 받은 DALL·E URL 다운로드
        String localImagePath = downloadImageToLocal(tempUrl, bookId);

        // 2) DB 저장
        GeneratedImage img = new GeneratedImage();
        img.setBook(book);
        img.setImageUrl(localImagePath); // 
        imageRepository.save(img);
    }

    /** =======================================================
     * 2. 이미지 조회
     * ======================================================= */
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

    /** =======================================================
     * 3. 이미지 수정
     * ======================================================= */
    @Transactional
    public void updateImage(Long bookId, String tempUrl, Long userId) {

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("삭제된 목록입니다."));

        if (!book.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("권한 없음");
        }

        GeneratedImage img = imageRepository.findByBook(book);

        if (img == null) {
            throw new IllegalArgumentException("삭제된 목록입니다.");
        }

        // 새 이미지 다운로드
        String newLocalPath = downloadImageToLocal(tempUrl, bookId);

        img.setImageUrl(newLocalPath);
        imageRepository.save(img);
    }

    /** =======================================================
     * 임시 URL → 로컬에 저장
     * ======================================================= */
    private String downloadImageToLocal(String tempUrl, Long bookId) {

        try {
            URL url = new URL(tempUrl);
            InputStream in = url.openStream();

            // 저장 폴더 생성 (없으면 자동 생성)
            Path saveDir = Paths.get(IMAGE_SAVE_DIR);
            if (!Files.exists(saveDir)) {
                Files.createDirectories(saveDir);
            }

            // 파일명 생성 (중복 방지를 위해 UUID 활용)
            String fileName = "book_" + bookId + "_" + UUID.randomUUID() + ".png";

            Path destination = saveDir.resolve(fileName);

            // 파일 저장 (기존 파일 있으면 덮어쓰기)
            Files.copy(in, destination, StandardCopyOption.REPLACE_EXISTING);

            return destination.toString(); 

        } catch (Exception e) {
            throw new RuntimeException("이미지 다운로드 실패: " + e.getMessage());
        }
    }
}
