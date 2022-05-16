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
	// let numberOfInprocessingRows = 0;
	// it("A Series of Checks: Step 1 - Get the Number of Inprocessing Tasks By Row Count", () => {
	// 	cy.url().should("eq", "http://localhost:3000/dashboard");
	// 	cy.get("table")
	// 		.find("tr")
	// 		.its("length")
	// 		.then(len => {
	// 			numberOfInprocessingRows = len;
	// 			cy.log(
	// 				"Initial Inprocessing Admin Table Length: " + numberOfInprocessingRows
	// 			);
	// 		});
	// });

	// it("A Series of Checks: Step 2 - Click on the Add New Row Button", () => {
	// 	cy.url().should("eq", "http://localhost:3000/dashboard");
	// 	cy.get("[data-testid=addTaskButton]").click();
	// });

	// let numberOfInprocessingRowsNew = 0;
	// it("A Series of Checks: Step 3 - Get the Number of Inprocessing Tasks By Row Count Again", () => {
	// 	cy.url().should("eq", "http://localhost:3000/dashboard");
	// 	cy.get("table")
	// 		.find("tr")
	// 		.its("length")
	// 		.then(len => {
	// 			numberOfInprocessingRowsNew = len;
	// 			cy.log(
	// 				"New Inprocessing Admin Table Length: " + numberOfInprocessingRowsNew
	// 			);
	// 		});
	// });

	// it("A Series of Checks: Step 4 - There Should Be One More Row than There had Been", () => {
	// 	expect(numberOfInprocessingRowsNew - numberOfInprocessingRows).to.equal(1);
	// });

	// it("A Series of Checks: Step 5 - Find Last Row, Get Delete Button, Click It", () => {
	// 	cy.url().should("eq", "http://localhost:3000/dashboard");
	// 	cy.get("table").find("tr").last().find("button").eq(1).click();
	// });

	// it("A Series of Checks: Step 6 - Get the Number of Inprocessing Tasks By Row Count Again", () => {
	// 	cy.url().should("eq", "http://localhost:3000/dashboard");
	// 	cy.get("table")
	// 		.find("tr")
	// 		.its("length")
	// 		.then(len => {
	// 			numberOfInprocessingRowsNew = len;
	// 			cy.log(
	// 				"New Inprocessing Admin Table Length: " + numberOfInprocessingRowsNew
	// 			);
	// 		});
	// });

	// it("A Series of Checks: Step 7 - There To Be the Initial Number of Rows Again", () => {
	// 	expect(numberOfInprocessingRowsNew - numberOfInprocessingRows).to.equal(0);
	// });

	// /// OUTPROCESSING
	// let numberOfOutprocessingRows = 0;
	// it("A Series of Checks: Step 1 - Get the Number of Outprocessing Tasks By Row Count", () => {
	// 	cy.url().should("eq", "http://localhost:3000/dashboard");
	// 	cy.get("[data-testid=buttonOutprocessingTasks]").click();
	// 	cy.get("table")
	// 		.find("tr")
	// 		.its("length")
	// 		.then(len => {
	// 			numberOfOutprocessingRows = len;
	// 			cy.log(
	// 				"Initial Outprocessing Admin Table Length: " +
	// 					numberOfOutprocessingRows
	// 			);
	// 		});
	// });

	// it("A Series of Checks: Step 2 - Click on the Add New Row Button", () => {
	// 	cy.url().should("eq", "http://localhost:3000/dashboard");
	// 	cy.get("[data-testid=buttonOutprocessingTasks]").click();
	// 	cy.get("[data-testid=addTaskButton]").click();
	// });

	// let numberOfOutprocessingRowsNew = 0;
	// it("A Series of Checks: Step 3 - Get the Number of Outprocessing Tasks By Row Count Again", () => {
	// 	cy.url().should("eq", "http://localhost:3000/dashboard");
	// 	cy.get("[data-testid=buttonOutprocessingTasks]").click();
	// 	cy.get("table")
	// 		.find("tr")
	// 		.its("length")
	// 		.then(len => {
	// 			numberOfOutprocessingRowsNew = len;
	// 			cy.log(
	// 				"New Outprocessing Admin Table Length: " +
	// 					numberOfOutprocessingRowsNew
	// 			);
	// 		});
	// });

	// it("A Series of Checks: Step 4 - There Should Be One More Row than There had Been", () => {
	// 	expect(numberOfOutprocessingRowsNew - numberOfOutprocessingRows).to.equal(
	// 		1
	// 	);
	// });

	// it("A Series of Checks: Step 5 - Find Last Row, Get Delete Button, Click It", () => {
	// 	cy.url().should("eq", "http://localhost:3000/dashboard");
	// 	cy.get("[data-testid=buttonOutprocessingTasks]").click();
	// 	cy.get("table").find("tr").last().find("button").eq(1).click();
	// });

	// it("A Series of Checks: Step 6 - Get the Number of Outprocessing Tasks By Row Count Again", () => {
	// 	cy.url().should("eq", "http://localhost:3000/dashboard");
	// 	cy.get("[data-testid=buttonOutprocessingTasks]").click();
	// 	cy.get("table")
	// 		.find("tr")
	// 		.its("length")
	// 		.then(len => {
	// 			numberOfOutprocessingRowsNew = len;
	// 			cy.log(
	// 				"New Outprocessing Admin Table Length: " +
	// 					numberOfOutprocessingRowsNew
	// 			);
	// 		});
	// });

	// it("A Series of Checks: Step 7 - Expect There To Be the Initial Number of Rows Again", () => {
	// 	expect(numberOfOutprocessingRowsNew - numberOfOutprocessingRows).to.equal(
	// 		0
	// 	);
	// });
});
