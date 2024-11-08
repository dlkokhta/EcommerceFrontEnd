import axios from "axios";
import { useEffect, useState } from "react";

const UsersListForAdminPanel = () => {
  const [fetchedUsers, setFetchedusers] = useState([]);

  let url;
  if (process.env.NODE_ENV === "production") {
    url = `https://dimitrikokhtashvili.site`;
  } else {
    url = `http://localhost:3000`;
  }
  const token = localStorage.getItem("authToken");
  const fetchusers = async () => {
    try {
      const response = await axios.get(`${url}/api/getAllUsers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFetchedusers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchusers();
  }, []);

  const handleClick = async (userid: string) => {
    await axios.delete(`${url}/api/deleteUserByAdmin/${userid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchusers();
  };

  return (
    <div className="mt-24 px-5 lg:px-40 xl:px-60">
      {fetchedUsers.map((user: any) => (
        <div
          key={user._id}
          className="duration-400 flex justify-between rounded-lg border border-gray-200 bg-white p-2 shadow transition duration-200 hover:-translate-y-2 hover:bg-gray-50 md:gap-8 md:p-8 lg:gap-10 lg:p-10  xl:gap-40 xl:p-6"
        >
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
          <div>
            <button
              onClick={() => handleClick(user.id)}
              className="rounded-full bg-rose-400 px-5 py-1 text-white hover:bg-rose-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersListForAdminPanel;
