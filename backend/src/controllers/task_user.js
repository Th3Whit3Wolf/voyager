import Controller from "./Controller";

const TaskUserController = new Controller("TaskUser", {
	searchAttributes: {
		//
		// isAdmin: false // <-- DO NOT FILTER BASED ON THIS ATTRIBUTE
	},
	queryOptions: {
		read: {
			select: {
				id: true,
				progress: true,
				task: true,
				user: true,
				completedAt: true,
				createdAt: true,
				updatedAt: true
			}
		}
	},
	errorMessages: {
		create: "Task could not be created"
	},
	enumAttributes: ["progress"]
});

export default TaskUserController;
