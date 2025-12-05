"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const handleLogin = () => {
        if (id === "test" && pw === "test01") {
            localStorage.setItem("loginUser", id);
            alert("로그인 성공!");
            router.replace("/");
        } else {
            alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <div style={container}>
            <h1 style={{ textAlign: "center" }}>로그인</h1>

            <input
                type="text"
                placeholder="아이디 입력"
                value={id}
                onChange={(e) => setId(e.target.value)}
                style={input}
            />

            <input
                type="password"
                placeholder="비밀번호 입력"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                style={input}
            />

            <button onClick={handleLogin} style={button}>로그인</button>

            {/* 회원가입 버튼 */}
            <button
                style={subBtn}
                onClick={() => alert("회원가입 기능은 아직 없습니다.")}
            >
                회원가입
            </button>

            {/* 도서 목록으로 */}
            <button
                style={subBtn}
                onClick={() => router.push("/")}
            >
                도서 목록으로 돌아가기
            </button>
        </div>
    );
}

const container = {
    maxWidth: 400,
    margin: "80px auto",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 10,
};

const input = {
    width: "100%",
    padding: "10px 12px",
    marginBottom: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
};

const button = {
    width: "100%",
    padding: "10px 12px",
    background: "#111",
    border: "1px solid #111",
    color: "#fff",
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 10,
};

const subBtn = {
    width: "100%",
    padding: "10px 12px",
    background: "#f1f1f1",
    border: "1px solid #ccc",
    borderRadius: 8,
    cursor: "pointer",
    marginTop: 5,
};
