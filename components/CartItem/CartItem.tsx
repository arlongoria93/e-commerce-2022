import { CartItemType } from "../../src/pages/index";
import item from "../item/item";

type Props = {
  item: CartItemType;
  addTocart: (item: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem = ({ item, addTocart, removeFromCart }: Props) => {
  return (
    <div>
      <div>
        <h3>{item.title}</h3>
        <div>
          <p>Price:${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
          <button onClick={() => addTocart(item)}>Add</button>
        </div>
      </div>
      <img src={item.image} alt={item.title} />
    </div>
  );
};
export default CartItem;
