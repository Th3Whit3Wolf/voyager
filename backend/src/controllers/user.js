import Controller from "./Controller";

const UserController = new Controller("User", {
	searchAttributes: {
		//
		// isAdmin: false // <-- DO NOT FILTER BASED ON THIS ATTRIBUTE
	},
	queryOptions: {
		read: {
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				dsn: true,
				status: true,
				sperationDate: true,
				assignedUnit: true,
				gainingUnitID: true,
				role: true,
				supervisor: true,
				subordinates: true,
				tasksAssigned: true,
				taskApproverTasks: true,
				tasks: true
			}
		}
	},
	errorMessages: {
		create: "User could not be created"
	},
	enumAttributes: ["status"]
});

export default UserController;
