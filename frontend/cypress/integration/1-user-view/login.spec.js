describe("testing the Login View", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
	});

	it("displays email and password input fields", () => {
		// After loading the Login view, check if there are two inputs fields
		cy.get("input").should("have.length", 2);

		// The input fields should be empty
		cy.get("input").first().should("have.value", "");
		cy.get("input").last().should("have.value", "");

		// First input should be for an email
		cy.get("input")
			.first()
			.invoke("attr", "placeholder")
			.should("contain", "Enter Email");

		// Second input should be for a password
		cy.get("input")
			.last()
			.invoke("attr", "placeholder")
			.should("contain", "Enter Password");
	});

	it("displays a User/Password Login Button and a CAC Login Button", () => {
		cy.get("button").first().should("have.text", "Email/Password Login");
		cy.get("button")
			.eq(1)
			.should("have.text", "Common Access Card (CAC) Login");
	});

	it("does not let a User login with just an email", () => {
		cy.get("input").first().type("bridget.smitham@spaceforce.mil");
		cy.get("button").first().click();
		cy.url().should("eq", "http://localhost:3000/");
	});

	it("does not let a User login with just a password", () => {
		cy.get("input").last().type("1234567890qwertyuiop");
		cy.get("button").first().click();
		cy.url().should("eq", "http://localhost:3000/");
	});
});
