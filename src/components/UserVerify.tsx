import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const param = queryParams.get("param");
    console.log("param", param);
    if (param) {
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
          navigate("/login");
        } catch (error) {
          console.error("Verification failed:", error);
        }
      };

      sendRandomString();
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Email Verification</h1>
    </div>
  );
};

export default UserVerify;
