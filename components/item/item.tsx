import React from "react";
import { CartItemType } from "../../src/pages/index";

type Props = {
  item: CartItemType;
  handleAddToCart: (item: CartItemType) => void;
};

const item = ({ item, handleAddToCart }: Props) => (
  <div className="">
    <img className="w-1/2" src={item.image} alt={item.title} />
    <div>
      <h2>{item.title}</h2>
      <h3>{item.price}</h3>
    </div>
    <button onClick={() => handleAddToCart(item)} className="btn btn-primary">
      Add to cart
    </button>
  </div>
);

export default item;
