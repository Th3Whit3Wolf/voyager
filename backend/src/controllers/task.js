import Controller from "./Controller";

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

export default TaskController;
