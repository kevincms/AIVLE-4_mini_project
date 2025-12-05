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

    // TODO: 실제 데이터 받아오기 (현재는 임시 빈 배열)
    const books = [];

    useEffect(() => {
        const user = localStorage.getItem("loginUser");
        if (user) setLoginUser(user);
    }, []);

    return (
        <Container
            maxWidth={false}
            sx={{ maxWidth: 1400, mt: 4, mb: 4, ml: 32}}
        >
            <Header />

            {/* 페이지 제목 */}
            <Typography
                variant="h4"
                align="center"
                fontWeight={800}
                sx={{ mt: 4, mb: 4 }}
            >
                도서 목록
            </Typography>

            {/* 메인 영역 */}
            <Card
                sx={{
                    borderRadius: 3,
                    minHeight: 400,
                    p: 4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid rgba(0,0,0,0.2)",
                }}
            >
                {books.length === 0 ? (
                    <Box textAlign="center">
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            등록된 도서가 없습니다.
                        </Typography>

                        <Button
                            variant="outlined"
                            onClick={() => router.push("/books/edit")}
                        >
                            새 도서 등록하기
                        </Button>
                    </Box>
                ) : (
                    <Typography>도서 목록 표시 영역 (TODO)</Typography>
                )}
            </Card>
        </Container>
    );
}
