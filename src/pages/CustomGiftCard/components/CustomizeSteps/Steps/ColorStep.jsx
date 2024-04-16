
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from "@mui/material";
import colors from "tailwindcss/colors";
const staticColors = [
    ...new Set(
        Object.values(colors)
            .filter((value) => value[200])
            .reduce((acc, value) => {
                const colorValues = [200, 500, 800].map((grade) => value[grade]);
                return [...acc, ...colorValues];
            }, [])
    ),
];
export default function ColorStep({ t, color, onColorChange }) {
	const [cardColors, setCardColors] = useState([]);

    useEffect(() => {
        axios.get('https://gifts-backend.onrender.com/api/colors') // Adjust this URL to where your server is hosted
            .then(response => {
                const fetchedColors = response.data.map(col => col.hex) // Assuming the stored data has a 'hex' field
                const combinedColors = Array.from(new Set([...staticColors, ...fetchedColors]))
                setCardColors(combinedColors)
            })
            .catch(error => console.error('Failed to fetch colors:', error))
    }, [])

	return (
		<div className="flex flex-col items-center gap-6">
			<Typography
				variant="h4"
				className="md:!text-4xl !text-3xl capitalize"
				textAlign="center"
			>
				{t("customCard.color.title")}
			</Typography>

			<ul className="flex justify-center gap-6 px-3 w-full flex-wrap">
			{cardColors.map((cardColor, index) => (
                    <li key={index}>
                        <button
                            className={`w-6 h-6 sm:w-9 sm:h-9 rounded-full ${
                                cardColor === color ? "outline-none ring-2 ring-offset-8 ring-red-500" : ""
                            }`}
                            style={{ backgroundColor: cardColor }}
                            onClick={() => onColorChange(cardColor)}
                        />
                    </li>
                ))}
			</ul>
		</div>
	);
}

// const CardColors = [
// 	...new Set(
// 		Object.values(colors)
// 			.filter((value) => value[200])
// 			.reduce((acc, value) => {
// 				const colorValues = [200, 500, 800].map((grade) => value[grade]);
// 				return [...acc, ...colorValues];
// 			}, [])
// 	),
// ];
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Typography } from "@mui/material";
// import colors from "tailwindcss/colors";

// const staticColors = [
//     ...new Set(
//         Object.values(colors)
//             .filter((value) => value[200])
//             .reduce((acc, value) => {
//                 const colorValues = [200, 500, 800].map((grade) => value[grade]);
//                 return [...acc, ...colorValues];
//             }, [])
//     ),
// ];

// export default function ColorStep({ t, color, onColorChange }) {
//     const [cardColors, setCardColors] = useState([]);

//     useEffect(() => {
//         axios.get('https://gifts-backend.onrender.com/api/colors') // Adjust this URL to where your server is hosted
//             .then(response => {
//                 const fetchedColors = response.data.map(col => col.hex); // Assuming the stored data has a 'hex' field
//                 const combinedColors = Array.from(new Set([...staticColors, ...fetchedColors]));
//                 setCardColors(combinedColors);
//             })
//             .catch(error => console.error('Failed to fetch colors:', error));
//     }, []);

//     return (
//         <div className="flex flex-col items-center gap-6">
//             <Typography
//                 variant="h4"
//                 className="md:!text-4xl !text-3xl capitalize"
//                 textAlign="center"
//             >
//                 {t("customCard.color.title")}
//             </Typography>

//             <ul className="flex justify-center gap-6 flex-wrap">
//                 {cardColors.map((cardColor, index) => (
//                     <li key={index}>
//                         <button
//                             className={`w-9 h-9 rounded-full ${
//                                 cardColor === color ? "outline-none ring-2 ring-offset-8 ring-red-500" : ""
//                             }`}
//                             style={{ backgroundColor: cardColor }}
//                             onClick={() => onColorChange(cardColor)}
//                         />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
