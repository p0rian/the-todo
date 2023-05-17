describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/"); // change URL to match your dev URL
  });

  it("creates new todo item", () => {
    cy.visit("/"); // change URL to match your dev URL

    cy.get("input").type("Walk my dog.");

    cy.get("button").contains("Add").click();
  });

  it("edits existing todo item", () => {
    cy.visit("/"); // change URL to match your dev URL

    cy.get("input").type("Walk my dog.");

    cy.get("button").contains("Add").click();

    cy.get("span").contains("Walk my dog.").click();

    cy.get("[aria-label='Edit todo']").clear();

    cy.get("[aria-label='Edit todo']").type("Buy groceries.");

    cy.get("button").contains("Save").click();

    // .type("Buy groceries");
  });
});
