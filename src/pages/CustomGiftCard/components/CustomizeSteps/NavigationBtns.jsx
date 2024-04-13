import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  AddCircleOutlineRounded,
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { PRICE_LIMITS } from "../../hooks/useCardSittingReducer";
import { CartContext } from "../../../../store/CartContext";
import axios from "axios";

const MAX_STEPS = 4;

export default function NavigationBtns({
  activeStep,
  onActiveStepChange,
  onError,
  onSuccess,
  cardSitting,
}) {
  const { t } = useTranslation();
  const { dispatchCart } = useContext(CartContext);
  const isLastStep = activeStep === MAX_STEPS;
 
  const handleAddToCart = () => {

    if (cardSitting.receiverInfo.name === "")
      return onError("Please enter a name");
    else if (
      cardSitting.receiverInfo.phone === "" ||
      cardSitting.receiverInfo.phone.length !== 9 ||
      cardSitting.receiverInfo.phone[0] !== "5"
    )
      return onError("Please enter a phone number of 8 digits , start with 5");



    // post to the server
    axios
      .post("https://gifts-backend.onrender.com/api/cartCustom", cardSitting,  {
              headers: {
                   
                    "Access-Control-Allow-Origin":"*"
                },
          })
      .then((response) => {
        console.log(response);
        dispatchCart({
          type: "ADD_ITEM",
          payload: { cardSitting, ready: false },
          state: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    onSuccess(t("addToCartSuccess"));
  };

  const handleNextStep = () => {
    if (activeStep === 2) {
      if (cardSitting.brand.name === "") {
        onError("Please select a brand");
        return;
      }
    }

    if (activeStep === 3) {
      if (!cardSitting.message) {
        onError("Please enter a message");
        return;
      } else if (
        cardSitting.price < PRICE_LIMITS.min ||
        cardSitting.price > PRICE_LIMITS.max
      ) {
        onError(
          `Please enter a price between ${PRICE_LIMITS.min} and ${PRICE_LIMITS.max}`
        );
        return;
      }
    }

    onActiveStepChange(activeStep + 1);
   
  };

  return (
    <div className="flex justify-between px-4 mt-6">
      <IconButton
        disabled={activeStep === 0}
        onClick={() => onActiveStepChange(activeStep - 1)}
        className="rtl:rotate-180"
      >
        <ArrowBackIosNewRounded />
      </IconButton>

      <div>
        {isLastStep && (
          <Button
            type="button"
            startIcon={
              <AddCircleOutlineRounded className="rtl:-mr-2 rtl:ml-2" />
            }
            onClick={handleAddToCart}
          >
            {t("customCard.addToCart")}
          </Button>
        )}

        <IconButton
          disabled={isLastStep}
          onClick={handleNextStep}
          className="rtl:rotate-180"
        >
          <ArrowForwardIosRounded />
        </IconButton>
      </div>
    </div>
  );
}
