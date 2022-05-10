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

	it("does not let a User login with an empty email and password", () => {
		cy.get("button").first().click();
		cy.url().should("eq", "http://localhost:3000/");
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

	it("does not let a User login if they enter incorrect info", () => {
		cy.get("input").first().type("bridget.smitham@spaceforce.mil");
		cy.get("input").last().type("1234567890qwertyuiop");
		cy.get("button").first().click();
		cy.url().should("eq", "http://localhost:3000/");
	});

	it("entering correct email and password logs a User to a Dashboard", () => {
		cy.get("input").first().type("sherri.ortiz@spaceforce.mil");
		cy.get("input").last().type("1234567890qwertyuiop");
		cy.get("button").first().click();
		cy.url().should("eq", "http://localhost:3000/dashboard");
	});
});

describe("testing the User Dashboard View -- Inprocessing", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
		cy.get("input").first().type("sherri.ortiz@spaceforce.mil");
		cy.get("input").last().type("1234567890qwertyuiop");
		cy.get("button").first().click();
	});

	it("should have tabs for Inprocessing and Outprocessing", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("button").contains("Inprocessing Tasks").should("exist");
		cy.get("button").contains("Outprocessing Tasks").should("exist");
	});

	it("the test User Sherri Ortiz should have 3 Inprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("button").contains("Inprocessing Tasks").click();
		cy.get("input").should("have.length", 3);
	});

	it("the test User Sherri Ortiz should have 0 Outprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("button").contains("Outprocessing Tasks").click();
		cy.get("input").should("have.length", 0);
	});

	it("the inprocessing tasks should all not be complete", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		for (let i = 0; i < cy.get("input").length; i++) {
			cy.get("input").eq(i).should("have.value", "false");
		}
	});

	it("clicking a checkbox should mark the task complete or incomplete as needed", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
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
