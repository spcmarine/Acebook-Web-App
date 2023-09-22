import SignUpForm from './SignUpForm'
const navigate = () => {}

describe("Sitting up", () => {
  it("calls the /users endpoint", () => {
    cy.mount(<SignUpForm navigate={navigate}/>)

    cy.intercept('POST', '/users', { message: "OK" }).as("signUpRequest")

    //The email address will need to be changed each time Cypress is run, otherwise the test will fail.
    cy.get("#email").type("someone@example.com"); 
    cy.get("#password").type("password");
    cy.get("#first_name").type("Joe");
    cy.get("#last_name").type("Bloggs");
    cy.get("#submit").click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })

  // it("")
})
