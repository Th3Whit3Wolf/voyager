describe("testing the User Dashboard View -- Inprocessing", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
		cy.get("input").first().type("sherri.ortiz@spaceforce.mil");
		cy.get("input").last().type("1234567890qwertyuiop");
		cy.get("button").first().click();
	});

	it("should have tabs for Inprocessing and Outprocessing", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").should("exist");
		cy.get("[data-testid=buttonOutprocessingTasks]").should("exist");
	});

	it("the test User Sherri Ortiz should have 3 Inprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").click();
		cy.get("input").should("have.length", 3);
	});

	it("the test User Sherri Ortiz should have 0 Outprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonOutprocessingTasks]").click();
		cy.get("input").should("have.length", 0);
	});

	it("the inprocessing tasks should all not be complete", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").click();
		for (let i = 0; i < cy.get("input").length; i++) {
			cy.get("input").eq(i).should("have.value", "false");
		}
	});

	it("clicking a checkbox should mark the task complete or incomplete as needed", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").click();
		cy.get("input").first().click();
		cy.get("input").first().should("have.value", "true");
		cy.get("input").first().click();
		cy.get("input").first().should("have.value", "false");
	});

	it("clicking a logout button will end session and return to login", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=logoutButton]").click();
		cy.url().should("eq", "http://localhost:3000/");
	});
});
