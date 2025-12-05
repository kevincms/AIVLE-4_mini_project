package com.example.miniproject04.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "generated_image")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GeneratedImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imgId;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @OneToOne(mappedBy = "generatedImage", fetch = FetchType.LAZY)
    private Book book;
}
