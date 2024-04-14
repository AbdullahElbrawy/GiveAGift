import { createContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = [];

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage("cart", initialState);

  const dispatchCart = useCallback(
    (action) => {
      const { type, payload } = action;
      switch (type) {
        case "ADD_ITEM":
          const endpoint = payload.ready ? "cartReady" : "cartCustom";
          fetch(`https://gifts-backend.onrender.com/api/${endpoint}/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload.ready ? {
              card: payload.cardSitting,
              receiverInfo: payload.receiverInfo,
              custom:endpoint
            } : payload.cardSitting),
          })
            .then((response) => response.json())
            .then((data) => {
              setCart((prev) => [
                ...prev,
                {
                  ...data,
                  ready: payload.ready,
                  receiverInfo: payload.receiverInfo,
                  brandUrl: payload.cardSitting.brandUrl,
                },
              ]);
            })
            .catch((error) => {
              console.error("Error adding item:", error);
            });
          break;
        case "REMOVE_ITEM":
          const { _id, ready } = cart[payload];
          fetch(`https://gifts-backend.onrender.com/api/CartRemove/remove/${_id}/${ready}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                return response.json(); // or response.text() if the response is not in JSON format
              }
              throw new Error('Failed to delete item');
            })
            .then((data) => {
              setCart((currentCart) => currentCart.filter((item) => item._id !== _id));
            })
            .catch((error) => {
              console.error("Error removing item:", error);
            });
          break;
        default:
          console.log('Unhandled action type in cart context');
      }
    },
    [setCart, cart]
  );

  return (
    <CartContext.Provider value={{ cart, dispatchCart }}>
      {children}
    </CartContext.Provider>
  );
};
