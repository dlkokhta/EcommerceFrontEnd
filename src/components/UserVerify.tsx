import axios from "axios";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const param = queryParams.get("param");
  console.log("param", param);
  if (param) {
    navigate("/");
    let url;
    if (process.env.NODE_ENV === "production") {
      url = `https://ecommerceapi-production-7d9c.up.railway.app`;
    } else {
      url = `http://localhost:3000`;
    }

    const sendRandomString = async () => {
      try {
        const response = await axios.post(`${url}/api/verify/${param}`);
        console.log(response.data.message);
      } catch (error) {
        console.error("Verification failed:", error);
      }
    };

    sendRandomString();
  }

  return (
    <div>
      <h1>Email Verification</h1>
    </div>
  );
};

export default UserVerify;
