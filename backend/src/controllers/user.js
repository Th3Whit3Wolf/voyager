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
				assignedUnit: {
					select: {
						id: true,
						kind: true,
						name: true,
						abbrev: true,
						function: true,
						assignedUsers: {
							select: {
								firstName: true,
								lastName: true,
								email: true,
								dsn: true,
								status: true,
								role: true,
								tasks: true
							}
						}
					}
				},
				assignedOfficeSymbol: true,
				gainingUnitID: true,
				gainingOfficeSymbol: true,
				role: true,
				supervisor: true,
				subordinates: true,
				tasksAssigned: {
					select: {
						id: true,
						title: true,
						description: true,
						isActive: true,
						kind: true,
						approver: true,
						createdAt: true,
						updatedAt: true
					}
				},
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
