import { Controller } from "#Controller";

const UnitController = new Controller("Unit", {
	searchAttributes: {
		//
		// isAdmin: false // <-- DO NOT FILTER BASED ON THIS ATTRIBUTE
	},
	queryOptions: {
		read: {
			select: {
				id: true,
				kind: true,
				name: true,
				abbrev: true,
				function: true,
				assignedUsers: {
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
												dsn: true
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
				},
				gainingUsers: {
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
												dsn: true
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
				},
				children: {
					select: {
						id: true,
						name: true,
						abbrev: true,
						function: true,
						assignedUsers: true,
						gainingUsers: true
					}
				},
				parent: {
					select: {
						id: true,
						name: true,
						abbrev: true,
						function: true,
						assignedUsers: true,
						gainingUsers: true
					}
				},
				grandChildren: {
					select: {
						id: true,
						name: true,
						abbrev: true,
						function: true,
						assignedUsers: true,
						gainingUsers: true
					}
				},
				grandParent: {
					select: {
						id: true,
						name: true,
						abbrev: true,
						function: true,
						assignedUsers: true,
						gainingUsers: true
					}
				},
				installationChildren: {
					select: {
						id: true,
						name: true,
						abbrev: true,
						function: true,
						assignedUsers: true,
						gainingUsers: true
					}
				},
				installation: {
					select: {
						id: true,
						name: true,
						abbrev: true,
						function: true,
						assignedUsers: true,
						gainingUsers: true
					}
				}
			}
		}
	},
	errorMessages: {
		create: "Unit could not be created"
	},
	enumAttributes: ["kind"]
});

export default UnitController;
