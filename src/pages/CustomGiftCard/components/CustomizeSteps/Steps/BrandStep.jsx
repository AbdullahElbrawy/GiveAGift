import React from "react";
import { Typography } from "@mui/material";
import axios from "axios";


export default function BrandStep({ brand, onBrandChange, t }) {

const [stores,setStores] = React.useState([])
	React.useEffect(() => {
		const fetchData = async () => {
		

			
			try {
				const response = await axios.get(`https://gifts-backend.onrender.com/get-shops-logos`)
			
				setStores(response.data);
			
			} catch (error) {
				console.error('Error fetching cards:', error);
			}
		};

		fetchData();
	}, []);


	return (
		<div className="flex flex-col items-center gap-6">
			<Typography
				variant="h4"
				className="md:!text-4xl !text-3xl capitalize"
				textAlign="center"
			>
				{t("customCard.brand.title")}
			</Typography>

			<ul className="flex justify-center gap-12 flex-wrap">
				{stores.map(({ logoName,logoWithoutBackground, logoImage,brandUrl }) => (
				
					<li key={logoName}>
						
						<button
							type="button"
							onClick={() => onBrandChange({ logoName, logoWithoutBackground,brandUrl })}
							className={`overflow-hidden rounded-full  shadow-lg ${
								logoName === brand.logoName
									? "outline-none ring-2 ring-offset-2 ring-red-500"
									: ""
							}`}
						>
							<img src={logoImage} alt="shape" className="w-[100px] h-[100px]" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}



