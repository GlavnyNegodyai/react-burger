/// <reference types="cypress" />

const constructorComponent = '[data-testid="constructor"]';
const ingredientCard = '[data-testid="ingredient"]';
const modalComponent = '[data-testid="modal"]';
const sendOrderBtn = '[data-testid="send-order"]';

describe("Constructor page works correctly", function () {
  beforeEach(function () {
    cy.intercept("GET", "**/ingredients").as("getIngredients");
    cy.visit("/");
    cy.wait("@getIngredients");
  });

  it("Конструктор открывается по дефолту при заходе на главную страницу", () => {
    cy.contains("Соберите бургер");
    cy.get(constructorComponent).should("exist");
    cy.get(constructorComponent).should("exist");
    cy.get(sendOrderBtn).should("exist");
  });

  it("Неавторизованный пользователь перенаправляется на страницу /login, если пытается отправить заказ", () => {
    cy.get(ingredientCard).drag(constructorComponent);
    cy.get(constructorComponent)
      .find('[data-testid="constructor-ingredient"]')
      .should("exist");

    cy.get(sendOrderBtn).click();

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

    cy.get(ingredientCard).drag(constructorComponent);

    cy.get(constructorComponent)
      .find('[data-testid="constructor-ingredient"]')
      .should("exist");

    cy.get(constructorComponent).contains("(верх)");
    cy.get(constructorComponent).contains("(низ)");

    cy.get(sendOrderBtn).click();

    cy.wait("@sendOrder");
    cy.get(modalComponent).should("exist");
    cy.get(".modal-order__number").should("contain.text", orderNumber);
    cy.contains("идентификатор заказа").should("exist");

    cy.get('[data-testid="modal-close"]').click();
    cy.get(modalComponent).should("not.exist");
  });

  it('при клике на ингредиент открывается модалка с данными о нём, при нажатии на кнопку "X" модалка закрывается', () => {
    cy.get(ingredientCard).first().click();
    cy.get(modalComponent).should("exist");
    cy.get(modalComponent).contains("Детали ингредиента");
    cy.get('[data-testid="modal-close"]').click();
    cy.get(modalComponent).should("not.exist");
  });
});
