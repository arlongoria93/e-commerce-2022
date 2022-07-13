import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useState, useEffect } from "react";
import Cart from "../../components/Cart/Cart";
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

  useEffect(() => {
    getItems();
  }, []);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // is the item already in the cart?
      const existingItem = prev.find((item) => item.id === clickedItem.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // if not, add new item to cart
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((acc, item) => acc + item.amount, 0);
  };

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
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content scrollbar-hide">
              <Cart
                cartItems={cartItems}
                addTocart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
