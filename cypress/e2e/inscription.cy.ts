describe("Inscription", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/inscription"); // Remplacez par l'URL correcte de votre application
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
    // Simuler une réponse de succès de l'API
    cy.intercept("POST", "/api/users/register", {
      statusCode: 201,
      body: { message: "User registered successfully" },
    }).as("registerUser");

    cy.get('input[placeholder="Nom d\'utilisateur"]').type("testuser");
    cy.get('input[placeholder="E-mail"]').type("test@example.com");
    cy.get('input[placeholder="******************"]').type("Password123!");
    cy.get("button").contains("Inscription").click();

    // Attendre que l'appel API soit terminé
    cy.wait("@registerUser");

    cy.contains("User registered successfully", { timeout: 10000 }).should(
      "be.visible"
    );
  });

  it("should handle registration failure", () => {
    // Simuler une défaillance de l'inscription en utilisant un email déjà utilisé par exemple
    cy.intercept("POST", "/api/users/register", {
      statusCode: 409,
      body: { message: "Username or email already exists" },
    }).as("registerUserFail");

    cy.get('input[placeholder="Nom d\'utilisateur"]').type("testuser");
    cy.get('input[placeholder="E-mail"]').type("test@example.com");
    cy.get('input[placeholder="******************"]').type("Password123!");
    cy.get("button").contains("Inscription").click();

    // Attendre que l'appel API échoue
    cy.wait("@registerUserFail");

    cy.contains("Username or email already exists", { timeout: 10000 }).should(
      "be.visible"
    );
  });
});
