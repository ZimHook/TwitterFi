import axios from "axios";
import { request } from "./axios";

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
    "https://api.tweetfi.io/api/twitters/oauth_token" + bodyToUrlParams(body),
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
  const res = await fetch("https://api.tweetfi.io/api/twitters/access_token", {
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
    "https://api.tweetfi.io/api/twitters/verify_credentials",
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
  const res = await fetch("https://api.tweetfi.io/api/twitters/profile", {
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
  return fetch("https://api.tweetfi.io/api/twitters/bind_wallet", {
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
  const res = await fetch("https://api.tweetfi.io/api/twitters/v2/tweet", {
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
    "https://api.tweetfi.io/api/twitters/v2/tweet_medias",
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
  const res = await fetch("https://api.tweetfi.io/api/twitters/v2/tags", {
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
  const res = await request.post("/api/twitters/v2/ai_message", {
    message: "Please generate a tweet about" + tag,
  });
  return res;
};

export const tipTweet = async (fee, twitter_id) => {
  const res = await request.post("/api/twitters/v2/tip", { fee, twitter_id });
  return res;
};

export const searchTweet = async (search = "") => {
  const res = await request.get("/api/main/twitter_history?search=" + search);
  return res;
};

export const bindRefCode = async (ref_code) => {
  const res = await request.post("/api/twitters/set_ref_code", { ref_code });
  return res;
};

export const claimProof = async () => {
  const res = await request.get("/api/main/claim_proof");
  return res;
};

export const queryTagsCount = async (start_date, end_date) => {
  const res = await request.post("/api/twitters/v2/tags_range", {
    start_date,
    end_date,
  });
  return res;
};

export const referList = async () => {
  const res = await request.get("/api/twitters/v2/invite_claim_list");
  return res?.data;
};

export const getMachineConfig = async () => {
  const res = await request.get("/api/mint/order_config");
  return res;
};

export const createMachineOrder = async (order_type_name) => {
  const res = await request.post("/api/mint/order/create", { order_type_name });
  return res;
};

export const getMachineOrderHistory = async () => {
  const res = await request.get("/api/mint/order_history");
  return res;
};

export const getAccountSeqNo = async (address) => {
  const res = await fetch(
    "https://tonapi.io/v2/wallet/" + encodeURIComponent(address) + "/seqno",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data?.seqno;
};

export const getAccountTransactions = async (address) => {
  const res = await fetch(
    "https://tonapi.io/v2/blockchain/accounts/" +
      encodeURIComponent(address) +
      "/transactions?limit=10",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data?.transactions;
};
