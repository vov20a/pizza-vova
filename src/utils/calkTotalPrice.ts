import { CartItem } from "../redux/cart/types";

export const calkTotalPrice=(items:CartItem[])=>{
    return items.reduce((sum:number, item) => {
        return item.price * item.count + sum;
      }, 0);
}