"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    Button,
    Card,
    Container,
    Typography,
} from "@mui/material";
import Header from "./components/Header";

export default function HomePage() {
    const router = useRouter();
    const [loginUser, setLoginUser] = useState(null);

    const books = []; // TODO: 실제 데이터

    useEffect(() => {
        const user = localStorage.getItem("loginUser");
        if (user) setLoginUser(user);
    }, []);

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f7" }}>
            <Header />

            <Container
                maxWidth="lg"
                sx={{ pt: 6, pb: 8 }}
            >
                {/* 상단 타이틀 영역 */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        mb: 4,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            fontWeight={800}
                            sx={{ mb: 1 }}
                        >
                            도서 목록
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            등록한 도서를 관리하고, AI 표지를 생성해보세요.
                        </Typography>
                    </Box>

                    {loginUser && (
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => router.push("/books/edit")}
                            sx={{ borderRadius: 999, px: 3, py: 1 }}
                        >
                            새 도서 등록
                        </Button>
                    )}
                </Box>

                {/* 메인 카드 */}
                <Card
                    sx={{
                        borderRadius: 3,
                        minHeight: 360,
                        p: 5,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0 12px 32px rgba(15,23,42,0.08)",
                        border: "1px solid rgba(148,163,184,0.3)",
                        bgcolor: "white",
                    }}
                >
                    {books.length === 0 ? (
                        <Box textAlign="center">
                            <Typography
                                variant="h6"
                                fontWeight={600}
                                sx={{ mb: 1 }}
                            >
                                아직 등록된 도서가 없습니다.
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                첫 도서를 등록하고 AI 표지를 생성해보세요.
                            </Typography>

                            <Button
                                variant="contained"
                                onClick={() => router.push("/books/edit")}
                                sx={{ px: 3, py: 1.1 }}
                            >
                                새 도서 등록하기
                            </Button>
                        </Box>
                    ) : (
                        <Typography>도서 목록 표시 영역 (TODO)</Typography>
                    )}
                </Card>
            </Container>
        </Box>
    );
}