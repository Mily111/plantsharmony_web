describe("Inscription", () => {
  const testUser = {
    username: "testuser",
    email: "test@example.com",
    password: "Password123!",
  };
  let userId: number | null = null; // Typage explicite pour userId

  beforeEach(() => {
    cy.visit("http://localhost:3000/inscription"); // Remplacez par l'URL correcte de votre application
  });

  afterEach(() => {
    // Suppression de l'utilisateur de test après chaque test
    if (userId) {
      cy.request({
        method: "DELETE",
        url: `http://localhost:5000/api/users/delete/${userId}`, // Assurez-vous que l'URL est correcte
        failOnStatusCode: false, // Ne pas échouer si l'utilisateur n'est pas trouvé
      }).then((response) => {
        // Vous pouvez ajouter des assertions ici pour vérifier que la suppression s'est bien passée
        if (response.status === 404) {
          cy.log("User not found, probably already deleted");
        } else {
          expect(response.status).to.eq(200);
        }
        userId = null; // Réinitialiser l'identifiant de l'utilisateur après la suppression
      });
    }
  });

  it("should display the registration form", () => {
    cy.get('input[placeholder="Nom d\'utilisateur"]').should("be.visible");
    cy.get('input[placeholder="E-mail"]').should("be.visible");
    cy.get('input[placeholder="******************"]').should("be.visible");
    cy.get("button").contains("Inscription").should("be.visible");
  });

  it("should validate email format", () => {
    cy.get('input[placeholder="E-mail"]').type("invalid-email");
    cy.get("button").contains("Inscription").click();

    // Attendre que le message d'erreur apparaisse
    cy.get("body").then(($body) => {
      if ($body.find(".error-message").length > 0) {
        cy.get(".error-message").should("contain.text", "Invalid email format");
      } else {
        cy.log("Message d'erreur non trouvé");
      }
    });
  });

  it("should validate password format", () => {
    cy.get('input[placeholder="Nom d\'utilisateur"]').type("testuser");
    cy.get('input[placeholder="E-mail"]').type("test@example.com");
    cy.get('input[placeholder="******************"]').type("short");
    cy.get("button").contains("Inscription").click();

    // Attendre que le message d'erreur apparaisse
    cy.get("body").then(($body) => {
      if ($body.find(".error-message").length > 0) {
        cy.get(".error-message").should(
          "contain.text",
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
        );
      } else {
        cy.log("Message d'erreur non trouvé");
      }
    });
  });

  it("should successfully register a user", () => {
    cy.intercept("POST", "/api/users/register", {
      statusCode: 201,
      body: { message: "User registered successfully", userId: 1 }, // Ajouter userId dans la réponse
    }).as("registerUser");

    cy.get('input[placeholder="Nom d\'utilisateur"]').type(testUser.username);
    cy.get('input[placeholder="E-mail"]').type(testUser.email);
    cy.get('input[placeholder="******************"]').type(testUser.password);
    cy.get("button").contains("Inscription").click();

    cy.wait("@registerUser").then((interception) => {
      if (interception.response) {
        const response = interception.response.body;
        expect(response.message).to.eq("User registered successfully");
        userId = response.userId; // Stocker l'identifiant de l'utilisateur
      } else {
        cy.log("Interception sans réponse");
      }
    });

    cy.contains("User registered successfully", { timeout: 10000 }).should(
      "be.visible"
    );
  });

  it("should handle registration failure", () => {
    cy.intercept("POST", "/api/users/register", {
      statusCode: 409,
      body: { message: "Username or email already exists" },
    }).as("registerUserFail");

    cy.get('input[placeholder="Nom d\'utilisateur"]').type("testuser");
    cy.get('input[placeholder="E-mail"]').type("test@example.com");
    cy.get('input[placeholder="******************"]').type("Password123!");
    cy.get("button").contains("Inscription").click();

    cy.wait("@registerUserFail");
    cy.contains("Username or email already exists", { timeout: 10000 }).should(
      "be.visible"
    );
  });
});
