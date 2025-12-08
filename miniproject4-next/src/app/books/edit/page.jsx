// "use client";
//
// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Header from "../../components/Header";
// import {
//     Box,
//     Button,
//     Card,
//     Container,
//     FormControl,
//     MenuItem,
//     Select,
//     TextField,
//     Typography,
// } from "@mui/material";
//
// export default function BookEditPage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const bookId = searchParams.get("bookId");
//     const isEditMode = !!bookId;
//
//     useEffect(() => {
//         const user = localStorage.getItem("loginUser");
//         if (!user) {
//             alert("로그인 후 이용할 수 있습니다.");
//             router.replace("/login");
//         }
//     }, [router]);
//
//     const [apiKey, setApiKey] = useState("");
//     const [model, setModel] = useState("dall-e-2");
//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const [coverUrl, setCoverUrl] = useState("");
//     const [isGenerating, setIsGenerating] = useState(false);
//
//     const handleGenerateCover = () => {
//         if (!title.trim() || !content.trim() || !apiKey.trim()) {
//             alert("제목, 내용, API Key를 모두 입력해주세요.");
//             return;
//         }
//
//         setIsGenerating(true);
//         setCoverUrl("");
//
//         setTimeout(() => {
//             setCoverUrl("https://placehold.co/400x600?text=AI+Cover");
//             setIsGenerating(false);
//         }, 1500);
//     };
//
//     const handleSubmit = () => {
//         if (!title.trim() || !content.trim() || !coverUrl) {
//             alert("책 제목, 내용, 표지를 모두 입력해주세요.");
//             return;
//         }
//
//         if (isEditMode) {
//             alert(`도서(id: ${bookId}) 수정 요청 전송 (TODO)`);
//         } else {
//             alert("새 도서 등록 요청 전송 (TODO)");
//         }
//
//         router.push("/");
//     };
//
//     const handleBackToList = () => {
//         router.push("/");
//     };
//
//     return (
//         <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f7" }}>
//             <Header />
//
//             <Container maxWidth="lg" sx={{ pt: 6, pb: 8 }}>
//                 {/* 제목 영역 */}
//                 <Box sx={{ mb: 4 }}>
//                     <Typography
//                         variant="h4"
//                         fontWeight={800}
//                         sx={{ mb: 1 }}
//                         align="left"
//                     >
//                         AI 표지 생성
//                     </Typography>
//                     <Typography
//                         variant="body2"
//                         color="text.secondary"
//                     >
//                         책 내용을 입력하고 OpenAI를 통해 표지를 생성해보세요.
//                     </Typography>
//                 </Box>
//
//                 {/* API Key + 모델 선택 */}
//                 <Card
//                     sx={{
//                         borderRadius: 3,
//                         p: 3,
//                         mb: 3,
//                         boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
//                         border: "1px solid rgba(148,163,184,0.4)",
//                     }}
//                 >
//                     <Box>
//                         <Typography variant="body2" sx={{ mb: 0.5 }}>
//                             API 입력
//                         </Typography>
//                         <TextField
//                             fullWidth
//                             size="small"
//                             placeholder="OpenAI API Key 입력"
//                             type="password"
//                             value={apiKey}
//                             onChange={(e) => setApiKey(e.target.value)}
//                             sx={{ mb: 2 }}
//                         />
//                     </Box>
//
//                     <Box>
//                         <Typography variant="body2" sx={{ mb: 0.5 }}>
//                             모델 선택
//                         </Typography>
//                         <FormControl fullWidth size="small">
//                             <Select
//                                 value={model}
//                                 onChange={(e) => setModel(e.target.value)}
//                             >
//                                 <MenuItem value="dall-e-2">
//                                     DALL·E 2 (기본, 1024×1024)
//                                 </MenuItem>
//                                 <MenuItem value="dall-e-3">
//                                     DALL·E 3 (고품질, 1024×1792)
//                                 </MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Box>
//                 </Card>
//
//                 {/* 표지 + 내용 */}
//                 <Box
//                     mt={3}
//                     display="flex"
//                     flexDirection={{ xs: "column", md: "row" }}
//                     gap={3}
//                     alignItems="stretch"
//                 >
//                     {/* 표지 카드 */}
//                     <Box flex={{ xs: "none", md: "0 0 32%" }}>
//                         <Card
//                             sx={{
//                                 borderRadius: 3,
//                                 minHeight: 480,
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 border: "1px solid rgba(148,163,184,0.6)",
//                                 boxShadow: "0 10px 28px rgba(15,23,42,0.12)",
//                                 bgcolor: "white",
//                             }}
//                         >
//                             {coverUrl ? (
//                                 <Box
//                                     component="img"
//                                     src={coverUrl}
//                                     sx={{
//                                         width: "100%",
//                                         height: "100%",
//                                         borderRadius: 3,
//                                         objectFit: "cover",
//                                     }}
//                                 />
//                             ) : (
//                                 <Typography
//                                     variant="h5"
//                                     color="text.secondary"
//                                 >
//                                     표지 미리보기
//                                 </Typography>
//                             )}
//                         </Card>
//                     </Box>
//
//                     {/* 책 내용 입력 카드 */}
//                     <Box flex="1 1 0">
//                         <Card
//                             sx={{
//                                 width: "100%",
//                                 borderRadius: 3,
//                                 minHeight: 480,
//                                 p: 3,
//                                 border: "1px solid rgba(148,163,184,0.6)",
//                                 boxShadow: "0 10px 28px rgba(15,23,42,0.12)",
//                                 bgcolor: "white",
//                             }}
//                         >
//                             <Typography
//                                 variant="h6"
//                                 textAlign="center"
//                                 fontWeight={800}
//                                 sx={{ mb: 3 }}
//                             >
//                                 책 내용
//                             </Typography>
//
//                             <TextField
//                                 fullWidth
//                                 size="small"
//                                 label="책 제목 (입력)"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 sx={{ mb: 3 }}
//                             />
//
//                             <TextField
//                                 fullWidth
//                                 multiline
//                                 minRows={7}
//                                 label="책 내용 (입력)"
//                                 value={content}
//                                 onChange={(e) => setContent(e.target.value)}
//                             />
//                         </Card>
//                     </Box>
//                 </Box>
//
//                 {/* 버튼 영역 */}
//                 <Box
//                     mt={3}
//                     display="flex"
//                     justifyContent="flex-end"
//                     gap={1.5}
//                 >
//                     <Button
//                         variant="outlined"
//                         onClick={handleGenerateCover}
//                         disabled={isGenerating}
//                     >
//                         {isGenerating ? "생성 중..." : "표지 생성"}
//                     </Button>
//
//                     <Button variant="contained" onClick={handleSubmit}>
//                         {isEditMode ? "수정" : "등록"}
//                     </Button>
//                 </Box>
//
//                 <Box mt={2} textAlign="center">
//                     <Button variant="text" onClick={handleBackToList}>
//                         도서 목록으로 돌아가기
//                     </Button>
//                 </Box>
//             </Container>
//         </Box>
//     );
// }

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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    CircularProgress,
} from "@mui/material";

export default function BookEditPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookId = searchParams.get("bookId");
    const isEditMode = !!bookId;

    // 🔹 Dialog 상태
    const [dialogState, setDialogState] = useState({
        open: false,
        title: "",
        message: "",
    });
    const closeDialog = () =>
        setDialogState((prev) => ({
            ...prev,
            open: false,
        }));

    // 🔹 로그인 체크 (alert 대신 Dialog + redirect)
    useEffect(() => {
        const user = localStorage.getItem("loginUser");
        if (!user) {
            setDialogState({
                open: true,
                title: "접근 제한",
                message: "로그인 후 이용할 수 있습니다.",
            });
            setTimeout(() => router.replace("/login"), 1000);
        }
    }, [router]);

    // 🔹 입력 상태
    const [apiKey, setApiKey] = useState("");
    const [model, setModel] = useState("dall-e-2");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverUrl, setCoverUrl] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    // 🔹 표지 생성 (위 코드의 API 호출 로직 그대로 사용)
    const handleGenerateCover = async () => {
        if (!title.trim() || !content.trim() || !apiKey.trim()) {
            setDialogState({
                open: true,
                title: "입력 오류",
                message: "API Key, 책 제목, 내용을 모두 입력해야 합니다.",
            });
            return;
        }

        setIsGenerating(true);
        setCoverUrl("");

        try {
            const response = await fetch("/api/cover-generator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    apiKey,
                    title,
                    content,
                    model,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                if (result.imageUrl) {
                    setCoverUrl(result.imageUrl);
                    setDialogState({
                        open: true,
                        title: "생성 완료",
                        message: "AI 표지 생성이 완료되었습니다. 등록을 진행하세요.",
                    });
                } else {
                    throw new Error("서버로부터 유효한 이미지 URL을 받지 못했습니다.");
                }
            } else {
                throw new Error(
                    result.error ||
                    "표지 생성 중 알 수 없는 오류가 발생했습니다. 서버 콘솔을 확인해주세요."
                );
            }
        } catch (error) {
            console.error("표지 생성 실패:", error.message);
            setDialogState({
                open: true,
                title: "생성 실패",
                message:
                    error.message ||
                    "표지 생성 요청에 실패했습니다. API Key와 내용을 확인해주세요.",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    // 🔹 등록 / 수정
    const handleSubmit = () => {
        if (!title.trim() || !content.trim() || !coverUrl) {
            setDialogState({
                open: true,
                title: "필수 항목 누락",
                message: "책 제목, 내용, 표지가 모두 필요합니다.",
            });
            return;
        }

        // TODO: 실제 DB 등록/수정 API 호출 자리
        const msg = isEditMode
            ? `도서(id: ${bookId}) 수정 요청 전송 (TODO)`
            : "새 도서 등록 요청 전송 (TODO)";

        setDialogState({
            open: true,
            title: isEditMode ? "수정 요청 완료" : "등록 요청 완료",
            message: msg,
        });

        setTimeout(() => router.push("/"), 1000);
    };

    const handleBackToList = () => {
        router.push("/");
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f7" }}>
            <Header />

            <Container maxWidth="lg" sx={{ pt: 6, pb: 8 }}>
                {/* 제목 영역 */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        fontWeight={800}
                        sx={{ mb: 1 }}
                        align="left"
                    >
                        AI 표지 생성
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        책 내용을 입력하고 OpenAI를 통해 표지를 생성해보세요.
                    </Typography>
                </Box>

                {/* API Key + 모델 선택 */}
                <Card
                    sx={{
                        borderRadius: 3,
                        p: 3,
                        mb: 3,
                        boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
                        border: "1px solid rgba(148,163,184,0.4)",
                    }}
                >
                    <Box>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                            API 입력
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="OpenAI API Key 입력 (보안에 취약함)"
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                    </Box>

                    <Box>
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
                </Card>

                {/* 표지 + 내용 */}
                <Box
                    mt={3}
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    gap={3}
                    alignItems="stretch"
                >
                    {/* 표지 카드 */}
                    <Box flex={{ xs: "none", md: "0 0 32%" }}>
                        <Card
                            sx={{
                                borderRadius: 3,
                                minHeight: 480,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid rgba(148,163,184,0.6)",
                                boxShadow: "0 10px 28px rgba(15,23,42,0.12)",
                                bgcolor: "white",
                            }}
                        >
                            {isGenerating ? (
                                <CircularProgress size={50} />
                            ) : coverUrl ? (
                                <Box
                                    component="img"
                                    src={coverUrl}
                                    alt="AI 생성 표지"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 3,
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <Typography variant="h5" color="text.secondary">
                                    표지 미리보기
                                </Typography>
                            )}
                        </Card>
                    </Box>

                    {/* 책 내용 입력 카드 */}
                    <Box flex="1 1 0">
                        <Card
                            sx={{
                                width: "100%",
                                borderRadius: 3,
                                minHeight: 480,
                                p: 3,
                                border: "1px solid rgba(148,163,184,0.6)",
                                boxShadow: "0 10px 28px rgba(15,23,42,0.12)",
                                bgcolor: "white",
                            }}
                        >
                            <Typography
                                variant="h6"
                                textAlign="center"
                                fontWeight={800}
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
                        {isGenerating ? "생성 중..." : "표지 생성"}
                    </Button>

                    <Button variant="contained" onClick={handleSubmit}>
                        {isEditMode ? "수정" : "등록"}
                    </Button>
                </Box>

                <Box mt={2} textAlign="center">
                    <Button variant="text" onClick={handleBackToList}>
                        도서 목록으로 돌아가기
                    </Button>
                </Box>
            </Container>

            {/* 공용 Dialog */}
            <Dialog open={dialogState.open} onClose={closeDialog}>
                <DialogTitle>{dialogState.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogState.message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary" autoFocus>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}