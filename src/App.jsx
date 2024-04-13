import { Outlet } from "react-router-dom";
import RootLayout from "./RootLayout";
import { useNavigate } from 'react-router-dom';

import ErrorBoundary from './components/error'; // Import the ErrorBoundary component

function App() {
	 let navigate = useNavigate()
	return (
		<RootLayout>
			  
				<Outlet />
	
			
		</RootLayout>
	);
}

export default App;
