// src/components/Header.jsx

"use client";

import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname(); // ⭐ 현재 페이지 경로
    const [user, setUser] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("loginUser");
        if (saved) setUser(saved);
    }, []);

    const handleLogout = () => {
        if (confirm("로그아웃하시겠습니까?")) {
            localStorage.removeItem("loginUser");
            router.replace("/login");
        }
    };

    // ⭐ "/books/edit" 페이지에서는 '새 도서 등록' 숨기기
    const hideCreateButton = pathname.startsWith("/books/edit");

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                {/* 왼쪽 타이틀 */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    도서관리
                </Typography>

                {/* 오른쪽 메뉴들 */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {/* 로그인 안 했으면 */}
                    {!user && (
                        <>
                            <Button component={Link} href="/login" color="inherit">
                                로그인
                            </Button>

                            {!hideCreateButton && (
                                <Button
                                    component={Link}
                                    href="/books/edit"
                                    variant="contained"
                                    sx={{ bgcolor: "secondary.main" }}
                                >
                                    새 도서 등록
                                </Button>
                            )}
                        </>
                    )}

                    {/* 로그인 했으면 */}
                    {user && (
                        <>
                            <Typography sx={{ mr: 1, fontWeight: "bold" }}>
                                {user} 님
                            </Typography>

                            {!hideCreateButton && (
                                <Button
                                    component={Link}
                                    href="/books/edit"
                                    variant="contained"
                                    sx={{ bgcolor: "secondary.main" }}
                                >
                                    새 도서 등록
                                </Button>
                            )}

                            <Button color="inherit" onClick={handleLogout}>
                                로그아웃
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
