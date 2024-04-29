import { useEffect } from "react";

interface CartItemsProps {
  carticonClickHandler: () => void;
}

const CartItems = ({ carticonClickHandler }: CartItemsProps) => {
  useEffect(() => {
    carticonClickHandler();
  }, [carticonClickHandler]);

  return <h1>Cart Items Page</h1>;
};

export default CartItems;
