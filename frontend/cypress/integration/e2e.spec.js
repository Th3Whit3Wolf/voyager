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

describe("testing the Admin Dashboard View -- Inprocessing and Outprocessing", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
		cy.get("input").first().type("lelouch.lamperouge@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"When there is evil in this world that justice cannot defeat, would you taint your hands with evil to defeat evil? Or would you remain steadfast and righteous even if it means surrendering to evil?",
				{ delay: 0 }
			);
		cy.get("button").first().click();
	});

	let numberInprocessingTasksForUser = 0;
	it("A Series of Checks: Step 1 - Login as User and Get the Number of Inprocessing Tasks by Row Count", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=logoutButton]").click();
		cy.url().should("eq", "http://localhost:3000/");
		cy.get("input").first().type("asuka.sohryu@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"It is simply the duty of the elite to protect the ignorant masses."
			);
		cy.get("button").first().click();
		cy.get("table")
			.find("tr")
			.its("length")
			.then(len => {
				numberInprocessingTasksForUser = len;
				cy.log(
					"Initial Inprocessing User Table Length: " +
						numberInprocessingTasksForUser
				);
			})
			.then(() => expect(numberInprocessingTasksForUser).to.equal(18)); // Includes the Header Row
	});

	let numberOfInprocessingRows = 0;
	it("A Series of Checks: Step 2 - Get the Number of Inprocessing Tasks By Row Count", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("table")
			.find("tr")
			.its("length")
			.then(len => {
				numberOfInprocessingRows = len;
				cy.log(
					"Initial Inprocessing Admin Table Length: " + numberOfInprocessingRows
				);
			})
			.then(() => expect(numberOfInprocessingRows).to.equal(15)); // Includes the Header Row
	});

	it("A Series of Checks: Step 3 - Click on the Add New Row Button", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=addTaskButton]", { delay: 10000 }).click({
			force: true
		});
	});

	let numberOfInprocessingRowsNew = 0;
	it("A Series of Checks: Step 4 - Get the Number of Inprocessing Tasks By Row Count Again", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("table")
			.find("tr")
			.its("length")
			.then(len => {
				numberOfInprocessingRowsNew = len;
				cy.log(
					"New Inprocessing Admin Table Length: " + numberOfInprocessingRowsNew
				);
			})
			.then(() => expect(numberOfInprocessingRowsNew).to.equal(16)); // Includes the Header Row
	});

	it("A Series of Checks: Step 5 - There Should Be One More Row than There had Been", () => {
		expect(numberOfInprocessingRowsNew - numberOfInprocessingRows).to.equal(1);
	});

	let numberInprocessingTasksForUserNew = 0;

	it("A Series of Checks: Step 6 - Login as User again and make sure the new task is there", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=logoutButton]").click();
		cy.url().should("eq", "http://localhost:3000/");
		cy.get("input").first().type("asuka.sohryu@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"It is simply the duty of the elite to protect the ignorant masses."
			);
		cy.get("button").first().click();
		cy.get("table")
			.find("tr")
			.its("length")
			.then(len => {
				numberInprocessingTasksForUserNew = len;
				cy.log(
					"Initial Inprocessing User Table Length: " +
						numberInprocessingTasksForUserNew
				);
			})
			.then(() =>
				expect(numberInprocessingTasksForUserNew).to.equal(
					numberInprocessingTasksForUser + 1
				)
			); // Includes the Header Row
	});

	it("If all GREEN above, then POST works. Moving to test Delete", () => {
		expect(true).to.equal(true);
	});

	it("A Series of Checks: Step 7 - Find Last Row, Get Delete Button, Click It", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=DeleteIcon]").last().click({ force: true });
	});

	it("A Series of Checks: Step 8 - Get the Number of Inprocessing Tasks By Row Count Again", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("table")
			.find("tr")
			.its("length")
			.then(len => {
				numberOfInprocessingRowsNew = len;
				cy.log(
					"New Inprocessing Admin Table Length: " + numberOfInprocessingRowsNew
				);
			});
	});

	it("A Series of Checks: Step 9 - There To Be the Initial Number of Rows Again", () => {
		expect(numberOfInprocessingRowsNew - numberOfInprocessingRows).to.equal(0);
	});

	it("A Series of Checks: Step 10 - Login as User again and make sure the new task is GONE", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=logoutButton]").click();
		cy.url().should("eq", "http://localhost:3000/");
		cy.get("input").first().type("asuka.sohryu@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"It is simply the duty of the elite to protect the ignorant masses."
			);
		cy.get("button").first().click();
		cy.get("table")
			.find("tr")
			.its("length")
			.then(len => {
				numberInprocessingTasksForUserNew = len;
				cy.log(
					"Initial Inprocessing User Table Length: " +
						numberInprocessingTasksForUserNew
				);
			})
			.then(() =>
				expect(numberInprocessingTasksForUserNew).to.equal(
					numberInprocessingTasksForUser
				)
			); // Includes the Header Row
	});

	it("If all GREEN above, then DELETE works.", () => {
		expect(true).to.equal(true);
	});
});

describe("testing the Admin Dashboard View -- Inprocessing and Outprocessing", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
		cy.get("input").first().type("lelouch.lamperouge@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"When there is evil in this world that justice cannot defeat, would you taint your hands with evil to defeat evil? Or would you remain steadfast and righteous even if it means surrendering to evil?",
				{ delay: 0 }
			);
		cy.get("button").first().click();
	});

	let numberInprocessingTasksForUser = 0;
	it("A Series of Checks: Step 1 - Login as User and Get the Number of Inprocessing Tasks by Row Count", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=logoutButton]").click();
		cy.url().should("eq", "http://localhost:3000/");
		cy.get("input").first().type("asuka.sohryu@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"It is simply the duty of the elite to protect the ignorant masses."
			);
		cy.get("button").first().click();
		cy.get("table")
			.find("tr")
			.its("length")
			.then(len => {
				numberInprocessingTasksForUser = len;
				cy.log(
					"Initial Inprocessing User Table Length: " +
						numberInprocessingTasksForUser
				);
			})
			.then(() => expect(numberInprocessingTasksForUser).to.equal(18)); // Includes the Header Row
	});

	it("A Series of Checks: Step 2 - Login and make the first task from Active to In Active", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get(".MuiSwitch-input").first().should("be.checked");
		cy.get(".MuiSwitch-input").first().uncheck({ force: true });
		cy.get(".MuiSwitch-input").first().should("not.be.checked");
	});

	it("A Series of Checks: Step 3 - Login as User and the number of visible taks should be one less", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=logoutButton]").click();
		cy.url().should("eq", "http://localhost:3000/");
		cy.get("input").first().type("asuka.sohryu@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"It is simply the duty of the elite to protect the ignorant masses."
			);
		cy.get("button").first().click();
		cy.get("table")
			.find("tr")
			.its("length")
			.then(len => {
				numberInprocessingTasksForUser = len;
				cy.log(
					"Initial Inprocessing User Table Length: " +
						numberInprocessingTasksForUser
				);
			})
			.then(() => expect(numberInprocessingTasksForUser).to.equal(17)); // Includes the Header Row
	});
});

describe("testing the Admin Dashboard View -- Inprocessing and Outprocessing", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
		cy.get("input").first().type("lelouch.lamperouge@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"When there is evil in this world that justice cannot defeat, would you taint your hands with evil to defeat evil? Or would you remain steadfast and righteous even if it means surrendering to evil?",
				{ delay: 0 }
			);
		cy.get("button").first().click();
	});

	let numberInprocessingTasksForUser = 0;
	it("A Series of Checks: Step 1 - Login as User and Get the Number of Inprocessing Tasks by Row Count", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=logoutButton]").click();
		cy.url().should("eq", "http://localhost:3000/");
		cy.get("input").first().type("asuka.sohryu@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"It is simply the duty of the elite to protect the ignorant masses."
			);
		cy.get("button").first().click();
		cy.get("table")
			.find("tr")
			.its("length")
			.then(len => {
				numberInprocessingTasksForUser = len;
				cy.log(
					"Initial Inprocessing User Table Length: " +
						numberInprocessingTasksForUser
				);
			})
			.then(() => expect(numberInprocessingTasksForUser).to.equal(18)); // Includes the Header Row
	});

	it("A Series of Checks: Step 2 - Login and make the first task from Active to Not Active", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get(".MuiSwitch-input").first().should("be.checked");
		cy.get(".MuiSwitch-input").first().uncheck({ force: true });
	});

	it("A Series of Checks: Step 3 - Login as User and the number of visible taks should be one less", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=logoutButton]").click();
		cy.url().should("eq", "http://localhost:3000/");
		cy.get("input").first().type("asuka.sohryu@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"It is simply the duty of the elite to protect the ignorant masses."
			);
		cy.get("button").first().click();
		cy.get("table")
			.find("tr")
			.its("length")
			.then(len => {
				numberInprocessingTasksForUser = len;
				cy.log(
					"Initial Inprocessing User Table Length: " +
						numberInprocessingTasksForUser
				);
			})
			.then(() => expect(numberInprocessingTasksForUser).to.equal(17)); // Includes the Header Row
	});

	it("A Series of Checks: Step 4 - Login and make the first task from Not Active to Active again", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get(".MuiSwitch-input").first().should("not.be.checked");
		cy.get(".MuiSwitch-input").first().check({ force: true });
	});

	it("If all GREEN above, then PUT works.", () => {
		expect(true).to.equal(true);
	});
});
