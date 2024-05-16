const bodyToUrlParams = (body) => {
  let urlParams = "?";
  Object.keys(body).forEach((key) => {
    urlParams += `${key}=${body[key].toString()}`;
  });
  return urlParams;
};

const getJwt = () => {
  return localStorage.getItem("twitterfi_jwt");
};

export const twitterRequestToken = async (body) => {
  const res = await fetch(
    "https://api.tweetfi.cc/api/twitters/oauth_token" + bodyToUrlParams(body),
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data?.data;
};

export const twitterAccessToken = async (body) => {
  const res = await fetch("https://api.tweetfi.cc/api/twitters/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data?.data;
};

export const reigster = async (body) => {
  const res = await fetch(
    "https://api.tweetfi.cc/api/twitters/verify_credentials",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return data?.data;
};

export const queryUser = async () => {
  const res = await fetch("https://api.tweetfi.cc/api/twitters/profile", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getJwt(),
    },
  });
  const data = await res.json();
  return data?.data;
};

export const bindWallet = (body) => {
  return fetch("https://api.tweetfi.cc/api/twitters/bind_wallet", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getJwt(),
    },
    body: JSON.stringify(body),
  });
};

export const postTwitter = (tweet) => {
  return fetch("https://api.tweetfi.cc/api/twitters/v2/tweet", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getJwt(),
    },
    body: JSON.stringify({ message: tweet }),
  });
};
