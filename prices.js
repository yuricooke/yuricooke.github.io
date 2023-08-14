var products = [
    { name: "Product 1", price: 44.00 },
    { name: "Product 2", price: 39.00 },
    { name: "Product 3", price: 84.00 }
  ];

  function calculateTotalPrice(quantity, price) {
    var totalPrice = quantity * price;
    return totalPrice.toFixed(2);
  }

  function updateTotalPrice(elementId, totalPrice) {
    document.getElementById(elementId).textContent = "$" + totalPrice;
  }

  function incrementQuantity(index) {
    var quantityInput = document.getElementById("form" + (index + 1));
    var currentQuantity = parseInt(quantityInput.value);
    var updatedQuantity = currentQuantity + 1;
    quantityInput.value = updatedQuantity;

    var totalPrice = calculateTotalPrice(updatedQuantity, products[index].price);
    updateTotalPrice("totalPrice" + (index + 1), totalPrice);
  }

  function decrementQuantity(index) {
    var quantityInput = document.getElementById("form" + (index + 1));
    var currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
      var updatedQuantity = currentQuantity - 1;
      quantityInput.value = updatedQuantity;

      var totalPrice = calculateTotalPrice(updatedQuantity, products[index].price);
      updateTotalPrice("totalPrice" + (index + 1), totalPrice);
    }
  }

  // Calculate and display the initial total prices
  for (var i = 0; i < products.length; i++) {
    var quantityInput = document.getElementById("form" + (i + 1));
    var initialTotalPrice = calculateTotalPrice(quantityInput.value, products[i].price);
    updateTotalPrice("totalPrice" + (i + 1), initialTotalPrice);
  }