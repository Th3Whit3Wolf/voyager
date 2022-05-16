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
