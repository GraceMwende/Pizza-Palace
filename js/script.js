var pizzaPrice = 0;

function Pizza(size, toppings, pizzaPrice) {
  this.size = size;
  this.toppings = toppings;
  this.pizzaPrice = 0;
}

Pizza.prototype.price = function () {
  if (this.size === "small") {
    this.pizzaPrice = 200;
  } else if (this.size === "medium") {
    this.pizzaPrice = 400;
  } else if (this.size == "large") {
    this.pizzaPrice = 600;
  }

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

  return this.pizzaPrice;
}

$(document).ready(function () {
  $(".modal-body").submit(function (event) {
    event.preventDefault();

    var size = $("input[type = radio][name = size]:checked").val();
    var toppings = $("input[type=checkbox][name=toppings]:checked");
    var i = 0;
    var toppingVal;
    while (i < toppings.length) {
      toppingVal += " " + (toppings[i]).value;
      i++;
    }

    var newPizza = new Pizza(size, toppingVal, pizzaPrice);
    newPizza.price();

    $("#responses").append("<li>" + "You ordered a " + newPizza.size + " " + newPizza.toppings + " pizza. " + " Your total price is " + newPizza.pizzaPrice + "</li>")
  });
});

// js cart plugin
$(function () {

  var goToCartIcon = function ($addTocartBtn) {
    var $cartIcon = $(".my-cart-icon");
    var $image = $('<img width="30px" height="30px" src="' + $addTocartBtn.data("image") + '"/>').css({
      "position": "fixed",
      "z-index": "999"
    });
    $addTocartBtn.prepend($image);
    var position = $cartIcon.position();
    $image.animate({
      top: position.top,
      left: position.left
    }, 500, "linear", function () {
      $image.remove();
    });
  }

  $('.my-cart-btn').myCart({
    classCartIcon: 'my-cart-icon',
    classCartBadge: 'my-cart-badge',
    affixCartIcon: true,
    checkoutCart: function (products) {
      $.each(products, function () {
        console.log(this);
      });
    },
    clickOnAddToCart: function ($addTocart) {
      goToCartIcon($addTocart);
    },
    getDiscountPrice: function (products) {
      var total = 0;
      $.each(products, function () {
        total += this.quantity * this.price;
      });
      return total * 0.5;
    }
  });

});