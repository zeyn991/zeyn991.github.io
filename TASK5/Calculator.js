"use strict";

document.addEventListener("DOMContentLoaded", function () {

    var productSelect = document.getElementById("calc-product");
    var quantityInput = document.getElementById("calc-quantity");
    var calcButton = document.getElementById("calc-button");
    var errorBox = document.getElementById("calc-error");
    var resultBox = document.getElementById("calc-result");

    var quantityPattern = /^[1-9][0-9]{0,3}$/;

    function showError(message) {
        errorBox.textContent = message;
        errorBox.hidden = false;
        resultBox.hidden = true;
    }

    function showResult(message) {
        resultBox.textContent = message;
        resultBox.hidden = false;
        errorBox.hidden = true;
    }

    function calculateCost() {
        var rawQuantity = quantityInput.value.trim();

        if (!quantityPattern.test(rawQuantity)) {
            showError("Введите количество товара целым положительным числом (от 1 до 9999).");
            return;
        }

        var quantity = parseInt(rawQuantity, 10);
        var price = parseInt(productSelect.value, 10);
        var total = price * quantity;
        var productName = productSelect.options[productSelect.selectedIndex].text;

        showResult("Итого: " + productName.split(" — ")[0] + " x " + quantity + " = " + total + " ₽");
    }

    calcButton.addEventListener("click", calculateCost);

});
