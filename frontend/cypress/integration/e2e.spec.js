describe("testing the Login View", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
		cy.get("input").first().clear();
		cy.get("input").last().clear();
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
		cy.get("button").eq(1).should("have.text", "CAC/ECA Login");
	});

	it("does not let a User login with an empty email and password", () => {
		cy.get("button").first().click();
		cy.url().should("eq", "http://localhost:3000/");
	});

	it("does not let a User login with just an email", () => {
		cy.get("input").first().type("asuka.sohryu@spaceforce.mil");
		cy.get("button").first().click();
		cy.url().should("eq", "http://localhost:3000/");
	});

	it("does not let a User login with just a password", () => {
		cy.get("input").last().type("1234567890qwertyuiop");
		cy.get("button").first().click();
		cy.url().should("eq", "http://localhost:3000/");
	});

	it("does not let a User login if they enter incorrect info", () => {
		cy.get("input").first().type("asuka.sohryu@spaceforce.mil");
		cy.get("input").last().type("1234567890qwertyuiop");
		cy.get("button").first().click();
		cy.url().should("eq", "http://localhost:3000/");
	});

	it("entering correct email and password logs a User to a Dashboard", () => {
		cy.get("input").first().clear();
		cy.get("input").last().clear();
		cy.get("input").first().type("asuka.sohryu@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"It is simply the duty of the elite to protect the ignorant masses."
			);
		cy.get("button").first().click();
	});
});

describe("testing the User Dashboard View -- Inprocessing", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
		cy.get("input").first().clear();
		cy.get("input").last().clear();
		cy.get("input").first().type("asuka.sohryu@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"It is simply the duty of the elite to protect the ignorant masses."
			);
		cy.get("button").first().click();
	});

	it("should have tabs for Inprocessing and Outprocessing", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").should("exist");
		cy.get("[data-testid=buttonOutprocessingTasks]").should("exist");
	});

	it("the test User Asuka Sohryu should have 17 Inprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").click();
		cy.get("input").should("have.length", 17);
	});

	it("the test User Asuka Sohryu should have 8 Complete and 9 Incomplete", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").click();
		expect(cy.get("input").eq(0).should("be.checked"));
		expect(cy.get("input").eq(1).should("be.checked"));
		expect(cy.get("input").eq(2).should("not.be.checked"));
		expect(cy.get("input").eq(3).should("not.be.checked"));
		expect(cy.get("input").eq(4).should("not.be.checked"));
		expect(cy.get("input").eq(5).should("not.be.checked"));
		expect(cy.get("input").eq(6).should("not.be.checked"));
		expect(cy.get("input").eq(7).should("be.checked"));
		expect(cy.get("input").eq(8).should("not.be.checked"));
		expect(cy.get("input").eq(9).should("be.checked"));
		expect(cy.get("input").eq(10).should("not.be.checked"));
		expect(cy.get("input").eq(11).should("be.checked"));
		expect(cy.get("input").eq(12).should("be.checked"));
		expect(cy.get("input").eq(13).should("be.checked"));
		expect(cy.get("input").eq(14).should("be.checked"));
		expect(cy.get("input").eq(15).should("not.be.checked"));
		expect(cy.get("input").eq(16).should("not.be.checked"));
	});

	it("the test User Asuka Sohryu should have 0 Outprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonOutprocessingTasks]").click();
		cy.get("input").should("have.length", 0);
	});

	it("clicking a checkbox should mark the task complete or incomplete as needed", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").click();
		cy.get("input").last().check();
		cy.get("input").last().should("have.value", "true");
		cy.log("Clicked last checkbox");
		cy.get("input").last().uncheck();
		cy.get("input").last().should("have.value", "false");
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
		cy.get("input").first().clear();
		cy.get("input").last().clear();
		cy.get("input").first().type("shinji.ikari@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"I still don’t know where to find happiness. But I’ll continue to think about whether it’s good to be here…whether it was good to have been born. But in the end, it’s just realizing the obvious over and over again. Because I am myself."
			);
		cy.get("button").first().click();
	});

	it("should have tabs for Inprocessing and Outprocessing", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").should("exist");
		cy.get("[data-testid=buttonOutprocessingTasks]").should("exist");
	});

	it("the test User Shinji Ikari should have 0 Inprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").click();
		cy.get("input").should("have.length", 0);
	});

	it("the test User Shinji Ikari should have 12 Outprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonOutprocessingTasks]").click();
		cy.get("input").should("have.length", 12);
	});

	it("the test User Shinji Ikari should have 6 Complete and 6 Incomplete", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonOutprocessingTasks]").click();
		expect(cy.get("input").eq(0).should("not.be.checked"));
		expect(cy.get("input").eq(1).should("be.checked"));
		expect(cy.get("input").eq(2).should("not.be.checked"));
		expect(cy.get("input").eq(3).should("be.checked"));
		expect(cy.get("input").eq(4).should("be.checked"));
		expect(cy.get("input").eq(5).should("not.be.checked"));
		expect(cy.get("input").eq(6).should("not.be.checked"));
		expect(cy.get("input").eq(7).should("be.checked"));
		expect(cy.get("input").eq(8).should("not.be.checked"));
		expect(cy.get("input").eq(9).should("be.checked"));
		expect(cy.get("input").eq(10).should("be.checked"));
		expect(cy.get("input").eq(11).should("not.be.checked"));
	});

	it("clicking a checkbox should mark the task complete or incomplete as needed", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonOutprocessingTasks]").click();
		cy.get("input").last().check();
		cy.get("input").last().should("have.value", "true");
		cy.log("Clicked last checkbox");
		cy.get("input").last().uncheck();
		cy.get("input").last().should("have.value", "false");
	});

	it("clicking a logout button will end session and return to login", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=logoutButton]").click();
		cy.url().should("eq", "http://localhost:3000/");
	});
});

describe("testing the Admin Dashboard View -- Inprocessing and Outprocessing", () => {
	const NUM_OF_COLUMNS = 5; // Active Task, Task Name, Task Desc, POC Name, POC Phone

	beforeEach(() => {
		cy.visit("http://localhost:3000/");
		cy.get("input").first().clear();
		cy.get("input").last().clear();
		cy.get("input").first().type("johnny.bravo@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"Get out of my chair and make me some coffee with eight sugars, then throw it out and make it again cause it's still not sweet enough!"
			);
		cy.get("button").first().click();
	});

	it("should have tabs for Inprocessing and Outprocessing", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").should("exist");
		cy.get("[data-testid=buttonOutprocessingTasks]").should("exist");
		cy.get("[data-testid=buttonUserSettings]").should("exist");
		cy.get("[data-testid=buttonAnalytics]").should("exist");
	});

	it("the test Admin Johnny Bravo should have 3 Inprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonInprocessingTasks]").click();
		cy.get("input").should("have.length", 3 * NUM_OF_COLUMNS);
	});

	it("the test Admin Johnny Bravo should have 6 Outprocessing Tasks", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonOutprocessingTasks]").click();
		cy.get("input").should("have.length", 6 * NUM_OF_COLUMNS);
	});

	it("the test Admin Johnny Bravo should have a User settings with some basic info", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonUserSettings]").click();
		cy.get("[data-testid=typographyDSN]").should(
			"have.text",
			"DSN: (312) 867-5309"
		);
		cy.get("[data-testid=typographyEmail]").should(
			"have.text",
			"Email: johnny.bravo@spaceforce.mil"
		);
	});

	it("the test Admin Johnny Bravo should have Analytics with at least 3 Task Completion Status Cards", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonAnalytics]").click();
		cy.get("[data-testid=cardHeaderLeavingTitle]").should(
			"have.text",
			"Leaving - Task Completion Status"
		);
		cy.get("[data-testid=cardHeaderAssignedTitle]").should(
			"have.text",
			"Assigned - Task Completion Status"
		);
		cy.get("[data-testid=cardHeaderGainingTitle]").should(
			"have.text",
			"Gaining - Task Completion Status"
		);
	});

	it("the test Admin Johnny Bravo should have Analytics with rechart SVG Graphics of width 1000 and height 450", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=buttonAnalytics]").click();
		cy.get(".recharts-surface", { timeout: 10000 })
			.should("have.attr", "width", "1000")
			.and("have.attr", "height", "450");
	});
});
