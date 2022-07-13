import { CartItemType } from "../../src/pages/index";
import CartItem from "../CartItem/CartItem";

type Props = {
  cartItems: CartItemType[];
  addTocart: (item: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart = ({ cartItems, addTocart, removeFromCart }: Props) => {
  const calculateTotal = (items: CartItemType[]) => {
    return items.reduce((acc, item) => acc + item.amount * item.price, 0);
  };
  return (
    <div className="scrollbar-hide bg-primary">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item._id}
          item={item}
          addTocart={addTocart}
          removeFromCart={removeFromCart}
        />
      ))}

      <h1>
        <span className="opacity-40">Total:</span> $
        {calculateTotal(cartItems).toFixed(2)}
      </h1>
    </div>
  );
};

export default Cart;
