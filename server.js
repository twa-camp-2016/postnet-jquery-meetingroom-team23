let express = require('express');
let app = express();

let {changeZipcodeToBarcode} = require('./src/zipcode-to-barcode');
let {changeBarcodeToZipcode} = require('./src/barcode-to-zipcode');

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

app.get('/zipcode-to-barcode/:zipCode', function(req, res) {
  // TODO
  let zipCode = req.params.zipCode;
  let a = new changeZipcodeToBarcode();
  let barCode = a.changeZipcodeToBarcode(zipCode);

  if (barCode.text === 'invalid_zipCode') {
    res.status(400).send(barCode);

  }else{
    res.status(200).send(barCode.text.text);

  }
  res.send(zipCode);
});

app.get('/barcode-to-zipcode/:barCode', function(req, res) {
  // TODO
  let barCode = req.params.barCode;
  let a = new changeBarcodeToZipcode();
  let zipCode = a.changeBarcodeToZipcode(barCode);

  if (zipCode.text === 'invalid_barCode') {
    res.status(400).send(zipCode);

  }else{
    res.status(200).send(zipCode.text.text);

  }
});

app.listen(3000, function() {
  console.log('server is listening on 3000');
})