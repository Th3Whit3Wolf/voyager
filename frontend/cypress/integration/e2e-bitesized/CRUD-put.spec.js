describe("testing CRUD: PUT between Admin and USER", () => {
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
