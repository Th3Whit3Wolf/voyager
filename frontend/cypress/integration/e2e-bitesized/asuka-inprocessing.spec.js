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

	it("the test User Raquel Orn should have 8 of the Tasks Should be Complete", () => {
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

	// it("the test User Raquel Orn should have 0 Outprocessing Tasks", () => {
	// 	cy.url().should("eq", "http://localhost:3000/dashboard");
	// 	cy.get("[data-testid=buttonOutprocessingTasks]").click();
	// 	cy.get("input").should("have.length", 0);
	// });

	// it("the inprocessing tasks should all not be complete", () => {
	// 	cy.url().should("eq", "http://localhost:3000/dashboard");
	// 	cy.get("[data-testid=buttonInprocessingTasks]").click();
	// 	for (let i = 0; i < cy.get("input").length; i++) {
	// 		cy.get("input").eq(i).should("have.value", "false");
	// 	}
	// });

	// it("clicking a checkbox should mark the task complete or incomplete as needed", () => {
	// 	cy.url().should("eq", "http://localhost:3000/dashboard");
	// 	cy.get("[data-testid=buttonInprocessingTasks]").click();
	// 	cy.get("input").first().click();
	// 	cy.get("input").first().should("have.value", "true");
	// 	cy.get("input").first().click();
	// 	cy.get("input").first().should("have.value", "false");
	// });

	// it("clicking a logout button will end session and return to login", () => {
	// 	cy.url().should("eq", "http://localhost:3000/dashboard");
	// 	cy.get("[data-testid=logoutButton]").click();
	// 	cy.url().should("eq", "http://localhost:3000/");
	// });
});
