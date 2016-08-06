function showMessage(message) {
  $("#console").text(message);
}

function send() {
  let input = $("#input").val();
  // TODO just demo
  alert("Send: " + input);
}

function start() {
  $.get('./zipcode-to-barcode/12345', function(barcode) {
    // TODO just demo
    showMessage(barcode);
  });
}

start();