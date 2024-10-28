import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const REDIRECT_URI = "http://localhost:5173/member/oauth/kakao";
// const REDIRECT_URI = "https://www.newsfit.shop/member/oauth/kakao";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const handleKakaoClick = () => {
  window.location.href = KAKAO_AUTH_URL;
};

const authKakaoLogin = async (code) => {
  const response = await fetch(
    `https://www.newsfit.shop/member/oauth/kakao?code=${code}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Login failed");
  }
  // return await response.json();
  return response;
};

export const KakaoLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    // const code = import.meta.env.VITE_KAKAO_CODE;

    const processLogin = async () => {
      try {
        const response = await authKakaoLogin(code);
        if (response.type === "opaque") {
          console.log("Login request sent");
          // 여기서 성공했다고 가정하고 처리
          navigate("/");
        }
      } catch (error) {
        console.log("Login error:", error);
        navigate("/login"); // 에러 시 로그인 페이지로
      }
    };

    if (code) {
      processLogin();
    }
  }, []);

  return <div>로그인 중...</div>;
};
