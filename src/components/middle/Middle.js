import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import "../../index.css";
import Form from "./Form.js";
import "./MiddleStyles.css";

const Middle = () => {
	const [searched, setSearched] = useState("");
	const [filters, setFilters] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [expandedTasks, setExpandedTasks] = useState({});

	useEffect(() => {
		const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
		setTasks(savedTasks);
	}, []);

	const handleAddTask = (newTask) => {
		const updatedTasks = [...tasks, newTask];
		setTasks(updatedTasks);
		localStorage.setItem("tasks", JSON.stringify(updatedTasks));
	};

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

	const toggleDescription = (id) => {
		setExpandedTasks((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	const handleDelete = (id) => {
		const updatedTasks = tasks.filter((task) => task.id !== id);
		setTasks(updatedTasks);
		localStorage.setItem("tasks", JSON.stringify(updatedTasks));
	};

	const handleCheckboxChange = (id) => {
		const updatedTasks = tasks.map((task) => {
			if (task.id === id) {
				return {
					...task,
					status: task.status === "completed" ? "incomplete" : "completed",
				};
			}
			return task;
		});
		setTasks(updatedTasks);
		localStorage.setItem("tasks", JSON.stringify(updatedTasks));
	};

	return (
		<div className="middle-container">
			<div className="search-div">
				<input
					type="text"
					placeholder="Search Tasks"
					value={searched}
					onChange={(e) => setSearched(e.target.value)}
				/>
			</div>
			<div className="content-div">
				<div className="tasks-div">
					<div className="filters-div">
						<div>
							<input
								type="checkbox"
								onChange={() => handleFilterChange("high")}
								checked={filters.includes("high")}
							/>
							<label>High</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => handleFilterChange("medium")}
								checked={filters.includes("medium")}
							/>
							<label>Medium</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => handleFilterChange("low")}
								checked={filters.includes("low")}
							/>
							<label>Low</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => handleFilterChange("default")}
								checked={filters.includes("default")}
							/>
							<label>Default</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => handleFilterChange("completed")}
								checked={filters.includes("completed")}
							/>
							<label>Completed</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => handleFilterChange("incomplete")}
								checked={filters.includes("incomplete")}
							/>
							<label>InComplete</label>
						</div>
						<div style={{ cursor: "pointer" }} onClick={handleReset}>
							<GrPowerReset color="#4650fa" size={20} />
						</div>
					</div>
					<div className="tasks-container">
						{tasks.length === 0 ? (
							<div className="message">
								<h1>No Tasks</h1>
								<p>Added Tasks will appear here</p>
							</div>
						) : (
							tasks
								.slice()
								.sort((a, b) => a.title.localeCompare(b.title))
								.filter(
									(task) =>
										(searched === "" ||
											task.title
												.toLowerCase()
												.includes(searched.toLowerCase())) &&
										(filters.length === 0 ||
											(filters.includes("high") && task.priority === "high") ||
											(filters.includes("medium") &&
												task.priority === "medium") ||
											(filters.includes("low") && task.priority === "low") ||
											(filters.includes("default") &&
												task.priority === "default") ||
											(filters.includes("completed") &&
												task.status === "completed") ||
											(filters.includes("incomplete") &&
												task.status === "incomplete"))
								)
								.map((task) => (
									<div
										key={task.id}
										className={`task-item ${
											task.status === "completed" ? "completed-task" : ""
										}`}>
										<div className="details">
											<p className="title">{task.title}</p>
											{expandedTasks[task.id] && (
												<div>
													<p>Description : {task.description}</p>
													<p>Priority : {task.priority}</p>
													<p>Status : {task.status}</p>
												</div>
											)}
										</div>
										<div className="actions">
											<input
												type="checkbox"
												checked={task.status === "completed"}
												onChange={() => handleCheckboxChange(task.id)}
											/>
											<span onClick={() => handleDelete(task.id)}>
												<MdDelete size={20} color="red" />
											</span>
											<span
												className="toggle-btn"
												onClick={() => toggleDescription(task.id)}>
												{expandedTasks[task.id] ? (
													<FiChevronUp />
												) : (
													<FiChevronDown />
												)}
											</span>
										</div>
									</div>
								))
						)}
					</div>
				</div>
				<div className="form-div">
					<Form onAddTask={handleAddTask} />
				</div>
			</div>
		</div>
	);
};

export default Middle;
