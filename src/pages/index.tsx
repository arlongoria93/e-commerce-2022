import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useState, useEffect } from "react";
import Item from "../../components/item/item";

export type CartItemType = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  amount: number;
};

const Home: NextPage = () => {
  const [cartOpen, setCartOpen] = useState(false); // cart open state
  const [cartItems, setCartItems] = useState<CartItemType[]>([]); // cart items state
  const [items, setItems] = useState<CartItemType[]>([]); // items state

  const getItems = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setItems(json));
  };

  const getTotalItems = (items: CartItemType[]) => {
    items.reduce((ack: number, item) => ack + item.amount, 0);
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleAddToCart = (clickedItem: CartItemType) => null;

  return (
    <>
      <div className=" min-h-screen flex flex-col justify-center items-center p-4 scrollbar-hide ">
        <div className="drawer scrollbar-hide">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content scrollbar-hide">
            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button gap-2"
            >
              Cart<span className="badge">{getTotalItems(cartItems)}</span>
            </label>
            <div className="grid grid-cols-2 gap-12  justify-center items-center scrollbar-hide ">
              {items?.map((item: CartItemType) => (
                <div className=" hover:scale-101 cursor-pointer duration-500 flex flex-col justify-center items-center text-center rounded border border-info   h-full w-full p-6">
                  <Item
                    key={item.id}
                    item={item}
                    handleAddToCart={handleAddToCart}
                  />
                </div>
              ))}
              <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full"></div>
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
