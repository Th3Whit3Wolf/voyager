import { Controller } from "#Controller";

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
				separationDate: true,
				assignedUnit: {
					select: {
						id: true,
						kind: true,
						name: true,
						abbrev: true,
						function: true,
						img: true,
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
						approver: {
							select: {
								firstName: true,
								lastName: true,
								email: true,
								dsn: true,
								assignedOfficeSymbol: true,
								assignedUnit: {
									select: {
										name: true,
										abbrev: true,
										function: true,
										img: true
									}
								}
							}
						},
						createdAt: true,
						updatedAt: true
					}
				},
				taskApproverTasks: true,
				tasks: {
					select: {
						id: true,
						progress: true,
						task: {
							select: {
								id: true,
								title: true,
								description: true,
								isActive: true,
								kind: true,
								approver: {
									select: {
										firstName: true,
										lastName: true,
										email: true,
										dsn: true,
										assignedOfficeSymbol: true,
										assignedUnit: {
											select: {
												name: true,
												abbrev: true,
												function: true,
												img: true
											}
										}
									}
								},
								assigner: {
									select: {
										firstName: true,
										lastName: true,
										email: true,
										dsn: true,
										role: {
											select: {
												kind: true
											}
										}
									}
								}
							}
						},
						createdAt: true,
						updatedAt: true,
						completedAt: true
					}
				}
			}
		}
	},
	errorMessages: {
		create: "User could not be created"
	},
	enumAttributes: ["status"]
});

export default UserController;
