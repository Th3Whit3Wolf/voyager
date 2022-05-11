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
		cy.get("[data-testid=buttonInprocessingTasks]").should("exist");
		cy.get("[data-testid=buttonOutprocessingTasks]").should("exist");
	});

	it("should have tab for modifying subordinate admins ", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("button").contains("Modify Admins").should("exist");
	});

	it("the test Admin Terry Schiller should have 3 Inprocessing Tasks", () => {
		const numberOfColumns = 6;
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").click();
		cy.get("input").should("have.length", 3 * numberOfColumns);
	});

	it("the test Admin Terry Schiller should have 6 Outprocessing Tasks", () => {
		const numberOfColumns = 6;
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonOutprocessingTasks]").click();
		cy.get("input").should("have.length", 6 * numberOfColumns);
	});

	let numberOfInprocessingRows = 0;
	it("A Series of Checks: Step 1 - Get the Number of Inprocessing Tasks By Row Count", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("table")
			.find("tr")
			.its("length")
			.then(len => {
				numberOfInprocessingRows = len;
				cy.log(
					"Initial Inprocessing Admin Table Length: " + numberOfInprocessingRows
				);
			});
	});

	it("A Series of Checks: Step 2 - Click on the Add New Row Button", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=addTaskButton]").click();
	});

	let numberOfInprocessingRowsNew = 0;
	it("A Series of Checks: Step 3 - Get the Number of Inprocessing Tasks By Row Count Again", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("table")
			.find("tr")
			.its("length")
			.then(len => {
				numberOfInprocessingRowsNew = len;
				cy.log(
					"Initial Inprocessing Admin Table Length: " +
						numberOfInprocessingRowsNew
				);
			});
	});

	it("A Series of Checks: Step 4 - There Should Be One More Row than There had Been", () => {
		expect(numberOfInprocessingRowsNew - numberOfInprocessingRows).to.equal(1);
	});

	it("A Series of Checks: Step 5 - Find Last Row, Get Delete Button, Click It", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("table").find("tr").last().find("button").eq(1).click();
	});

	it("A Series of Checks: Step 6 - Get the Number of Inprocessing Tasks By Row Count Again", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("table")
			.find("tr")
			.its("length")
			.then(len => {
				numberOfInprocessingRowsNew = len;
				cy.log(
					"Initial Inprocessing Admin Table Length: " +
						numberOfInprocessingRowsNew
				);
			});
	});

	it("A Series of Checks: Step 7 - There To Be the Initial Number of Rows Again", () => {
		expect(numberOfInprocessingRowsNew - numberOfInprocessingRows).to.equal(0);
	});

	// it("A Series of Checks: Step 3 - ")
});