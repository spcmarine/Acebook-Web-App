const mongoose = require("mongoose");
const User = require("../../../api/models/user");


describe("Signing up", () => {
  
  it("with valid credentials, redirects to '/login'", () => {
    User.deleteOne({email: "Joe@example.com"});
    cy.visit("/signup");
    cy.get("#email").type("Joe@example.com");
    cy.get("#password").type("password");
    cy.get("#first_name").type("Joe");
    cy.get("#last_name").type("Bloggs");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });

  it("with missing password, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });

  it("with missing email, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });
});