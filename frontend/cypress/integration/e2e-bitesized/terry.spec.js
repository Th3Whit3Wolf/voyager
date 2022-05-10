import { NearbyOffTwoTone } from "@mui/icons-material";

describe("testing the User Dashboard View -- Inprocessing", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
		cy.get("input").first().type("terry.schiller@spaceforce.mil");
		cy.get("input").last().type("1234567890qwertyuiop");
		cy.get("button").first().click();
	});

	it("should have tabs for Inprocessing and Outprocessing", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("button").contains("Inprocessing Tasks").should("exist");
		cy.get("button").contains("Outprocessing Tasks").should("exist");
	});

	it("should have tab for modifying subordinate admins ", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("button").contains("Modify Admins").should("exist");
	});

	it("the test Admin Terry Schiller should have 3 Inprocessing Tasks", () => {
		const numberOfColumns = 6;
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("button").contains("Inprocessing Tasks").click();
		cy.get("input").should("have.length", 3 * numberOfColumns);
	});

	it("the test Admin Terry Schiller should have 6 Outprocessing Tasks", () => {
		const numberOfColumns = 6;
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("button").contains("Outprocessing Tasks").click();
		cy.get("input").should("have.length", 6 * numberOfColumns);
	});
});
