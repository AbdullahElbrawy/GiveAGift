import { createContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = [];

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage("cart", initialState);

  const dispatchCart = useCallback(
    (action) => {
      const { type, payload, state } = action;
      console.log(payload, state);
      switch (type) {
        case "ADD_ITEM":
          payload.ready === true
            ? fetch("https://gifts-backend.onrender.com/api/cartReady/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  card: payload.cardSitting,
                  receiverInfo: payload.receiverInfo,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                 
                  // Update local cart state with the new item
                  setCart((prev) => [
                    ...prev,
                    {
                      ...data,
                      ready: true,
                      receiverInfo: payload.receiverInfo,
                      brandUrl:payload.cardSitting.brandUrl
                    },
                  ]);
                })
                .catch((error) => {
                  console.error("Error adding item:", error);
                })
            : fetch("https://gifts-backend.onrender.com/api/cartCustom/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload.cardSitting),
              })
                .then((response) => response.json())
                .then((data) => {
               
                  // Update local cart state with the new item
                  setCart((prev) => [...prev, data]);
                })
                .catch((error) => {
                  console.error("Error adding item:", error);
                });
          break;
        case "REMOVE_ITEM":
       

          //   state = cart[payload].ready === true ? true : false;
          let ready = cart[payload].ready === true ? true : false;
          // Assuming payload is the itemId to be removed
          fetch(
            `https://gifts-backend.onrender.com/api/CartRemove/remove/${cart[payload]._id}/${ready}`,
            { method: "DELETE" }
          )
            .then((response) => response.json())
            .then((data) => {
          
              // Assuming your server response contains the updated cart items after removal
              // Update local cart state with the updated items from the server
              setCart((carts) => carts.filter((cart) => cart._id !== data._id));
            })
            .catch((error) => {
              console.error("Error removing item:", error);
            });
          break;
        // Handle other actions as needed
      }
    },
    [setCart]
  );

  return (
    <CartContext.Provider value={{ cart, dispatchCart }}>
      {children}
    </CartContext.Provider>
  );
};
