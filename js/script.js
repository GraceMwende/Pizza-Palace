var pizzaPrice = 0;

function Pizza(size, toppings, pizzaPrice) {
  this.size = size;
  this.toppings = toppings;
  this.pizzaPrice = 0;
}

Pizza.prototype.setToppings = function (toppings) {
  this.toppings = toppings;
}

Pizza.prototype.setSize = function (size) {
  this.size = size;
}

Pizza.prototype.price = function () {
  if (this.size === "small") {
    this.pizzaPrice = 200;
  } else if (this.size === "medium") {
    this.pizzaPrice = 400;
  } else if (this.size == "large") {
    this.pizzaPrice = 600;
  }

  if (this.toppings) {
    if (this.toppings.indexOf("sausage") >= 0) {
      this.pizzaPrice += 40;
    }
    if (this.toppings.indexOf("cheese") >= 0) {
      this.pizzaPrice += 50;
    }
    if (this.toppings.indexOf("mushroom") >= 0) {
      this.pizzaPrice += 60;
    }
    if (this.toppings.indexOf("olives") >= 0) {
      this.pizzaPrice += 70;
    }
    if (this.toppings.indexOf("pepper") >= 0) {
      this.pizzaPrice += 80;
    }
  }

  return this.pizzaPrice;
}

$(document).ready(function () {
  var size = $("input[type = radio][name = size]:checked").val();

  var toppings = $("input[type=checkbox][name=toppings]:checked");
  var i = 0;
  var toppingVal;
  while (i < toppings.length) {
    toppingVal += " " + (toppings[i]).value;
    i++;
  }

  var newPizza = new Pizza(size, toppingVal, pizzaPrice);
  // newPizza.price();

  $("input[type = radio][name = size]").on("change", function () {
    newPizza.setSize(getSize());
    newPizza.price();
    updatePrice(newPizza);
  })

  $("input[type='checkbox'][name='toppings']").on("change", function () {
    newPizza.setToppings(getToppings());
    newPizza.price();
    updatePrice(newPizza);
    console.log(newPizza);
  })
  // Add to cart btn
  $(".my-cart-btn").click(function (event) {
    event.preventDefault();
  });
});

function getToppings() {
  var toppings = $("input[type=checkbox][name=toppings]:checked");
  var i = 0;
  var toppingVal;
  while (i < toppings.length) {
    toppingVal += " " + (toppings[i]).value;
    i++;
  }
  return toppingVal;
}

function getSize() {
  return $("input[type = radio][name = size]:checked").val();
}

function updatePrice(newPizza) {
  $("#responses").html("<li>" + " Your total price is " + newPizza.pizzaPrice + "</li>")
}