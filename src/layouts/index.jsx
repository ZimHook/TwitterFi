import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatchStore } from "@/context";
import { useAtom } from "jotai";
import { loginLoading } from "@/atom";
import { queryUser, bindRefCode } from "../api/index.js";
import { getUrlParams } from "@/utils/getUrlParams";
import { message } from "antd";

const Layout = () => {
  const dispatch = useDispatchStore();

  const [loading, setLoading] = useAtom(loginLoading);

  const ref_code = getUrlParams("ref");

  const getUserinfo = async () => {
    await queryUser()
      .then((res) => {
        if (res?.data) {
          if (!res?.data?.user?.parent_address && ref_code) {
            bindRefCode(ref_code)
              .then((refRes) => {
                message.success(
                  "Recommender: @" + refRes?.data?.data?.parent_twitter_name
                );
              })
              .catch(console.log);
          }
          dispatch({
            type: "setUserinfo",
            userinfo: {
              ...(res?.data ?? {}),
              ...(res?.data?.twitter ?? {}),
              ...(res?.data?.user ?? {}),
              connected: true,
            },
          });
        }
      })
      .catch(console.log)
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("twitterfi_jwt");
    if (jwt) {
      setLoading(true);
      getUserinfo();
    }
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
