'use strict';

var storeApp = angular.module('AmazingStore', []);


storeApp.controller("StoreController", ['$scope', 'Store', 'CurrencyConvertor', function storeController($scope, Store, CurrencyConvertor) {

    const selectedCart = [];
    $scope.store = Store.store;

    $scope.currencies = [
            {id: '1', name: 'Dollar', symbol: '$'},
            {id: '2', name: 'Rubble', symbol: 'RUB'},
            {id: '3', name: 'Euro', symbol: "EU"}
        ];

    $scope.data = {
        currencyOptions: $scope.currencies,
    };

    $scope.data.selectedCurrency = $scope.data.currencyOptions[0];

    $scope.convertedPrice = function(baseCurrencyPrice) {
        return CurrencyConvertor.convertedPrice(baseCurrencyPrice, $scope.data.selectedCurrency.id);
    }

    $scope.addItem = function(product) {
        selectedCart.push({price: product.price});
    }

    $scope.getTotalCount = function() {
        let itemsCount = 0;
        for (let item of selectedCart) {
            itemsCount++;
        }
        return itemsCount;
    }

    $scope.getTotalConvertedPrice = function() {
        let totalPrice = 0;
        for (let item of selectedCart) {
            totalPrice += $scope.convertedPrice(item.price);
        }
        $scope.getTotalCartPrice();
        return totalPrice;
    }

    $scope.getTotalCartPrice = function() {
        let totalPriceInBaseCurrency = 0;
        for (let item of selectedCart) {
            totalPriceInBaseCurrency += item.price;
        }
        let totalCartPrice = {
            dollars: CurrencyConvertor.convertedPrice(totalPriceInBaseCurrency, '1'),
            rubbles: CurrencyConvertor.convertedPrice(totalPriceInBaseCurrency, '2'),
            euros: CurrencyConvertor.convertedPrice(totalPriceInBaseCurrency, '3')
        };
        return totalCartPrice;
    }
}]);

storeApp.factory("CurrencyConvertor", function () {

    const currencyRates = {
        '1': 1,
        '2': 57.39,
        '3': 0.9446913580246914
    }

    function convertedPrice(baseCurrencyPrice, currency) {
        return Math.round(currencyRates[currency] * baseCurrencyPrice * 100) / 100;
    }

    return {
        convertedPrice: convertedPrice
    };
});

storeApp.factory("Store", function () {

    function Product(id, name, description, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    var store = {
        products: [
            new Product(1, "Apple", "Eat one every day to keep the doctor away!", 12),
            new Product(2, "Avocado", "Guacamole anyone?", 16),
            new Product(3, "Banana", "These are rich in Potassium and easy to peel.", 4),
            new Product(4, "Cantaloupe", "Delicious and refreshing.", 3),
            new Product(5, "Fig", "OK, not that nutritious, but sooo good!", 10)
        ]
    };

    return {
        store: store
    };
});
