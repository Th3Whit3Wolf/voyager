describe("testing the Login View", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
	});

	it("displays two todo items by default", () => {
		// After loading the Login view, check if there are two inputs fields
		cy.get("input").should("have.length", 2);
	});
});
