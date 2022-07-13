import React from "react";
import { CartItemType } from "../../src/pages/index";

type Props = {
  item: CartItemType;
  handleAddToCart: (item: CartItemType) => void;
};

const item = ({ item, handleAddToCart }: Props) => (
  <div>
    <img src={item.image} alt={item.title} />
    <div>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <h3>{item.price}</h3>
    </div>
    <button onClick={() => handleAddToCart(item)} className="btn btn-primary">
      Add to cart
    </button>
  </div>
);

export default item;
