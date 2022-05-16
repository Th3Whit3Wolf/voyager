describe("testing the Admin Dashboard View -- Inprocessing and Outprocessing", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
		cy.get("input").first().clear();
		cy.get("input").last().clear();
		cy.get("input").first().type("lelouch.lamperouge@spaceforce.mil");
		cy.get("input")
			.last()
			.type(
				"When there is evil in this world that justice cannot defeat, would you taint your hands with evil to defeat evil? Or would you remain steadfast and righteous even if it means surrendering to evil?",
				{ delay: 0 }
			);
		cy.get("button").first().click();
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
			})
			.then(() => expect(numberOfInprocessingRows).to.equal(15)); // Includes the Header Row
	});

	it("A Series of Checks: Step 2 - Click on the Add New Row Button", () => {
		cy.url().should("eq", "http://localhost:3000/dashboard");
		cy.get("[data-testid=addTaskButton]").click();
	});

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
