import { Controller } from "./Controller";

const RoleController = new Controller("Role", {
	searchAttributes: {
		//
		// isAdmin: false // <-- DO NOT FILTER BASED ON THIS ATTRIBUTE
	},
	queryOptions: {
		read: {
			select: {
				id: true,
				kind: true
			}
		}
	},
	errorMessages: {
		create: "Role could not be created"
	},
	enumAttributes: ["kind"]
});

export default RoleController;
