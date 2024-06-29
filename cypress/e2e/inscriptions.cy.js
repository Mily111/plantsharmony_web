// describe("Inscription", () => {
//   it("should register a new user", () => {
//     cy.visit("http://localhost:3000/inscription");

//     cy.get("input[id='username']").type("newUser");
//     cy.get("input[id='email']").type("newuser@example.com");
//     cy.get("input[id='password']").type("SecurePassword123!");

//     cy.get("button[type='submit']").click();

//     cy.contains("User registered successfully");
//     cy.url().should("include", "/connexion");
//   });

//   it("should show an error for invalid email format", () => {
//     cy.visit("http://localhost:3000/inscription");

//     cy.get("input[id='username']").type("testuser");
//     cy.get("input[id='email']").type("invalid-email");
//     cy.get("input[id='password']").type("SecurePassword123!");

//     cy.get("button[type='submit']").click();

//     cy.contains("Invalid email format");
//   });

//   it("should show an error for weak password", () => {
//     cy.visit("http://localhost:3000/inscription");

//     cy.get("input[id='username']").type("testuser");
//     cy.get("input[id='email']").type("test@example.com");
//     cy.get("input[id='password']").type("123");

//     cy.get("button[type='submit']").click();

//     cy.contains(
//       "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character"
//     );
//   });
// });

describe("Inscription", () => {
  it("should register a new user", () => {
    cy.visit("/inscription");

    cy.get("input[id='username']").type("newUser");
    cy.get("input[id='email']").type("newuser@example.com");
    cy.get("input[id='password']").type("SecurePassword123!");

    cy.get("button[type='submit']").click();

    cy.contains("User registered successfully");
    cy.url().should("include", "/connexion");
  });

  it("should show an error for invalid email format", () => {
    cy.visit("/inscription");

    cy.get("input[id='username']").type("testuser");
    cy.get("input[id='email']").type("invalid-email");
    cy.get("input[id='password']").type("SecurePassword123!");

    cy.get("button[type='submit']").click();

    cy.contains("Invalid email format");
  });

  it("should show an error for weak password", () => {
    cy.visit("/inscription");

    cy.get("input[id='username']").type("testuser");
    cy.get("input[id='email']").type("test@example.com");
    cy.get("input[id='password']").type("123");

    cy.get("button[type='submit']").click();

    cy.contains("Password must be at least 8 characters long");
  });
});
