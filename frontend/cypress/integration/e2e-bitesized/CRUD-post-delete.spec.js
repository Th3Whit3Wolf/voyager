describe("testing CRUD: POST and DELETE between Admin and USER", () => {
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
