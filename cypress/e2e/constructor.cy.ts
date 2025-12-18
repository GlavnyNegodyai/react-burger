/// <reference types="cypress" />
describe("Constructor page works correctly", function () {
  beforeEach(function () {
    cy.intercept("GET", "**/ingredients").as("getIngredients");
    cy.visit("http://localhost:3000");
    cy.wait("@getIngredients");
  });

  it("Конструктор открывается по дефолту при заходе на главную страницу", () => {
    cy.contains("Соберите бургер");
    cy.get('[data-testid="ingredient"]').should("exist");
    cy.get('[data-testid="constructor"]').should("exist");
    cy.get('[data-testid="send-order"]').should("exist");
  });

  it("Неавторизованный пользователь перенаправляется на страницу /login, если пытается отправить заказ", () => {
    cy.get('[data-testid="ingredient"]').drag('[data-testid="constructor"]');
    cy.get('[data-testid="constructor"]')
      .find('[data-testid="constructor-ingredient"]')
      .should("exist");

    cy.get('[data-testid="send-order"]').click();

    cy.url().should("include", "/login");

    cy.get('input[type="email"]').should("exist");
    cy.get('input[type="password"]').should("exist");
  });

  it("Авторизованный пользователь собирает заказ, получает номер заказа в модалке, модалка закрывается", () => {
    const orderNumber = "00001";

    cy.setCookie("refreshToken", "Моковый токен");

    cy.intercept("POST", "**/orders", {
      statusCode: 200,
      body: {
        success: true,
        name: "Cool Burger",
        order: { number: orderNumber },
      },
    }).as("sendOrder");

    cy.get('[data-testid="ingredient"]').drag('[data-testid="constructor"]');

    cy.get('[data-testid="constructor"]')
      .find('[data-testid="constructor-ingredient"]')
      .should("exist");

    cy.get('[data-testid="constructor"]').contains("(верх)");
    cy.get('[data-testid="constructor"]').contains("(низ)");

    cy.get('[data-testid="send-order"]').click();

    cy.wait("@sendOrder");
    cy.get('[data-testid="modal"]').should("exist");
    cy.get(".modal-order__number").should("contain.text", orderNumber);
    cy.contains("идентификатор заказа").should("exist");

    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should("not.exist");
  });

  it('при клике на ингредиент открывается модалка с данными о нём, при нажатии на кнопку "X" модалка закрывается', () => {
    cy.get('[data-testid="ingredient"]').first().click();
    cy.get('[data-testid="modal"]').should("exist");
    cy.get('[data-testid="modal"]').contains("Детали ингредиента");
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should("not.exist");
  });
});
