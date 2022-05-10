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

describe("testing the User Dashboard View -- Outprocessing", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
		cy.get("input").first().type("raquel.orn@spaceforce.mil");
		cy.get("input").last().type("1234567890qwertyuiop");
		cy.get("button").first().click();
	});

	it("should have tabs for Inprocessing and Outprocessing", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").should("exist");
		cy.get("[data-testid=buttonOutprocessingTasks]").should("exist");
	});

	it("the test User Raquel Orn should have 0 Inprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").click();
		cy.get("input").should("have.length", 0);
	});

	it("the test Raquel Orn Ortiz should have 6 Outprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonOutprocessingTasks]").click();
		cy.get("input").should("have.length", 6);
	});

	it("the outprocessing tasks should have at least 2 complete", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonOutprocessingTasks]").click();
		for (let i = 0; i < 4; i++) {
			cy.get("input").eq(i).should("have.value", "false");
		}
		for (let i = 4; i < 6; i++) {
			cy.get("input").eq(i).should("have.value", "true");
		}
	});

	it("clicking a checkbox should mark the task complete or incomplete as needed", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonOutprocessingTasks]").click();
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
});
