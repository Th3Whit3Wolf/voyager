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
				assignedUsers: true,
				gainingUsers: true,
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
