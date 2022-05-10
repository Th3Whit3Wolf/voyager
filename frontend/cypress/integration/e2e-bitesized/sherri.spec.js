describe("testing the User Dashboard View -- Inprocessing", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
		cy.get("input").first().type("sherri.ortiz@spaceforce.mil");
		cy.get("input").last().type("1234567890qwertyuiop");
		cy.get("button").first().click();
	});

	it("the test User Sherri Ortiz should have 3 Inprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("input").should("have.length", 3);
	});

	it("the inprocessing tasks should all not be complete", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		for (let i = 0; i < cy.get("input").length; i++) {
			cy.get("input").eq(i).should("have.value", "false");
		}
	});
});
