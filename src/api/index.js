import axios from "axios";

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

export const postTwitter = async (tweet, tag, tag_id, images) => {
  if (images.length) {
    return postTwitterWithImages(tweet, tag, tag_id, images);
  }
  const res = await fetch("https://api.tweetfi.cc/api/twitters/v2/tweet", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getJwt(),
    },
    body: JSON.stringify({ message: tweet, tag, tag_id }),
  });
  const data = await res.json();
  return data?.data;
};
export const postTwitterWithImages = async (tweet, tag, tag_id, images) => {
  const formData = new FormData();
  formData.append("message", tweet);
  formData.append("tag", tag);
  formData.append("tag_id", tag_id);
  images.forEach((image) => {
    formData.append("files", image);
  });
  const res = await fetch(
    "https://api.tweetfi.cc/api/twitters/v2/tweet_medias",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + getJwt(),
      },
      body: formData,
    }
  );
  const data = await res.json();
  return data?.data;
};

export const getPostTags = async () => {
  const res = await fetch("https://api.tweetfi.cc/api/twitters/v2/tags", {
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

export const getAiTweet = async (tag) => {
  const res = await axios.post(
    "https://api.tweetfi.cc/api/twitters/v2/ai_message",
    { message: "Please generate a tweet about" + tag },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJwt(),
      },
      timeout: 0,
    }
  );
  return res;
};

export const tipTweet = async (fee, twitter_id) => {
  const res = await axios.post(
    "https://api.tweetfi.cc/api/twitters/v2/tip",
    { fee, twitter_id },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJwt(),
      },
      timeout: 0,
    }
  );
  return res;
};

export const searchTweet = async (search = "") => {
  const res = await axios.get(
    "https://api.tweetfi.cc/api/main/twitter_history?search=" + search,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJwt(),
      },
      timeout: 0,
    }
  );
  return res?.data;
};

export const bindRefCode = async (ref_code) => {
  const res = await axios.post(
    "https://api.tweetfi.cc/api/twitters/set_ref_code",
    { ref_code },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJwt(),
      },
      timeout: 0,
    }
  );
  return res?.data;
};
