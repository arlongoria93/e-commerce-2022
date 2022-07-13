import { CartItemType } from "../../src/pages/index";
import item from "../item/item";

type Props = {
  item: CartItemType;
  addTocart: (item: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem = ({ item, addTocart, removeFromCart }: Props) => {
  return (
    <div className="border flex flex-col">
      <h3 className="p-4 font-heading text-lg">
        {item.title} <span className="p-4 font-bold">x{item.amount}</span>
      </h3>
      <div className="font-heading  flex justify-start w-full">
        <p className="p-4 font-bold">
          <span className="opacity-40">Price:</span> ${item.price}
        </p>
      </div>
      <div className="font-heading font-bold flex justify-start w-full">
        <button className="p-4" onClick={() => removeFromCart(item._id)}>
          Remove
        </button>
        <button className="p-4" onClick={() => addTocart(item)}>
          Add
        </button>
      </div>
    </div>
  );
};
export default CartItem;
{
  /* <img src={item.image} alt={item.title} /> */
}
