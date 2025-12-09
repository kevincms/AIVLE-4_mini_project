# 📚 Mini Project 04 – AI Book Generation Service

> Spring Boot + Next.js 기반의 **AI 도서 생성 서비스**  
> 사용자는 도서를 만들고, OpenAI DALL·E를 이용하여 **AI 표지 이미지를 자동 생성**합니다.

---

## 🎞️ Demo

![Demo](./main_gif.gif)

---

# 🛠️ Tech Stack

### **Frontend**
- Next.js (App Router)
- React
- Material UI (MUI)
- Axios
- Context API (AuthContext)
- OpenAI DALL·E 이미지 생성 API

### **Backend**
- Spring Boot 
- Spring Web / Spring Data JPA
- H2 Database
- Lombok
- OpenAI 이미지 다운로드 기능

### **AI**
- OpenAI DALL·E (표지 자동 생성)


---

# 🧱 Project Structure

📦 project-root
```
├── backend/ # Spring Boot API 서버
└── frontend/ # Next.js 클라이언트
```

---

# 📌 Frontend (Next.js)

- 로그인 / 회원가입
- 도서 목록, 등록, 수정, 삭제
- AI 표지 이미지 생성 (DALL·E)
- Context API 기반 인증 관리
- 감싸는 UI/UX: MUI 기반 디자인 시스템 적용

---

# 📌 Backend (Spring Boot)

- 사용자 인증 API
- 도서 CRUD API
- 이미지 다운로드 → 로컬 저장
- 정적 리소스 제공(`/images/**`)
- 도서 + 이미지 연동 구조

---

## ⭐ More Details

각 프로젝트 세부 내용은 다음 README에서 확인하세요:

- **📁 Backend README** → `/backend/README.md`
- **📁 Frontend README** → `/frontend/README.md`

---



