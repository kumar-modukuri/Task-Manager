import { useState } from "react";
import "./FormStyles.css";

const Form = ({ onAddTask }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);
	const [priority, setPriority] = useState("default");

	const handleAdd = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const id = Date.now();

			const newTask = {
				id,
				title,
				description,
				priority,
				status: "incomplete",
			};

			onAddTask(newTask);
		} catch (error) {
			console.log("Error While Adding Task : ", error);
		} finally {
			setLoading(false);
			setTitle("");
			setDescription("");
			setPriority("default");
		}
	};

	return (
		<form onSubmit={handleAdd}>
			<label>Title : </label>
			<input
				type="text"
				placeholder="Type here"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<label>Description : </label>
			<textarea
				rows="8"
				placeholder="Type here"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				required></textarea>
			<div className="priority">
				<div>
					<input
						type="radio"
						id="high"
						name="priority"
						value="high"
						checked={priority === "high"}
						onChange={(e) => setPriority(e.target.value)}
					/>
					<label htmlFor="high">High</label>
				</div>
				<div>
					<input
						type="radio"
						id="medium"
						name="priority"
						value="medium"
						checked={priority === "medium"}
						onChange={(e) => setPriority(e.target.value)}
					/>
					<label htmlFor="medium">Medium</label>
				</div>
				<div>
					<input
						type="radio"
						id="low"
						name="priority"
						value="low"
						checked={priority === "low"}
						onChange={(e) => setPriority(e.target.value)}
					/>
					<label htmlFor="low">Low</label>
				</div>
			</div>
			<button type="submit" className="btn" disabled={loading}>
				{loading ? "ADDING..." : "ADD"}
			</button>
		</form>
	);
};

export default Form;
