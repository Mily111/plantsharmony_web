describe("Inscription", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:5000/api/reset-database");
  });

  it("should register a new user", () => {
    const uniqueUser = `user_${Date.now()}`; // Utiliser un nom d'utilisateur unique
    cy.visit("http://localhost:3000/inscription");

    cy.get("input[id='username']").type(uniqueUser);
    cy.get("input[id='email']").type(`${uniqueUser}@example.com`);
    cy.get("input[id='password']").type("SecurePassword123!");

    cy.get("button[type='submit']").click();

    // Vérifier le message de succès
    cy.contains("User registered successfully", { timeout: 10000 }).should(
      "be.visible"
    );

    // Attendre que la page redirige vers /connexion et vérifier l'URL
    cy.url({ timeout: 10000 }).should("include", "/connexion");
  });

  it("should show an error for invalid email format", () => {
    cy.visit("http://localhost:3000/inscription");

    cy.get("input[id='username']").type("testuser");
    cy.get("input[id='email']").type("invalid-email");
    cy.get("input[id='password']").type("SecurePassword123!");

    cy.get("button[type='submit']").click();

    // Attendre un court instant pour que le message d'erreur s'affiche
    cy.wait(1000);

    cy.contains("Invalid email format", { timeout: 10000 }).should(
      "be.visible"
    );
  });

  it("should show an error for weak password", () => {
    cy.visit("http://localhost:3000/inscription");

    cy.get("input[id='username']").type("testuser");
    cy.get("input[id='email']").type("test@example.com");
    cy.get("input[id='password']").type("123");

    cy.get("button[type='submit']").click();

    // Attendre un court instant pour que le message d'erreur s'affiche
    cy.wait(1000);

    cy.contains(
      "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
      { timeout: 10000 }
    ).should("be.visible");
  });

  it("should show an error when username or email already exists", () => {
    const uniqueUser = `user_${Date.now()}`; // Utiliser un nom d'utilisateur unique
    cy.visit("http://localhost:3000/inscription");

    cy.get("input[id='username']").type(uniqueUser);
    cy.get("input[id='email']").type(`${uniqueUser}@example.com`);
    cy.get("input[id='password']").type("SecurePassword123!");

    cy.get("button[type='submit']").click();

    // Vérifier le message de succès
    cy.contains("User registered successfully", { timeout: 10000 }).should(
      "be.visible"
    );

    cy.visit("http://localhost:3000/inscription");

    cy.get("input[id='username']").type(uniqueUser);
    cy.get("input[id='email']").type(`${uniqueUser}@example.com`);
    cy.get("input[id='password']").type("SecurePassword123!");

    cy.get("button[type='submit']").click();

    cy.contains("Username or email already exists", { timeout: 10000 }).should(
      "be.visible"
    );
  });
});
