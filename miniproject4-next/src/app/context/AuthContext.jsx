"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // 그냥 "test" 이런 문자열로 저장

    // 새로고침해도 로그인 유지
    useEffect(() => {
        if (typeof window === "undefined") return; // SSR 보호

        const saved = localStorage.getItem("loginUser");
        if (saved) {
            // 예전처럼 문자열로만 저장되어 있어도 그대로 쓰면 됨
            setUser(saved);
        }
    }, []);

    // 지금은 하드코딩 로그인 (나중에 API로 교체 가능)
    const login = async (id, pw) => {
        // TODO: 나중에 백엔드 로그인 API 붙일 때 여기만 고치면 됨
        if (id === "test" && pw === "test01") {
            setUser(id);
            localStorage.setItem("loginUser", id); // 문자열로 저장
        } else {
            throw new Error("로그인 실패");
        }
    };

    const logout = () => {
        setUser(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem("loginUser");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth는 AuthProvider 안에서만 사용해야 합니다.");
    return ctx;
}