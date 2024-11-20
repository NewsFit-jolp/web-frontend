const BASE_URL = "https://www.newsfit.shop";
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const kakaoToken = import.meta.env.VITE_KAKAO_TOKEN;
const getToken = () => localStorage.getItem("accessToken");
// 인증안됨: 401에러

// 유저 관련 API
export async function getMemberInfo() {
  const response = await fetch(`${BASE_URL}/member/info`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("유저 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function getPublishers() {
  const response = await fetch(`${BASE_URL}/member/press`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("언론사 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/member/categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("카테고리 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function updateMemberInfo(newInfo) {
  const response = await fetch(`${BASE_URL}/member/info`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(newInfo),
  });
  if (!response.ok) {
    throw new Error("유저 데이터 업데이트에 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function updatePublishers(newPublishers) {
  const response = await fetch(`${BASE_URL}/member/press`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
    body: JSON.stringify({
      preferredPress: newPublishers,
    }),
  });

  if (!response.ok) {
    throw new Error("언론사 데이터 업데이트에 실패했습니다");
  }

  const body = await response.json();
  return body;
}

export async function updateCategories(newCategories) {
  console.log(newCategories);
  const response = await fetch(`${BASE_URL}/member/categories`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
    body: JSON.stringify({
      preferredCategories: newCategories,
    }),
  });

  if (!response.ok) {
    throw new Error("카테고리 데이터 업데이트에 실패했습니다");
  }

  const body = await response.json();
  return body;
}

// 기사 관련 API
export async function getArticles({
  category = "allCategory",
  size = 10,
  articleCursor = "",
}) {
  const query = `category=${category}&size=${size}&articleCursor=${articleCursor}`;
  const response = await fetch(`${BASE_URL}/articles?${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("기사 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function getHeadlines() {
  const response = await fetch(`${BASE_URL}/articles/headLine`);
  if (!response.ok) {
    throw new Error("헤드라인 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function getArticleSearch({
  keyword = "",
  size = 10,
  articleCursor = "",
}) {
  const query = `keyword=${keyword}&size=${size}&articleCursor=${articleCursor}`;
  const response = await fetch(`${BASE_URL}/articles/search?${query}`);
  if (!response.ok) {
    throw new Error("기사 검색 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function getArticle(articleId) {
  const response = await fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("기사 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function addLike(articleId) {
  const response = await fetch(`${BASE_URL}/articles/${articleId}/likes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
}

export async function deleteLike(articleId) {
  const response = await fetch(`${BASE_URL}/articles/${articleId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.message);
  }
  const body = await response.json();
  return body;
}

export async function addComment(articleId, comment) {
  const response = await fetch(`${BASE_URL}/articles/${articleId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
    body: JSON.stringify({
      comment: comment,
    }),
  });
  if (!response.ok) {
    throw new Error("뉴스 댓글 추가에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function deleteComment(articleId, commentId) {
  const response = await fetch(
    `${BASE_URL}/articles/${articleId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("뉴스 댓글 삭제에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

// 로그인 API
export const authKakaoLogin = async (code) => {
  const response = await fetch(
    `${BASE_URL}/member/oauth/kakao?code=${code}&redirect_uri=${REDIRECT_URI}`,
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

  const data = await response.json();
  return data;
};
