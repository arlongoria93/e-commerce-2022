import { CartItemType } from "../../src/pages/index";
import CartItem from "../CartItem/CartItem";

type Props = {
  cartItems: CartItemType[];
  addTocart: (item: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart = ({ cartItems, addTocart, removeFromCart }: Props) => {
  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addTocart={addTocart}
          removeFromCart={removeFromCart}
        />
      ))}
    </div>
  );
};

export default Cart;
