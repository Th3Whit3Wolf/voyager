describe("testing the User Dashboard View -- Outprocessing", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
		cy.get("input").first().type("raquel.orn@spaceforce.mil");
		cy.get("input").last().type("1234567890qwertyuiop");
		cy.get("button").first().click();
	});

	it("should have tabs for Inprocessing and Outprocessing", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("button").contains("Inprocessing Tasks").should("exist");
		cy.get("button").contains("Outprocessing Tasks").should("exist");
	});

	it("the test User Raquel Orn should have 0 Inprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("button").contains("Inprocessing Tasks").click();
		cy.get("input").should("have.length", 0);
	});

	it("the test Raquel Orn Ortiz should have 6 Outprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("button").contains("Outprocessing Tasks").click();
		cy.get("input").should("have.length", 6);
	});

	it("the outprocessing tasks should have at least 2 complete", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("button").contains("Outprocessing Tasks").click();
		for (let i = 0; i < 4; i++) {
			cy.get("input").eq(i).should("have.value", "false");
		}
		for (let i = 4; i < 6; i++) {
			cy.get("input").eq(i).should("have.value", "true");
		}
	});

	it("clicking a checkbox should mark the task complete or incomplete as needed", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("button").contains("Outprocessing Tasks").click();

		cy.get("input").first().click();
		cy.get("input").first().should("have.value", "true");
		cy.get("input").first().click();
		cy.get("input").first().should("have.value", "false");
	});

	it("clicking a logout button will end session and return to login", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("button").contains("Logout").click();
		cy.url().should("eq", "http://localhost:3000/");
	});
});
