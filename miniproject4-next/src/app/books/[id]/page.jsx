"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Box, Typography, Button, Paper } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import Header from "../../components/Header";

export default function BookDetailPage() {
    const params = useParams();
    const router = useRouter();
    const bookId = params.id;

    const [book, setBook] = useState({
        title: "도서 상세 정보",
        author: "저자 (출력)",
        coverUrl: "https://via.placeholder.com/350x450?text=실제+표지+이미지+URL",
        createdAt: "2025. 5. 23.",
        updatedAt: "2025. 5. 23.",
        contents:
            "책 내용 (출력): 이 책은 AI 기반 도서 표지 생성 프로젝트의 과정을 담고 있습니다.",
    });

    useEffect(() => {
        if (bookId) {
            console.log(`도서 ID ${bookId} 상세 정보 로드`);
            // TODO: 실제 API 호출 후 setBook
        }
    }, [bookId]);

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f7" }}>
            <Header />

            {/* 전체 폭을 편집 페이지처럼 넓게 사용 */}
            <Container
                maxWidth={false}
                sx={{ maxWidth: 1400, pt: 6, pb: 8 }}
            >
                {/* 상단 헤더 영역 */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                    }}
                >
                    <Box>
                        <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
                            도서 상세 정보
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            생성된 표지와 책 내용을 확인하고 관리할 수 있습니다.
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                                router.push(`/books/edit?bookId=${bookId}`)
                            }
                        >
                            수정
                        </Button>
                        <Button variant="contained" color="error">
                            삭제
                        </Button>
                    </Box>
                </Box>

                {/* 👉 편집 페이지처럼 flex 레이아웃으로 변경 */}
                <Box
                    mt={3}
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    gap={3}
                    alignItems="stretch"
                >
                    {/* 왼쪽: 표지 영역 (편집 페이지와 비슷한 폭) */}
                    <Box flex={{ xs: "none", md: "0 0 32%" }}>
                        <Paper
                            elevation={3}
                            sx={{
                                borderRadius: 3,
                                minHeight: 520,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                                boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
                            }}
                        >
                            {book.coverUrl ? (
                                <Box
                                    component="img"
                                    src={book.coverUrl}
                                    alt="도서 표지"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: 2,
                                    }}
                                />
                            ) : (
                                <Typography variant="h6" color="text.secondary">
                                    표지 이미지 없음
                                </Typography>
                            )}
                        </Paper>
                    </Box>

                    {/* 오른쪽: 책 내용 카드 (나머지 전체 폭 사용) */}
                    <Box flex="1 1 0">
                        <Paper
                            elevation={1}
                            sx={{
                                borderRadius: 3,
                                p: 4,
                                minHeight: 520,
                                boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
                                bgcolor: "white",
                            }}
                        >
                            <Typography variant="h5" gutterBottom fontWeight={700}>
                                {book.title}
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                저자: {book.author}
                            </Typography>

                            <Box
                                sx={{
                                    border: "1px solid rgba(148,163,184,0.6)",
                                    borderRadius: 2,
                                    p: 3,
                                    minHeight: 320,
                                    mb: 4,
                                    bgcolor: "#f9fafb",
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    sx={{ mb: 1, fontWeight: 600 }}
                                >
                                    책 내용
                                </Typography>
                                <Typography variant="body1">
                                    {book.contents}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                    color: "text.secondary",
                                    fontSize: 13,
                                }}
                            >
                                <Typography>생성일: {book.createdAt}</Typography>
                                <Typography>수정일: {book.updatedAt}</Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Box>

                {/* 뒤로가기 버튼 */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Button
                        variant="outlined"
                        component={Link}
                        href="/"
                        color="primary"
                    >
                        도서 목록으로 돌아가기
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}