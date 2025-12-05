package com.example.miniproject04.service;

import com.example.miniproject04.Entity.Book;
import com.example.miniproject04.Entity.GeneratedImage;
import com.example.miniproject04.Entity.User;
import com.example.miniproject04.repository.BookRepository;
import com.example.miniproject04.repository.GeneratedImageRepository;
import com.example.miniproject04.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final GeneratedImageRepository imageRepository;

    /** --------------------------------------------
     * 1. 책 생성 (POST /api/v1/books/{user_id})
     * -------------------------------------------- */
    public Book createBook(Long userId, String title, String description) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        Book book = new Book();
        book.setUser(user);
        book.setTitle(title);
        book.setDescription(description);

        return bookRepository.save(book);
    }

    /** --------------------------------------------
     * 2. 책 단건 조회 (POST /api/v1/books/check/{book_id})
     * -------------------------------------------- */
    public Book findBook(Long bookId) {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 책입니다."));
    }

    /** --------------------------------------------
     * 3. 책 목록 조회 (GET /api/v1/books/list)
     * -------------------------------------------- */
    public List<Book> findBooks() {
        return bookRepository.findAll();
    }

    /** --------------------------------------------
     * 4. 책 수정 (PUT /api/v1/books/put/{book_id})
     * -------------------------------------------- */
    public Book updateBook(Long bookId, Long userId, String title, String description, String imageUrl) {

        Book book = findBook(bookId);

        // 작성자 검증
        if (!book.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("권한이 없습니다.");
        }

        // 업데이트 가능: title / description
        if (title != null) book.setTitle(title);
        if (description != null) book.setDescription(description);

        // 이미지 URL 업데이트 (Stored in GeneratedImage Entity)
        if (imageUrl != null) {
            GeneratedImage img = book.getGeneratedImage();

            if (img == null) { 
                img = new GeneratedImage();
                img.setImageUrl(imageUrl);
                imageRepository.save(img);
                book.setGeneratedImage(img);
            } else {
                img.setImageUrl(imageUrl);
                imageRepository.save(img);
            }
        }

        return bookRepository.save(book);
    }

    /** --------------------------------------------
     * 5. 책 삭제 (DELETE /api/v1/books/delete/{book_id})
     * -------------------------------------------- */
    public void deleteBook(Long bookId, Long userId) {

        Book book = findBook(bookId);

        if (!book.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("권한이 없습니다.");
        }

        bookRepository.delete(book);
    }
}
