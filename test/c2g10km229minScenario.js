describe('c2g test', function() {
  var price = element(by.binding('price'));
  var getDays = element(by.binding('getDays'));
  var getFeeDays = element(by.binding('getFeeDays'));
  var getHours = element(by.binding('getHours'));
  var getFeeHours = element(by.binding('getFeeHours'));
  var getMinutes = element(by.binding('getMinutes'));
  var getFeeMinutes = element(by.binding('getFeeMinutes'));
  var getFreeKm = element(by.binding('getFreeKm'));
  var getAdditionalKm = element(by.binding('getAdditionalKm'));
  var getfeeAdditionalKm = element(by.binding('getfeeAdditionalKm'));
  var getFeeStanding = element(by.binding('getFeeStanding'));
  var getFeeAirport = element(by.binding('getFeeAirport'));
  var msgRoundDownToHours = element(by.binding('msgRoundDownToHours'));
  var msgRoundDownToDays = element(by.binding('msgRoundDownToDays'));

  beforeEach(function() {
    browser.get('http://localhost:3003/c2g');
  });

  // 10km and 229 minutes)
  it('10km, 229 minutes', function() {
    element(by.model('time')).clear().sendKeys(229);

    //Preis
    expect(price.getText()).toEqual('58,91 €');

    //Zeit
    expect(getMinutes.getText()).toEqual('49');
    expect(getFeeMinutes.getText()).toEqual('14,21 €');
    expect(getHours.getText()).toEqual('3');
    expect(getFeeHours.getText()).toEqual('44,70 €');
    expect(getDays.getText()).toEqual('0');
    expect(getFeeDays.getText()).toEqual('0,00 €');

    //Distanz
    expect(getFreeKm.getText()).toEqual('50');
    expect(getAdditionalKm.getText()).toEqual('0');
    expect(getfeeAdditionalKm.getText()).toEqual('0,00 €');

    //Sonstiges
    expect(getFeeStanding.getText()).toEqual('0,00 €');
    expect(getFeeAirport.getText()).toEqual('0,00 €');

    //msg to round down
    expect(
      msgRoundDownToHours.getText()).toEqual('');
    expect(
      msgRoundDownToDays.getText()).toEqual('');
  });
});
