export const register = (body) => {
  return fetch("https://api.tweetfi.cc/api/users/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
