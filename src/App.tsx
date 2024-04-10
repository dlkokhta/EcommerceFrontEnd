import "./App.css";
import Home from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import AddShoes from "./pages/AddShoes";
import axios from "axios";
import { useEffect } from "react";

import { setAllShoes } from "./store/allShoesSlice";
import { useDispatch } from "react-redux";

// interface allShoesTypes {
//   brand: string;
//   model: string;
//   color: string;
//   description: string;
//   price: number;
//   sizes: string[];
//   availability: boolean;
//   image: string[];
//   id: string;
// }

function App() {
  const dispatch = useDispatch();
  // const [allShoes, setAllShoes] = useState<allShoesTypes[]>([]);

  useEffect(() => {
    const fetchAllShoes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getAllShoes",
        );

        dispatch(setAllShoes(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllShoes();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/addShoes" element={<AddShoes />} />
      </Routes>
      {/* {allShoes.map((shoes, index) => (
        <div key={index}>
          <div>{shoes.brand}</div>
          <div>{shoes.model}</div>
          <div>{shoes.color}</div>
          <div>{shoes.description}</div>
          <div>{shoes.price}</div>
          {shoes.sizes.map((size, sizeIndex) => (
            <div key={sizeIndex}>{size}</div>
          ))}
          <div>{shoes.availability ? "Available" : "Not available"}</div>
          {shoes.image.map((image, imageIndex) => (
            <img
              key={imageIndex}
              src={`http://localhost:3000/public/storage/images/${image}`}
              alt={image}
            />
          ))}
        </div>
      ))} */}
    </div>
  );
}

export default App;
