import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Select,
  InputLabel,
  MenuItem,
  InputAdornment,
  Grid,
  Card,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  LocalizationProvider,
  DatePicker,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

import axios from "axios";
import { CartContext } from "../store/CartContext";
import { useNavigate, useParams } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { index: cardId } = useParams();
  const { cart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0); // For storing total price

  const instanceCard = cart.find((item) => item._id === cardId);
  console.log("instanceCard: ", instanceCard);

   

  // Adjusted to use the current dayjs object for minDateTime
  const MIN_SCHEDULE_DATE = dayjs(); // Using dayjs to get the current time
 const MAX_SCHEDULE_DATE = dayjs().add(31, "day");
  const [isScheduled, setIsScheduled] = useState(false);
  
  const [expiryDate, setExpiryDate] = useState("");
    const [scheduleState, setScheduleState] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(dayjs());
const [schedule, setSchedule] = useState(dayjs()); // Adjusted to use the current dayjs object

  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    email: "",
    mobile: "",
  });
  const [cartItems, setCartItems] = useState([]); // For storing list of items


  const handleCustomerDetailsChange = (event) => {
    const { name, value } = event.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };
  const { t, i18n } = useTranslation();
  // State declarations
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    country: "Saudi Arabia", // Default or detected user's country
    address: "",
    city: "",
    zip: "",
    email: "",
    phoneNumber: "",
  });
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionDetails, setSessionDetails] = useState({
    countryCode: "",
    sessionId: "",
  });
  const [isSessionLoading, setIsSessionLoading] = useState(false);
  const [sessionError, setSessionError] = useState("");
  // Add states
  const [myFatoorahInitialized, setMyFatoorahInitialized] = useState(false);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  // State for selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("applePay");


  const [fatorahError, setFatorahError] = useState(false);
  const [applePaySupported, setApplePaySupported] = useState(false);
  
  const initiateAndLoadScript = async () => {
    setIsSessionLoading(true);
    try {
      const response = await axios.post("https://gifts-backend.onrender.com/api/initiateSession");
      const sessionId = response.data.Data.SessionId;

      // Assuming SA for Saudi Arabia
      setSessionDetails({ countryCode: "SAU", sessionId });

      // Now load the script
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://sa.myfatoorah.com/cardview/v2/session.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      // Initialize MyFatoorah only after the script is loaded
      if (window.myFatoorah) {
        const config = {
          sessionId,
          countryCode: "SAU",
          cardViewId: "card-element2",
        };
        window.myFatoorah.init(config);
        setMyFatoorahInitialized(true);
      }
    } catch (error) {
      console.error("Failed to initiate session or load MyFatoorah script:", error);
      setSessionError("Failed to initiate session.");
    } finally {
      setIsSessionLoading(false);
    }
  };
  // Modify the useEffect hook that triggers session initiation and script loading
  useEffect(() => {
    initiateAndLoadScript();
  }, []); // This ensures it runs once on component mount

  useEffect(() => {
   
  
    // total price
    setTotalPrice(instanceCard.items[0].price);
  }, []);

 
  const handlePayment = async (e) => {
    e.preventDefault();

   

    // Ensure MyFatoorah is initialized
    if (!myFatoorahInitialized) {
        console.error("MyFatoorah is not initialized.");
        setError("Payment gateway not initialized. Please try again.");
        return;
    }

    setIsLoading(true);
    setFatorahError(false);

    try {
        const fatoorahResponse = await window.myFatoorah.submit();
        console.log("fatoorahResponse: ", fatoorahResponse);
           // update the card to be paid
              // update the card to be paid
              const payload = {
                scheduleDate: scheduleDate.toISOString(),
                scheduleState:scheduleState,
                phone:`966${instanceCard.items[0].receiverInfo.phone}`
              };
              await axios.put(
                `https://gifts-backend.onrender.com/api/cart-update-payment/${instanceCard._id}`,
                payload,
               
              );
      
  
          navigate(`/gift-card-preview/${instanceCard._id}`);
    } catch (error) {
        console.error("Payment processing failed", error);
        setError("Payment failed: " + (error.message || "Unknown error"));
        setFatorahError(true);
    } finally {
        setIsLoading(false);
    }
};



  // https://api-sa.myfatoorah.com/v2/RegisterApplePayDomain

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container mx-auto my-[200px] bg-white shadow-md rounded px-8 py-8 ">
        <form onSubmit={handlePayment} className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold mb-5">{t("checkout.title")}</h2>
          {/* Billing & Shipping Section */}
          <div>
            <h3 className="font-bold mb-2 text-lg">{t("checkout.billing")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextField
                label="First Name *"
                name="firstName"
                onChange={handleCustomerDetailsChange}
                required
                className="w-full"
              />
              <TextField
                label="Last Name *"
                name="lastName"
                onChange={handleCustomerDetailsChange}
                required
                className="w-full"
              />
              <TextField
                label="Email Address *"
                name="email"
                onChange={handleCustomerDetailsChange}
                required
                type="email"
                className="w-full"
              />

              <TextField
                label="Phone Number"
                name="mobile"
                onChange={handleCustomerDetailsChange}
                required
                className="w-full"
              />
            </div>
            <Divider />
          </div>

          {/* Additional Information Section */}
          <div>
            <h3 className="font-bold mb-2 text-lg">
              {t("checkout.additional")}
            </h3>
            <TextField
              label="Order Notes (optional)"
              name="additionalInfo"
              onChange={handleCustomerDetailsChange}
              multiline
              rows={4}
              className="w-full mb-4"
            />
            <Divider />
          </div>

          {/* Your Order Section */}
          <div>
            <h3 className="font-bold mb-2 text-lg">{t("checkout.order")}</h3>
            <div className="mb-4">
              {/* Map through your order items here */}

              <div className="flex justify-between py-2">
                {/* <span>{instanceCard.items[0].brand.logoName}</span> */}
                <span>
                  {`
                    ${
                      instanceCard?.ready
                        ? instanceCard?.receiverInfo.name
                        : instanceCard?.items[0].brand.logoName
                    }
                `}
                </span>

                <span>{`${instanceCard?.items[0].price.toFixed()} SAR`}</span>
              </div>
              {/* Total cost */}
              <div className="flex justify-between py-2 font-bold">
                <span>{t("checkout.total")}</span>
                <span>{`${totalPrice.toFixed()} SAR`}</span>
                {/* <span>{`${instanceCard.items[0].price.toFixed()} SAR`}</span> */}
              </div>
            </div>
            <Divider />
          </div>

          {/* section for show code and it is not activated  */}
          <div></div>

          {/* Terms and Conditions */}

          <div
            id="card-element"
            className="first-of-type:[&_iframe]:hidden last-of-type:[&_iframe]:!block  "
          ></div>
          <div
            id="card-element2"
            // className="first-of-type:[&_iframe]:block last-of-type:[&_iframe]:!hidden  "
          ></div>

          <FormControlLabel
            control={<Checkbox name="agreeToTerms" />}
            label={t("checkout.rules")}
            className="my-4"
          />
          {/* Schedule Delivery Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={isScheduled}
                onChange={(e) => setIsScheduled(e.target.checked)}
              />
            }
            label={t("checkout.scheduled")}
            className="self-start"
          />
         <StaticDateTimePicker
            orientation="landscape"
            value={schedule}
            onChange={(newValue) => {
              setScheduleState(true)
              setSchedule(newValue);
              setScheduleDate(newValue); // Update scheduleDate as well if needed
            }}
            minDateTime={dayjs()} // Ensures the minimum selectable date is the current date
            maxDateTime={dayjs().add(31, "day")}
            disabled={!isScheduled}
            className={`${isScheduled ? "" : "opacity-50 pointer-events-none"}`}
            />
          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            value={"submit"}
            className="w-full py-[20px] h-[50px	] text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
            // onClick={handlePayment}
          >
            {isSessionLoading && <CircularProgress />}
            <span>{t("checkout.submit")}</span>
          </Button>

          {/* Error Message */}
          {error && <div className="text-red-500 text-lg mt-2">{error}</div>}
        </form>
      </div>
    </LocalizationProvider>
  );
};

export default Checkout;
