import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import axios from "axios";

export default function ShapeStep({ t, shape, onShapeChange, color }) {
	const [shapes, setShapes] = React.useState([])

	useEffect(() => {
		const fetchData = async () => {

			try {
				const response = await axios.get(`https://gifts-backend.onrender.com/shapes`)


			
				setShapes(response.data.shapes);

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
				{t("customCard.shape.title")}
			</Typography>

			<ul className="grid xl:grid-cols-2 justify-center gap-4 flex-wrap px-5">
				{shapes.map((cardShape) => (
					<li
						key={cardShape}
						className={`rounded-2xl shadow-lg    h-[180px]  object-contain  ${cardShape === shape ? "outline-none  ring-red-500" : ""
							}`}

						style={{ backgroundColor: color }}

					>
						<button
							type="button"
							className="w-full rounded-2xl relative h-full"
							onClick={() => onShapeChange(cardShape)}
						>
							<img
								src={cardShape}
								alt="shape"

								className="w-full h-full  rounded-2xl"
							/>
						</button>
					</li>
				))}

				<li
					className={`rounded-2xl shadow-lg ${!shape ? "outline-none  ring-red-500" : ""
						}`}
					style={{
						backgroundColor: color,
					}}
				>
					<button
						type="button"
						className="aspect-[2/1] w-full h-full rounded-2xl"
						onClick={() => onShapeChange(null)}
					></button>
				</li>
			</ul>
		</div>
	);
}


