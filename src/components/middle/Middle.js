import { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import "../../index.css";
import Form from "./Form.js";
import "./MiddleStyles.css";

const Middle = () => {
	const [searched, setSearched] = useState("");
	const [filters, setFilters] = useState([]);

	const handleFilterChange = (filter) => {
		setFilters((prevFilters) => {
			if (prevFilters.includes(filter)) {
				return prevFilters.filter((f) => f !== filter);
			} else {
				return [...prevFilters, filter];
			}
		});
	};

	const handleReset = () => {
		setFilters([]);
	};

	useEffect(() => {
		console.log(filters);
	}, [filters]);

	return (
		<div className="middle-container">
			<div className="search-div">
				<input
					type="text"
					placeholder="Search Tasks"
					value={searched}
					onChange={(e) => setSearched(e.target.value)}
				/>
				<button className="btn">SEARCH</button>
			</div>
			<div className="content-div">
				<div className="tasks-div">
					<div className="filters-div">
						<div>
							<input
								type="checkbox"
								onChange={() => handleFilterChange("High")}
								checked={filters.includes("High")}
							/>
							<label>High</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => handleFilterChange("Medium")}
								checked={filters.includes("Medium")}
							/>
							<label>Medium</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => handleFilterChange("Low")}
								checked={filters.includes("Low")}
							/>
							<label>Low</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => handleFilterChange("Default")}
								checked={filters.includes("Default")}
							/>
							<label>Default</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => handleFilterChange("Completed")}
								checked={filters.includes("Completed")}
							/>
							<label>Completed</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => handleFilterChange("Not Completed")}
								checked={filters.includes("Not Completed")}
							/>
							<label>Not Completed</label>
						</div>
						<div style={{ cursor: "pointer" }} onClick={handleReset}>
							<GrPowerReset color="#4650fa" size={20} />
						</div>
					</div>
					<div className="tasks-container"></div>
				</div>
				<div className="form-div">
					<Form />
				</div>
			</div>
		</div>
	);
};

export default Middle;
