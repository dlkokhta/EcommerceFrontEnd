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

    if (param) {
      let url;
      if (process.env.NODE_ENV === "production") {
        url = `https://dimitrikokhtashvili.site`;
      } else {
        url = `http://localhost:3000`;
      }
      navigate("/login");
      const sendRandomString = async () => {
        try {
          await axios.post(`${url}/api/verify`, { param: param });
          navigate("/login");
        } catch (error: any) {
          console.error(
            "Verification failed:",
            error.response?.data || error.message,
          );
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
