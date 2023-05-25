describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/"); // change URL to match your dev URL
  });

  it("creates new todo item", () => {
    cy.visit("/"); // change URL to match your dev URL

    cy.get("input").type("Walk my dog.");

    cy.get("button").contains("Add").click();

    cy.get("span").contains("Walk my dog.").should("exist");
  });

  it("edits existing todo item", () => {
    cy.visit("/"); // change URL to match your dev URL

    cy.get("input").type("Walk my dog.");

    cy.get("button").contains("Add").click();

    cy.get("span").contains("Walk my dog.").click();

    cy.get("[aria-label='Edit todo']").clear();

    cy.get("[aria-label='Edit todo']").type("Buy groceries.");

    cy.get("button").contains("Save").click();

    cy.get("span").contains("Walk my dog.").should("not.exist");
    cy.get("span").contains("Buy groceries.").should("exist");
  });

  it("deletes existing todo item", () => {
    cy.visit("/"); // change URL to match your dev URL

    cy.get("input").type("Walk my dog.");

    cy.get("button").contains("Add").click();

    cy.get("button").contains("X").click();

    cy.get("span").contains("Walk my dog.").should("not.exist");
  });

  it("switches category from all to active", () => {
    cy.visit("/"); // change URL to match your dev URL

    cy.get("input").type("Walk my dog.");

    cy.get("button").contains("Add").click();

    cy.get("[aria-pressed='true']").contains("All").should("exist");

    cy.get("button").contains("Active").click();

    cy.get("span").contains("Walk my dog.").should("exist");

    cy.get("[aria-pressed='true']").contains("Active").should("exist");
  });
});
