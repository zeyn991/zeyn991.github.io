"use strict";

document.addEventListener("DOMContentLoaded", function () {

    var form = document.getElementById("calc-form");
    var quantityInput = document.getElementById("calc-quantity");
    var typeRadios = document.getElementsByName("calc-type");
    var optionsGroup = document.getElementById("calc-options-group");
    var optionSelect = document.getElementById("calc-option");
    var propertyGroup = document.getElementById("calc-property-group");
    var propertyCheckbox = document.getElementById("calc-property");
    var errorBox = document.getElementById("calc-error");
    var resultBox = document.getElementById("calc-result");

    var quantityPattern = /^[1-9][0-9]{0,3}$/;

    var PROPERTY_PRICE = 3000;

    var products = {
        "1": { name: "Наушники", price: 2500, hasOptions: false, hasProperty: false },
        "2": { name: "Клавиатура", price: 4300, hasOptions: true, hasProperty: false },
        "3": { name: "Монитор", price: 15800, hasOptions: false, hasProperty: true }
    };

    function getSelectedType() {
        for (var i = 0; i < typeRadios.length; i++) {
            if (typeRadios[i].checked) {
                return typeRadios[i].value;
            }
        }
        return "1";
    }

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

    function hideMessages() {
        errorBox.hidden = true;
        resultBox.hidden = true;
    }

    function updateFormFields() {
        var product = products[getSelectedType()];
        optionsGroup.hidden = !product.hasOptions;
        propertyGroup.hidden = !product.hasProperty;
    }

    function calculateCost() {
        var rawQuantity = quantityInput.value.trim();

        if (rawQuantity === "") {
            hideMessages();
            return;
        }

        if (!quantityPattern.test(rawQuantity)) {
            showError("Введите количество товара целым положительным числом (от 1 до 9999).");
            return;
        }

        var quantity = parseInt(rawQuantity, 10);
        var product = products[getSelectedType()];
        var unitPrice = product.price;

        if (product.hasOptions) {
            unitPrice += parseInt(optionSelect.value, 10);
        }
        if (product.hasProperty && propertyCheckbox.checked) {
            unitPrice += PROPERTY_PRICE;
        }

        var total = unitPrice * quantity;

        showResult("Итого: " + product.name + " x " + quantity + " = " + total + " ₽");
    }

    function onTypeChange() {
        updateFormFields();
        calculateCost();
    }

    for (var i = 0; i < typeRadios.length; i++) {
        typeRadios[i].addEventListener("change", onTypeChange);
    }
    quantityInput.addEventListener("input", calculateCost);
    optionSelect.addEventListener("change", calculateCost);
    propertyCheckbox.addEventListener("change", calculateCost);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
    });

    updateFormFields();

});
