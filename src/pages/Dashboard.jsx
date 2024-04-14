import React, { useState } from 'react';
import axios from 'axios'
import TransactionsTable from './Transactions'; // Assuming you save it in the same directory

const Dashboard = () => {

    const [formData, setFormData] = useState({
        logoName: '',
        logoImage: null,
        brandDescription: '',
        cardFront: null,
        cardBack: null,
        logoWithoutBackground: null,
        shapes: [],
        color: '',
        price: '',
        brandUrl: '',
        fontFile: null, // Added for font file upload
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        const fileSizeLimit = 10 * 1024 * 1024; // 10 MB limit

        if (name === 'shapes' || name === 'logoImage' || name === 'logoWithoutBackground' || name === 'cardFront' || name === 'cardBack' || name === 'fontFile') {
            if (name === 'shapes') {
                const fileArray = Array.from(files).filter(file => file.size <= fileSizeLimit);
                setFormData(prev => ({ ...prev, shapes: fileArray }));
            } else {
                const file = files[0];
                if (file && file.size <= fileSizeLimit) {
                    setFormData(prev => ({ ...prev, [name]: file }));
                } else {
                    alert("File size must be less than 10 MB!");
                }
            }
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData();
        form.append('logoName', formData.logoName);
        form.append('logoImage', formData.logoImage);
        form.append('brandDescription', formData.brandDescription);
        form.append('logoWithoutBackground', formData.logoWithoutBackground);
        form.append('brand', formData.brand);
        form.append('brandUrl', formData.brandUrl)
        try {
            await axios.post('https://gifts-backend.onrender.com/submit-form', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*"
                },
            });

        } catch (error) {
            console.error('Error submitting form', error);
        }
    };



    const handleSubmitCards = async (event) => {
        event.preventDefault();
        const form = new FormData();
        form.append('price', formData.price);
        form.append('cardFront', formData.cardFront);
        form.append('cardBack', formData.cardBack);
        form.append('logoImage', formData.logoImage);
        form.append('brand', formData.brand);

        form.append('brandUrl', formData.brandUrl);


        try {
            await axios.post('https://gifts-backend.onrender.com/submit-card', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*"
                },
            });

        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    const handleCustomCardSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData();

        // Assuming `formData.shapes` is the FileList from input
        // Loop over the FileList and append each file
        for (let i = 0; i < formData.shapes.length; i++) {
            form.append('shapes', formData.shapes[i]);
        }


        form.append('id', '65c3f41ef8c6ea8d713998d2');

        try {
            const response = await axios.post('https://gifts-backend.onrender.com/submit-custom-card', form, {
                headers: {

                    "Access-Control-Allow-Origin": "*"
                },
            });
            // Handle success response
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting custom card form', error);
        }
    };

    const handleSubmitAssets = async (event) => {
        event.preventDefault();
        const form = new FormData();
        form.append('color', formData.color);
        form.append('font', formData.font); // Assuming 'font' is a text input for the font name

        if (formData.fontFile) {
            form.append('fontFile', formData.fontFile);
        }

        try {
            const response = await axios.post('https://gifts-backend.onrender.com/submit-assets', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            console.log('Assets submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting assets', error);
        }
    };


    return (

        <div className="container mx-auto   px-4 py-[200px]">
            <div className="grid gap-8 border-2 border-black py-10 px-10">
                <form onSubmit={handleSubmit} >
                    <div className="mb-5">
                        <label htmlFor="logoName" className="block text-gray-700 text-md font-bold mb-2">Logo Name Brand</label>
                        <input type="text" id="logoName" name="logoName" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="logoImage" className="block text-gray-700 text-md font-bold mb-2">Logo Image</label>
                        <input type="file" id="logoImage" name="logoImage" onChange={handleFileChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" accept="image/png,image/jpg, image/jpeg, image/gif" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="brandDescription" className="block text-gray-700 text-md font-bold mb-2">Brand Description</label>
                        <textarea id="brandDescription" name="brandDescription" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="logoWithoutBackground" className="block text-gray-700 text-md font-bold mb-2">Logo Without Background</label>
                        <input type="file" id="logoWithoutBackground" name="logoWithoutBackground" onChange={handleFileChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" accept="image/png, image/jpeg, image/gif" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="brandUrl" className="block text-gray-700 text-md font-bold mb-2">Brand Url</label>
                        <input type="text" id="brandUrl" name="brandUrl" onChange={handleInputChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" />
                    </div>
                    <button type="submit" className="bg-secondary-500 hover:bg-rose-500 text-white font-bold w-full  py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit
                    </button>
                </form>
            </div>
            <div className='grid gap-8 border-2 mt-10  border-black py-10 px-10'>
                <form onSubmit={handleSubmitCards}>
                    <div className="mb-5">
                        <label htmlFor="cardFront" className="block text-gray-700 text-md font-bold mb-2">card front</label>
                        <input type="file" id="cardFront" name="cardFront" onChange={handleFileChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" accept="image/png, image/jpeg, image/gif" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="cardBack" className="block text-gray-700 text-md font-bold mb-2">card back</label>
                        <input type="file" id="cardBack" name="cardBack" onChange={handleFileChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" accept="image/png, image/jpeg, image/gif" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="logoImage" className="block text-gray-700 text-md font-bold mb-2">Logo Image</label>
                        <input type="file" id="logoImage" name="logoImage" onChange={handleFileChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" accept="image/png, image/jpeg, image/gif" />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="Price" className="block text-gray-700 text-md font-bold mb-2">price</label>
                        <input type="number" min='100' max='500' id="Price" name="price" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="brand" className="block text-gray-700 text-md font-bold mb-2">brand </label>
                        <input type="text" id="brand" name="brand" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="brandUrl" className="block text-gray-700 text-md font-bold mb-2">Brand Url</label>
                        <input type="text" id="brandUrl" name="brandUrl" onChange={handleInputChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" />
                    </div>
                    <button type="submit" className="bg-secondary-500 hover:bg-rose-500 text-white font-bold py-2 w-full  px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit
                    </button>
                </form>
            </div>
            <div className='grid gap-8 border-2 border-black mt-10  py-10 px-10'>
                <form onSubmit={handleCustomCardSubmit}>

                    <div className="mb-5">
                        <label htmlFor="shapes" className="block text-gray-700 text-md font-bold mb-2">Shapes</label>

                        <input
                            type="file"
                            id="shapes"
                            name="shapes"
                            onChange={handleFileChange}
                            multiple
                            className="w-full text-md text-gray-700 py-1 px-2 border rounded"
                            accept="image/png, image/jpeg, image/gif"
                        />
                        <div id="file-size-warning" style={{ color: "red", display: "none" }}>
                            File size must be less than 10 MB!
                        </div>
                    </div>
                    <button type="submit" className="bg-secondary-500 hover:bg-rose-500 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit
                    </button>
                </form>

         
            
            </div>
            <div className='grid gap-8 border-2 border-black mt-10  py-10 px-10'>
                    <form onSubmit={handleSubmitAssets}>
                        <div className="mb-5">
                            <label htmlFor="color" className="block text-gray-700 text-md font-bold mb-2">Color</label>
                            <input type="text" id="color" name="color" onChange={handleInputChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="font" className="block text-gray-700 text-md font-bold mb-2">Font Name</label>
                            <input type="text" id="font" name="font" onChange={handleInputChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="fontFile" className="block text-gray-700 text-md font-bold mb-2">Font File</label>
                            <input type="file" id="fontFile" name="fontFile" onChange={handleFileChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" accept=".ttf, .otf, .woff, .woff2" />
                        </div>
                        <button type="submit" className="bg-secondary-500 hover:bg-rose-500 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                    </form>

                </div>
            <div className="mt-10">
                <TransactionsTable /> {/* Place the transactions table on the dashboard */}
            </div>
        </div>

    );
};

export default Dashboard;
