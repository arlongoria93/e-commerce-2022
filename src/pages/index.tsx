import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useState, useEffect } from "react";
import Cart from "../../components/Cart/Cart";
import Item from "../../components/item/item";
import Footer from "../../components/Footer/Footer";

export type CartItemType = {
  _id: number;
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
    fetch("https://api.storerestapi.com/products")
      .then((response) => response.json())
      .then(({ data }) => setItems(data));
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // is the item already in the cart?
      const existingItem = prev.find((item) => item._id === clickedItem._id);

      if (existingItem) {
        return prev.map((item) =>
          item._id === clickedItem._id
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
        if (item._id === id) {
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
      <div className="min-h-screen flex flex-col justify-center items-center p-4 scrollbar-hide ">
        <div className="drawer scrollbar-hide">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content scrollbar-hide">
            <div className="navbar bg-base-100">
              <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">
                  Dracula<span className="text-primary">Shopping</span>
                </a>
              </div>
              <div className="flex-none gap-2">
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered"
                  />
                </div>
                <label
                  htmlFor="my-drawer"
                  tabIndex={0}
                  className="btn btn-ghost btn-circle drawer-button"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">
                      {getTotalItems(cartItems)}
                    </span>
                  </div>
                </label>
              </div>
            </div>
            <div className="divider"></div>
            <div className="container max-w-3xl mx-auto">
              <h1 className="text-2xl text-center">BODY</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                {items?.map((item: CartItemType) => (
                  <Item
                    key={item._id}
                    item={item}
                    handleAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>{" "}
            <div className="divider"></div>
            <Footer />
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
