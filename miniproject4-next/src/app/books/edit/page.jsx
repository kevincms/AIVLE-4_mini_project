"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import {
    Box,
    Button,
    Card,
    Container,
    FormControl,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";

export default function BookEditPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookId = searchParams.get("bookId");
    const isEditMode = !!bookId;

    // 로그인 체크
    useEffect(() => {
        const user = localStorage.getItem("loginUser");
        if (!user) {
            alert("로그인 후 이용할 수 있습니다.");
            router.replace("/login");
        }
    }, []);

    // 입력 상태
    const [apiKey, setApiKey] = useState("");
    const [model, setModel] = useState("dall-e-2"); // ⭐ 모델 선택 기능
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverUrl, setCoverUrl] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateCover = () => {
        if (!title.trim() || !content.trim() || !apiKey.trim()) {
            alert("제목, 내용, API Key를 모두 입력해주세요.");
            return;
        }

        setIsGenerating(true);
        setCoverUrl("");

        setTimeout(() => {
            setCoverUrl("https://placehold.co/400x600?text=AI+Cover");
            setIsGenerating(false);
        }, 1500);
    };

    const handleSubmit = () => {
        if (!title.trim() || !content.trim() || !coverUrl) {
            alert("책 제목, 내용, 표지를 모두 입력해주세요.");
            return;
        }

        if (isEditMode) {
            alert(`도서(id: ${bookId}) 수정 요청 전송 (TODO)`);
        } else {
            alert("새 도서 등록 요청 전송 (TODO)");
        }

        router.push("/");
    };

    const handleBackToList = () => {
        router.push("/");
    };

    return (
        <Container maxWidth={false} sx={{ maxWidth: 1400, mt: 3, mb: 4 }}>
            <Header />

            {/* 제목 */}
            <Typography
                variant="h4"
                align="center"
                fontWeight={800}
                gutterBottom
            >
                AI 표지 생성
            </Typography>

            {/* API Key 입력 */}
            <Box mt={3}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                    API 입력
                </Typography>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="OpenAI API Key 입력"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
            </Box>

            {/* ⭐ 모델 선택 영역 복원 */}
            <Box mt={2}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                    모델 선택
                </Typography>
                <FormControl fullWidth size="small">
                    <Select
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    >
                        <MenuItem value="dall-e-2">
                            DALL·E 2 (기본, 1024×1024)
                        </MenuItem>
                        <MenuItem value="dall-e-3">
                            DALL·E 3 (고품질, 1024×1792)
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* 표지 + 책 내용 */}
            <Box mt={3} display="flex" gap={3} alignItems="stretch">
                {/* 표지 */}
                <Box flex="0 0 32%">
                    <Card
                        sx={{
                            borderRadius: 3,
                            minHeight: 480,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid rgba(0,0,0,0.15)",
                        }}
                    >
                        {coverUrl ? (
                            <Box
                                component="img"
                                src={coverUrl}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 3,
                                    objectFit: "cover",
                                }}
                            />
                        ) : (
                            <Typography variant="h4">표지</Typography>
                        )}
                    </Card>
                </Box>

                {/* 책 내용 입력 */}
                <Box flex="1 1 0">
                    <Card
                        sx={{
                            width: "100%",
                            borderRadius: 3,
                            minHeight: 480,
                            p: 3,
                            border: "1px solid rgba(0,0,0,0.15)",
                        }}
                    >
                        <Typography
                            variant="h6"
                            textAlign="center"
                            fontWeight={700}
                            sx={{ mb: 3 }}
                        >
                            책 내용
                        </Typography>

                        <TextField
                            fullWidth
                            size="small"
                            label="책 제목 (입력)"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            fullWidth
                            multiline
                            minRows={7}
                            label="책 내용 (입력)"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Card>
                </Box>
            </Box>

            {/* 버튼 영역 */}
            <Box mt={3} display="flex" justifyContent="flex-end" gap={1.5}>
                <Button
                    variant="outlined"
                    onClick={handleGenerateCover}
                    disabled={isGenerating}
                >
                    표지 생성
                </Button>

                <Button variant="contained" onClick={handleSubmit}>
                    {isEditMode ? "수정" : "등록"}
                </Button>
            </Box>

            {/* ⭐ 도서 목록으로 돌아가기 버튼 복원 */}
            <Box mt={2} textAlign="center">
                <Button variant="outlined" onClick={handleBackToList}>
                    도서 목록으로 돌아가기
                </Button>
            </Box>
        </Container>
    );
}

