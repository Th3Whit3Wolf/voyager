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
				children: {
					select: {
						id: true,
						name: true,
						abbrev: true,
						function: true
					}
				},
				grandChildren: {
					select: {
						id: true,
						name: true,
						abbrev: true,
						function: true
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
