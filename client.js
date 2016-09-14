var pizzaApp = angular.module('pizzaApp', ['ui.router']);

pizzaApp.config(function($stateProvider, $urlRouterProvider) {

  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "home.html",
      controller : "HomeController"
    })
    .state('drinks', {
      url: "/drinks",
      templateUrl: "pizza/drinks.html",
      controller: "DrinksController"
    })
    .state('pizza', {
      url: "/pizza",
      templateUrl: "pizza/pizza.html",
      controller: "PizzaController"
    })
    .state('salads', {
      url: "/salads",
      templateUrl: "pizza/salads.html",
      controller: "SaladsController"
    })
    .state('soups', {
      url: "/soups",
      templateUrl: "pizza/soups.html",
      controller: "SoupsController"
    })
    .state('hotDishes', {
      url: "/hotDishes",
      templateUrl: "pizza/hotDishes.html",
      controller: "HotDishesController"
    })
    .state('breakfasts', {
      url: "/breakfasts",
      templateUrl: "pizza/breakfasts.html",
      controller: "BreakfastsController"
    })
    .state('fitness', {
      url: "/fitness",
      templateUrl: "pizza/fitness.html",
      controller: "FitnessController"
    })
    .state('desserts', {
      url: "/desserts",
      templateUrl: "pizza/desserts.html",
      controller: "DessertsController"
    })
});

