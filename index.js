function showMessage(message) {
  $("#console").text(message);
  $("#input").val("");
}
function send() {
  let input = $("#input").val();
  $.get('./choose/'+input,function (result) {
      showMessage(result);
  });
}
function start() {
  $.get('./menu', function(result) {
    showMessage(result);
  });
}
start();