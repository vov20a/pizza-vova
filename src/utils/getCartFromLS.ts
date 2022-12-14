import { calkTotalPrice } from "./calkTotalPrice";

export const getCartFromLS=()=>{
    const data=localStorage.getItem("cart");
    const items=data? JSON.parse(data):[];
    const totalPrice=calkTotalPrice(items);
    return {items,totalPrice}
}