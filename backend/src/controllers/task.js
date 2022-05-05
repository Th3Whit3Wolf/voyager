/* eslint-disable indent */
import { Controller, db, handleDatabaseWrite } from "./Controller";

const TaskController = new Controller("Task", {
	searchAttributes: {
		//
		// isAdmin: false // <-- DO NOT FILTER BASED ON THIS ATTRIBUTE
	},
	queryOptions: {
		read: {
			select: {
				id: true,
				title: true,
				description: true,
				isActive: true,
				kind: true,
				assignerID: true,
				approverID: true,
				unitID: true,
				createdAt: true,
				updatedAt: true
			}
		}
	},
	errorMessages: {
		create: "Task could not be created"
	},
	enumAttributes: ["kind"]
});

TaskController.addTask = async (req, res) => {
	const { body } = req;

	try {
		const dataTask = await handleDatabaseWrite(
			this.dbResource.create({ data: body })
		);

		try {
			const dataUserTask = await handleDatabaseWrite(
				db.UserTask.create({
					data: {
						taskID: dataTask.id,
						userID: body.userID,
						progress: "NOT_STARTED",
						completedAt: null
					}
				})
			);

			return dataUserTask
				? res.status(201).send({
						data: {
							task: dataTask,
							userTask: dataUserTask
						}
				  })
				: res.status(500).send({ message: this.errorMessages.create });
		} catch (err) {
			return res.status(500).send({ message: this.errorMessages.create });
		}
	} catch (err) {
		return res.status(400).send({ message: err });
	}
};

export default TaskController;
