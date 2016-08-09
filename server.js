let express = require('express');
let bodyParser = require("body-parser");

let BarcodeToZipcode = require('./src/core/getposttobar-core');
let ZipcodeToBarcode = require('./src/core/getbartopost-core');
let gotoMainPage = require("./src/commands/goto-main-page-command");
let InvalidInput = require("./src/commands/invalid-input-command");
let Exit = require("./src/commands/exit-command");
let gotoZipcodeToBarcode = require("./src/commands/goto-zipcode-to-barcode-command");
let gotoBarcodeToZipcode = require("./src/commands/goto-barcode-to-zipcode-command");
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./', {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['html', 'js', 'css'],
  index: ['index.html'], // or `false`
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}));
app.get('/', function (req, res) {
  res.sendfile('./index.html');
});
app.get('/menu', function (req, res) {
  let gotomainpage = new gotoMainPage();
  res.send(gotomainpage.do().text);
});

let status = 0;
app.get('/choose/:input', function (req, res) {
  let input = req.params.input;
  let gotozipcodetobarcode = new gotoZipcodeToBarcode();
  let gotobarcodetozipcode = new gotoBarcodeToZipcode();
  let invalidinput = new InvalidInput();
  let exit = new Exit();
  if(input === "1" && status === 0){
    status = 1;
    res.send(gotozipcodetobarcode.do().text);
  }else if(input === "2" && status === 0){
    status = 2;
   res.send(gotobarcodetozipcode.do().text);
  }else if(input === "3" && status === 0){
    res.send(exit.do());
  } else if(status === 1){
      let zipcodetobarcode = new ZipcodeToBarcode();
      let typeZipcode = zipcodetobarcode.checkBarcode(input);
      if (typeZipcode !== false) {
        res.send("转码结果是：" + zipcodetobarcode.do(input));
      }else {
        res.send("您的输入有误，请重新输入。。。");
      }
    }else if(status === 2){
      let barcodetozipcode = new BarcodeToZipcode();
      let typeBarcode = barcodetozipcode.checkPostCode(input);
      if (typeBarcode !== false) {
        res.send("转码结果是：" + barcodetozipcode.do(input));
      }else {
        res.send("您的输入有误，请重新输入。。。");
      }
    }else{
    res.send(invalidinput.do().error);
  }

});
app.get('/zipcode-to-barcode/:zipcode', function(req, res) {
  let zipcode = req.params.zipcode;
  let zipcodetobarcode = new ZipcodeToBarcode();
  let typeZipcode = zipcodetobarcode.checkBarcode(zipcode);
  if (typeZipcode !== false) {
    res.send("转码结果是：" + zipcodetobarcode.do(zipcode));
  }else {
    res.send("您的输入有误，请重新输入。。。");
  }
});

app.get('/barcode-to-zipcode/:barcode', function(req, res) {
  let barcode = req.params.barcode;
  let barcodetozipcode = new BarcodeToZipcode();
  let typeBarcode = barcodetozipcode.checkPostCode(barcode);
  if (typeBarcode !== false) {
    res.send("转码结果是：" + barcodetozipcode.do(barcode));
  }else {
    res.send("您的输入有误，请重新输入。。。");
  }
});

app.listen(3000, function() {
  console.log('server is listening on 3000');
})





