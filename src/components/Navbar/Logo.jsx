import { Link } from "react-router-dom";

export default function Logo() {
	return (
		<Link to="/">
			<img src="https://i.imgur.com/wkyCwby.png" alt="logo" width={128} height={128} />
		</Link>
	);
}
