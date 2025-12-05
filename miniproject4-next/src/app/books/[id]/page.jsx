'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Next.js의 Link 사용
import { Container, Box, Typography, Button, Paper, Grid } from '@mui/material';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';

// Next.js 동적 라우팅은 props로 params를 받습니다.
export default function BookDetailPage() {
    // 1. URL에서 도서 ID 가져오기 (예: /books/123 -> id = 123)
    const Params = useParams();
    const bookId = Params.id;

    // 2. 상세 정보 상태 (실제로는 API 호출로 데이터를 가져와야 합니다.)
    const [book, setBook] = useState({
        title: "도서 상세 정보",
        author: "저자 (출력)",
        coverUrl: "https://via.placeholder.com/350x450?text=실제+표지+이미지+URL", // 실제 AI 이미지 URL로 변경
        createdAt: "2025. 5. 23.",
        updatedAt: "2025. 5. 23.",
        contents: "책 내용 (출력): 이 책은 AI 기반 도서 표지 생성 프로젝트의 과정을 담고 있습니다."
    });

    // 3. API 호출 함수 (컴포넌트 마운트 시 데이터 로드)
    useEffect(() => {
        if (bookId) {
            // TODO: 백엔드 API (Spring Boot)에 /api/books/${bookId} 로 GET 요청을 보내 데이터를 가져와야 합니다.
            console.log(`도서 ID ${bookId}의 상세 정보를 API로 로드합니다.`);
            // setBook(fetchedData); // 실제 API 데이터로 상태 업데이트
        }
    }, [bookId]);

    // 4. UI 렌더링
    return (
        // Container: 중앙 정렬 및 최대 너비 설정
        <Container
            maxWidth={false}
            sx={{ maxWidth: 1400, mt: 4, mb: 4, ml: 32}}
        >
            <Header />
            {/* 1. 제목 및 사용자, 수정/삭제 버튼 영역 */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3 }}>
                <Typography variant="h4" component="h1" fontWeight={800} sx={{ ml: 75,  mb: 5}}>
                    도서 상세 정보
                </Typography>

                <Box sx={{ mt: "80px", display: 'flex', gap: 1, alignItems: 'center' }}>
                    {/* @님, 안녕하세요 */}
                    {/*<Typography variant="body1">@님, 안녕하세요</Typography>*/}

                    {/* 수정/삭제 버튼 */}
                    <Button variant="contained" sx={{ mb:2}} color="success" href={`/books/edit?bookId=${bookId}`}>수정</Button>
                    <Button variant="contained"  sx={{ mr: 16, mb:2}} color="error" >삭제</Button>
                </Box>
            </Box>

            {/* 2. 표지 + 책 내용 레이아웃 (Grid 시스템 사용) */}
            <Grid container spacing={4}>

                {/* 2-1. 왼쪽: 표지 영역 (4/12 너비) */}
                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            ml: 15,
                            mr: 5,
                            p: 20,
                            height: 500,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden'
                        }}
                    >
                        {book.coverUrl ? (
                            <img
                                src={book.coverUrl}
                                alt="도서 표지"
                                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                            />
                        ) : (
                            <Typography variant="h5" color="textSecondary">표지 이미지 없음</Typography>
                        )}
                    </Paper>
                </Grid>

                {/* 2-2. 오른쪽: 책 내용 출력 영역 (8/12 너비) */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={1} sx={{ p: 5, minHeight: 500 }}>
                        <Typography variant="h5" gutterBottom>
                            책 제목: **{book.title}**
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" sx={{ mt:2, mb: 5 }}>
                            저자: **{book.author}**
                        </Typography>

                        {/* 책 내용 (출력) 영역 */}
                        <Box sx={{ border: '1px solid #ccc', p: 2, minHeight: 250, mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                책 내용
                            </Typography>
                            <Typography variant="body1">
                                {book.contents}
                            </Typography>
                        </Box>

                        {/* 생성일/수정일 */}
                        {/*<Box>*/}
                        {/*    <Typography variant="body2">*/}
                        {/*        **생성일:** {book.createdAt}*/}
                        {/*    </Typography>*/}
                        {/*    <Typography variant="body2">*/}
                        {/*        **수정일:** {book.updatedAt}*/}
                        {/*    </Typography>*/}
                        {/*</Box>*/}
                    </Paper>
                </Grid>
            </Grid>

            {/* 3. 도서 목록으로 돌아가기 버튼 */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                    variant="outlined"
                    // Next.js Link 컴포넌트 사용
                    component={Link}
                    href="/"
                    color="primary"
                >
                    도서 목록으로 돌아가기
                </Button>
            </Box>

        </Container>
    );
}