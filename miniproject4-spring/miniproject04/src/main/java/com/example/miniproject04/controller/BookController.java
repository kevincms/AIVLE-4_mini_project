package com.example.miniproject04.controller;

import com.example.miniproject04.Entity.Book;
import com.example.miniproject04.Entity.User;
import com.example.miniproject04.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BookController {

    private final BookService bookService;

    //책 생성
    @PostMapping
    public ResponseEntity<?> createBook(@RequestBody Book book) {

        // 최소 유효성 검사 → 오류는 IllegalArgumentException 로 던짐
        if (book.getUser() == null ||
                book.getUser().getUserId() == null ||
                book.getTitle() == null || book.getTitle().trim().isEmpty() ||
                book.getDescription() == null || book.getDescription().trim().isEmpty()) {

            throw new IllegalArgumentException("제목과 내용을 다시 확인");
        }

        Book saved = bookService.createBook(
                book.getUser().getUserId(),
                book.getTitle(),
                book.getDescription()
        );

        return ResponseEntity.ok(
                Map.of("book_id", saved.getBookId())
        );
    }

    //책 단건 조회
    @PostMapping("/check")
    public ResponseEntity<?> checkBook(@RequestBody Book requestBook) {

        Book book = bookService.findBook(requestBook.getBookId());

        Long requestUserId = requestBook.getUser().getUserId();
        String power = book.getUser().getUserId().equals(requestUserId)
                ? "작성자" : "이용자";

        return ResponseEntity.ok(
                Map.of(
                        "power", power,
                        "title", book.getTitle(),
                        "description", book.getDescription()
                )
        );
    }
    @GetMapping("/list")
    //책 목록 조회
    public ResponseEntity<?> listBooks() {

        List<Book> books = bookService.findBooks();
        List<Map<String, Object>> data = new ArrayList<>();

        for (Book book : books) {
            Map<String, Object> item = new HashMap<>();
            item.put("book_id", book.getBookId());
            item.put("title", book.getTitle());
            item.put("description", book.getDescription());
            data.add(item);
        }

        return ResponseEntity.ok(Map.of("data", data));
    }

    //책 수정
    @PutMapping("/put")
    public ResponseEntity<?> updateBook(@RequestBody Book book) {

        bookService.updateBook(
                book.getBookId(),
                book.getUser().getUserId(),
                book.getTitle(),
                book.getDescription(),
                null
        );

        return ResponseEntity.ok().build();
    }

    //책 삭제

    @DeleteMapping("/delete/{bookId}")
    public ResponseEntity<?> deleteBook(
            @PathVariable Long bookId,
            @RequestBody User user
    ) {

        bookService.deleteBook(bookId, user.getUserId());

        return ResponseEntity.ok(
                Map.of(
                        "status", "success",
                        "message", "삭제되었습니다."
                )
        );
    }
}
