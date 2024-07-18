describe("Suppression des utilisateurs", () => {
  let userId: number | null = null;

  before(() => {
    // Créez un utilisateur à supprimer
    cy.request("POST", "http://localhost:5000/api/users/register", {
      username: `deleteuser_${Date.now()}`,
      email: `deleteuser_${Date.now()}@example.com`,
      password: "Password123!",
    }).then((response) => {
      userId = response.body.userId;
    });
  });

  it("should delete the user", () => {
    if (userId) {
      cy.request({
        method: "DELETE",
        url: `http://localhost:5000/api/users/delete/${userId}`,
        headers: {
          "CSRF-Token": Cypress.env("csrfToken"), // Assurez-vous que CSRF Token est défini
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    }
  });
});
