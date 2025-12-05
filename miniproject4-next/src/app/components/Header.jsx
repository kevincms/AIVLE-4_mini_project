"use client";

import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
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

    // "/books/edit" 페이지 → 새 도서 등록 숨김
    const hideCreateButton = pathname.startsWith("/books/edit");

    // "/login" 페이지 → 모든 우측 버튼 숨김
    const hideAllButtons = pathname === "/login";

    return (
        <AppBar position="static" color="primary" sx={{ mb: 3 }}>
            <Toolbar>

                {/* 왼쪽 타이틀 (이제 클릭 기능 없음) */}
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    도서관리
                </Typography>

                {/* 로그인 페이지에서는 오른쪽 버튼 전체 숨김 */}
                {!hideAllButtons && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {/* 로그인 안 했을 때 */}
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

                        {/* 로그인 했을 때 */}
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
                )}
            </Toolbar>
        </AppBar>
    );
}
