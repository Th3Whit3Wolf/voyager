describe("testing the Login View", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
	});

	it("displays two Input Fields by default", () => {
		// After loading the Login view, check if there are two inputs fields
		cy.get("input").should("have.length", 2);

		// The input fields should be empty
		cy.get("input").first().should("have.value", "");
		cy.get("input").last().should("have.value", "");

		cy.get("input")
			.first()
			.invoke("attr", "placeholder")
			.should("contain", "Enter Email");
	});
});
