"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Card,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import Header from "../components/Header";

export default function LoginPage() {
    const router = useRouter();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    // ⭐ Dialog 상태
    const [dialog, setDialog] = useState({
        open: false,
        title: "",
        message: "",
        success: false
    });

    const openDialog = (title, message, success = false) => {
        setDialog({
            open: true,
            title,
            message,
            success
        });
    };

    const closeDialog = () => {
        setDialog({ ...dialog, open: false });

        // 성공 시 홈으로 이동
        if (dialog.success) {
            router.replace("/");
        }
    };

    const handleLogin = () => {
        if (id === "test" && pw === "test01") {
            localStorage.setItem("loginUser", id);

            openDialog(
                "로그인 성공",
                "환영합니다! 도서 목록 페이지로 이동합니다.",
                true
            );

        } else {
            openDialog(
                "로그인 실패",
                "아이디 또는 비밀번호가 올바르지 않습니다.",
                false
            );
        }
    };

    return (
        <Container maxWidth={false} sx={{ maxWidth: 600, mt: 5, mb: 8 }}>
            <Header />

            <Card
                sx={{
                    p: 4,
                    mt: 5,
                    borderRadius: 3,
                    border: "1px solid rgba(0,0,0,0.2)"
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    fontWeight={800}
                    sx={{ mb: 4 }}
                >
                    로그인
                </Typography>

                <TextField
                    fullWidth
                    label="아이디"
                    size="medium"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <TextField
                    fullWidth
                    type="password"
                    label="비밀번호"
                    size="medium"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleLogin}
                    sx={{ py: 1.5, mb: 2 }}
                >
                    로그인
                </Button>

                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() =>
                        openDialog("안내", "회원가입 기능은 준비 중입니다.")
                    }
                    sx={{ py: 1.3, mb: 1 }}
                >
                    회원가입
                </Button>

                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => router.push("/")}
                    sx={{ py: 1.3 }}
                >
                    도서 목록으로 돌아가기
                </Button>
            </Card>

            {/* ⭐ Dialog 팝업 */}
            <Dialog open={dialog.open} onClose={closeDialog}>
                <DialogTitle>{dialog.title}</DialogTitle>

                <DialogContent>
                    <DialogContentText>{dialog.message}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog} autoFocus>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
