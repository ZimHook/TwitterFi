import { useNavigate } from "react-router-dom";

const InvestBanner = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ width: "100%", cursor: "pointer" }}
      onClick={() => {
        navigate("/invest");
      }}
    >
      <img src="/invest/banner.svg" style={{ width: "100%" }} />
    </div>
  );
};

export default InvestBanner;
