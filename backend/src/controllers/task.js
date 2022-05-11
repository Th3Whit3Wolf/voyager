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
				assigner: true,
				approver: true,
				unit: true,
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
			db.Task.create({ data: body })
		);

		try {
			const isOutProcessing = body.kind === "OUT_PROCESSING";
			const outProcessingCond = [
				{
					AND: [
						{
							status: { equals: "OUT_PROCESSING" }
						},
						{
							OR: [
								{
									assignedUnit: {
										id: { equals: body.unitID }
									}
								},
								{
									assignedUnit: {
										parentID: { equals: body.unitID }
									}
								},
								{
									assignedUnit: {
										grandParentID: { equals: body.unitID }
									}
								},
								{
									assignedUnit: {
										installationID: { equals: body.unitID }
									}
								}
							]
						}
					]
				},
				{
					AND: [
						{
							status: { equals: "OUT_PROCESSING_WITH_ORDERS" }
						},
						{
							OR: [
								{
									assignedUnit: {
										id: { equals: body.unitID }
									}
								},
								{
									assignedUnit: {
										parentID: { equals: body.unitID }
									}
								},
								{
									assignedUnit: {
										grandParentID: { equals: body.unitID }
									}
								},
								{
									assignedUnit: {
										installationID: { equals: body.unitID }
									}
								},
								{
									gainingUnit: {
										id: { equals: body.unitID }
									}
								},
								{
									gainingUnit: {
										parentID: { equals: body.unitID }
									}
								},
								{
									gainingUnit: {
										grandParentID: { equals: body.unitID }
									}
								},
								{
									gainingUnit: {
										installationID: { equals: body.unitID }
									}
								}
							]
						}
					]
				}
			];

			const inProcessingCond = [
				{
					AND: [
						{
							status: { equals: "IN_TRANSIT" }
						},
						{
							OR: [
								{
									gainingUnit: {
										id: { equals: body.unitID }
									}
								},
								{
									gainingUnit: {
										parentID: { equals: body.unitID }
									}
								},
								{
									gainingUnit: {
										grandParentID: { equals: body.unitID }
									}
								},
								{
									gainingUnit: {
										installationID: { equals: body.unitID }
									}
								}
							]
						}
					]
				},
				{
					AND: [
						{
							status: { equals: "IN_PROCESSING" }
						},
						{
							OR: [
								{
									assignedUnit: {
										id: { equals: body.unitID }
									}
								},
								{
									assignedUnit: {
										parentID: { equals: body.unitID }
									}
								},
								{
									assignedUnit: {
										grandParentID: { equals: body.unitID }
									}
								},
								{
									assignedUnit: {
										installationID: { equals: body.unitID }
									}
								}
							]
						}
					]
				}
			];

			const affectedUsers = await handleDatabaseWrite(
				db.User.findMany({
					where: {
						OR: isOutProcessing
							? outProcessingCond
							: inProcessingCond
					}
				})
			);
			try {
				const data = affectedUsers.map(usr => ({
					taskID: dataTask.id,
					userID: usr.id,
					progress: "NOT_STARTED",
					completedAt: null
				}));
				const dataUserTask = await handleDatabaseWrite(
					db.TaskUser.createMany({
						data
					})
				);

				return dataUserTask
					? res.status(201).send({
							data: {
								taskID: dataTask.id,
								approverID: body.approverID,
								users: affectedUsers,
								count: dataUserTask.count
							}
					  })
					: res.status(500).send({
							message: "Unable to create users tasks"
					  });
			} catch (err) {
				return res
					.status(500)
					.send({ message: "Unable to create users tasks", err });
			}
		} catch (err) {
			return res
				.status(400)
				.send({ message: "Unable to get affected users", err });
		}
	} catch (err) {
		return res.status(400).send({ message: "Unable to create task", err });
	}
};

export default TaskController;
