import React from "react";
import { CartItemType } from "../../src/pages/index";

type Props = {
  item: CartItemType;
  handleAddToCart: (item: CartItemType) => void;
};

const item = ({ item, handleAddToCart }: Props) => (
  <div className="flex flex-col justify-between p-2 h-full w-full">
    <div className="flex justify-between flex-row">
      <h2 className="break-words w-3/4 p-2">{item.title}</h2>
      <p className="font-bold">${item.price}</p>
    </div>
    <button onClick={() => handleAddToCart(item)} className="btn btn-sm w-1/2">
      Add to cart
    </button>
  </div>
);

export default item;
