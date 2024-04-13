import { useContext, useState } from "react";
import { DeleteOutline, ShoppingBag } from "@mui/icons-material";
import DrawerWithIconBtn from "../DrawerWithIconBtn";
import { CartContext } from "../../store/CartContext";
import { Badge, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { stat } from "fs";

export default function Cart({ t, language }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cart, dispatchCart } = useContext(CartContext);
  const navigate = useNavigate(); // Create navigate instance

  const handleOnRemove = (index) => {
    // dispatchCart({
    //     type: "REMOVE_ITEM",
    //     payload: index,
    //     state: true,
    //     });
    console.log(index);
  };

  // Function to handle checkout navigation
  const handleCheckout = (id) => {
    navigate(`/checkout/${id}`); // Navigate to checkout with index as parameter
    setIsDrawerOpen(false);
  };

  return (
    <Badge
      badgeContent={cart.length}
      color="error"
      sx={{ "& span": { top: 10, right: 10 } }}
    >
      <DrawerWithIconBtn
        isOpen={isDrawerOpen}
        onOpen={() => setIsDrawerOpen(true)}
        onClose={() => setIsDrawerOpen(false)}
        BtnIcon={ShoppingBag}
        language={language}
        className="flex flex-col justify-between py-8 px-6"
      >
        <Typography variant="h4" textAlign="center">
          {t("cart.title")} ({cart.length})
        </Typography>

        <ul className="h-[80dvh] overflow-y-auto">
          {cart &&
            cart.map((item, index) => {
              return item.ready !== true ? (
                <li
                  //   key={`${item?.cardSitting.brand.logoName}-${item?.cardSitting.receiverInfo?.name}-${index}`}
                  key={`${item?.items[0].brand}-${item?.items[0].receiverInfo?.name}-${index}`}
                  className="flex justify-between items-center bg-primary-500 text-white rounded-lg p-4 my-4"
                  style={
                    item?.color && {
                      backgroundColor: item?.color,
                      color: item?.textColor,
                    }
                  }
                >
                  {console.log(item)}
                  <div>
                    <Typography variant="h6">{t("cart.customCard")}</Typography>
                    <Typography variant="subtitle2">
                      {t("cart.receiverInfo")}:{" "}
                      {item.items[0].receiverInfo?.name} - +966
                      {item.items[0].receiverInfo?.phone}
                    </Typography>
                    <div className="flex gap-5">
                      <Typography variant="subtitle2">
                        {/* {t("cart.brand")}: {item.cardSitting.brand.logoName} */}
                        {t("cart.brand")}: {item.items[0].brand.logoName}
                      </Typography>
                      <Typography variant="subtitle2">
                        {/* {t("cart.price")}: {item.cardSitting.price}{" "} */}
                        {t("cart.price")}: {item.items[0].price}
                        {t("currency")}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex gap-x-3">
                    <IconButton
                      onClick={() =>
                        dispatchCart({
                          type: "REMOVE_ITEM",
                          payload: index,
                          state: true,
                        })
                      }
                      className="!text-red-500 !bg-white"
                    >
                      <DeleteOutline fontSize="inherit" />
                    </IconButton>
                    <div className="grid place-items-center">
                      <IconButton
                        onClick={() => handleCheckout(item._id)}
                        className="!text-red-500 !bg-white "
                      >
                        <ShoppingBag fontSize="inherit" />
                      </IconButton>
                      {/* {t("cart.checkout")} */}
                      {/* </Button> */}
                    </div>
                  </div>
                </li>
              ) : (
                cart[0] && (
                  <li
                    // key={`${item?.items[0].brand}-${item.receiverInfo?.name}-${index}`}
                    className="flex justify-between items-center bg-primary-500 text-white rounded-lg p-4 my-4 overlay"
                    style={
                      item?.color && {
                        color: item?.color,
                      }
                    }
                  >
                    <div>
                      <Typography variant="h6">
                        {t("cart.readyCard")}
                      </Typography>
                      <Typography variant="subtitle2">
                        {t("cart.receiverInfo")}: {item.receiverInfo?.name} -
                        +966
                        {item.receiverInfo?.phone}
                      </Typography>
                      <div className="flex gap-5">
                        <Typography variant="subtitle2">
                          {t("cart.brand")}: {item.items[0].brand}
                        </Typography>
                        <Typography variant="subtitle2">
                          {t("cart.price")}: {item.items[0].price}{" "}
                          {t("currency")}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex gap-x-3">
                      <IconButton
                        onClick={() =>
                          dispatchCart({
                            type: "REMOVE_ITEM",
                            payload: index,
                            // state: false,
                          })
                        }
                        // onClick={() => handleOnRemove(index)}
                        className="!text-red-500 !bg-white"
                      >
                        <DeleteOutline fontSize="inherit" />
                      </IconButton>
                      <div className="grid place-items-center">
                        <IconButton
                          onClick={() => handleCheckout(item._id)}
                          className="!text-red-500 !bg-white "
                        >
                          <ShoppingBag fontSize="inherit" />
                        </IconButton>
                        {/* {t("cart.checkout")} */}
                        {/* </Button> */}
                      </div>
                    </div>
                  </li>
                )
              );
            })}
        </ul>
      </DrawerWithIconBtn>
    </Badge>
  );
}
