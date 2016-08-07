function showMessage(message) {
    $("#console").text(message);
}

var state = 0;
function send() {
    let input = $("#input").val();
    console.log(input);
    alert("Send: " + input);

    if (input == 1) {
        let message = 'please input zipCode:';
        showMessage(message);
        state = 1;
    }
    else if (input == 2) {
        let message = 'please input barCode:';
        showMessage(message);
        state = 2;
    } else if (input == 3) {
        showMessage('exit!');

    } else if (state == 1) {
        startZipCodeToBarCode(input);
    } else if (state == 2){
        startBarCodeToZipCode(input);
    }

}

function startZipCodeToBarCode(zipCode) {
    $.get('./zipcode-to-barcode/' + zipCode, function (barcode, status) {
        // TODO just demo
        showMessage(barcode);
    });
}

function startBarCodeToZipCode(barCode) {
    $.get('./barcode-to-zipcode/' + barCode, function (zipcode,status) {
        // TODO just demo
        showMessage(zipcode);
    });
}

function start() {
    let message = `
======================
zipCode to barCode: 1
barCode to zipCode: 2
quit: 3
please input (1-3):
======================`;
    showMessage(message);
}

start();