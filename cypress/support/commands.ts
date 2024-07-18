// Import Cypress types pour l'auto-complétion et le typage
/// <reference types="cypress" />
// commands.ts

// commands.ts

// Import Cypress module
// commands.ts

// Cypress.Commands.add("getCsrfToken", () => {
//   return cy
//     .request("GET", "http://localhost:5000/api/csrf-token")
//     .then((response) => {
//       const csrfToken = response.body.csrfToken;
//       cy.setCookie("csrfToken", csrfToken);
//       Cypress.env("csrfToken", csrfToken);
//       return csrfToken;
//     });
// });
Cypress.Commands.add("getCsrfToken", (): Cypress.Chainable<string> => {
  return cy
    .request("GET", "http://localhost:5000/api/csrf-token")
    .then((response) => {
      return response.body.csrfToken;
    });
});

Cypress.Commands.add(
  "registerUser",
  (userData: { username: string; email: string; password: string }) => {
    return cy.getCsrfToken().then((csrfToken) => {
      return cy
        .request({
          method: "POST",
          url: "http://localhost:5000/api/users/register",
          body: userData,
          headers: {
            "CSRF-Token": csrfToken,
          },
        })
        .then((response) => {
          return response.body;
        });
    });
  }
);
Cypress.Commands.add("deleteUser", (userId: number) => {
  return cy.getCsrfToken().then((csrfToken: string) => {
    return cy.request({
      method: "DELETE",
      url: `http://localhost:5000/api/users/delete/${userId}`,
      headers: {
        "CSRF-Token": csrfToken,
      },
      failOnStatusCode: false, // Ajoutez ceci pour gérer les erreurs 404
    });
  });
});

// Déclaration globale pour TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      getCsrfToken(): Chainable<string>;
      registerUser(userData: {
        username: string;
        email: string;
        password: string;
      }): Chainable<{ userId: number }>;
      deleteUser(userId: number): Chainable<Cypress.Response<any>>;
    }
  }
}

// Pour satisfaire TypeScript
export {};
