import { useState } from "react";
import "../../index.css";
import "./MiddleStyles.css";

const Middle = () => {
	const [searched, setSearched] = useState("");

	return (
		<div className="middle-container">
			<div className="search-div">
				<input
					type="text"
					placeholder="Search Tasks"
					value={searched}
					onChange={(e) => setSearched(e.target.value)}
				/>
				<button>SEARCH</button>
			</div>
			<div className="content-div">Content</div>
		</div>
	);
};

export default Middle;
