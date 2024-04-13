import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import GiftCard from "./pages/GiftCard";
import CustomGiftCard from "./pages/CustomGiftCard";
import Checkout from "./pages/Checkout";
import GiftCardPreview from "./pages/GiftCardPreview";
import Stores from "./pages/Stores";
import Dashboard from "./pages/Dashboard";
import Error from "./components/error";


export const router = createBrowserRouter([
	{
	 path: "/",
    element: (
      <Error>
        <App />
      </Error>
    ),
		children: [
			{ index: true, element: <Home /> },
			{ path: "/about", element: <About /> },
			{
				path: "/gift-card",
				element: <GiftCard />,
			},
			{
				path: "/custom-gift-card",
				element: <CustomGiftCard />,
			},
			{
				path: "/gift-card-preview/:cardId",
				element: <GiftCardPreview />,
			},
			{
				path : "/checkout/:index",
				element: <Error><Checkout /></Error>,
			},
			{
				path: "/stores",
				element: <Stores />,
			},
			{
				path: "https://give-a-gift.vercel.app/dashboard/sarga123456789",
				element: <Dashboard />,
			},
			  { path: "*", element:  <Home /> },
		],

	},
]);
