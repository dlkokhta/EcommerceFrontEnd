import axios from "axios";
import { useEffect, useState } from "react";

const UsersListForAdminPanel = () => {
  const [fetchedUsers, setFetchedusers] = useState([]);
  console.log("fetchedUsers", fetchedUsers);

  useEffect(() => {
    const fetchusers = async () => {
      let url;
      if (process.env.NODE_ENV === "production") {
        url = `https://ecommerceapi-production-7d9c.up.railway.app`;
      } else {
        url = `http://localhost:3000`;
      }
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(`${url}/api/getAllUsers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFetchedusers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchusers();
  }, []);

  return (
    <div className="mt-24 flex flex-col gap-10 pl-60">
      {fetchedUsers.map((user: any) => (
        <div
          key={user._id}
          className="duration-400 flex items-center gap-60 rounded-lg border border-gray-200 bg-white p-6 shadow transition duration-200 hover:-translate-y-2 hover:bg-gray-50"
        >
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
          <div>
            <button className="rounded-full bg-rose-400 px-5 py-1 text-white hover:bg-rose-600">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersListForAdminPanel;
