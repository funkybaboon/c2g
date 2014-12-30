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

  beforeEach(function() {
    browser.get('http://localhost:3003/#/c2g');
  });

  // 10km and 2000 minutes)
  it('10km, 2000 minutes', function() {
    element(by.model('time')).clear().sendKeys(2000);

    //Preis
    expect(price.getText()).toEqual('198,90 €');

    //Zeit
    expect(getDays.getText()).toEqual('1');
    expect(getFeeDays.getText()).toEqual('59,00 €');
    expect(getHours.getText()).toEqual('9');
    expect(getFeeHours.getText()).toEqual('134,10 €');
    expect(getMinutes.getText()).toEqual('20');
    expect(getFeeMinutes.getText()).toEqual('5,80 €');

    //Distanz
    expect(getFreeKm.getText()).toEqual('100');
    expect(getAdditionalKm.getText()).toEqual('0');
    expect(getfeeAdditionalKm.getText()).toEqual('0,00 €');

    //Sonstiges
    expect(getFeeStanding.getText()).toEqual('0,00 €');
    expect(getFeeAirport.getText()).toEqual('0,00 €');
  });

  it('10km, 2000 minutes, airport fee', function() {
    element(by.model('airport')).click();
    element(by.model('time')).clear().sendKeys(2000);

    //Preis
    expect(price.getText()).toEqual('203,80 €');

    //Zeit
    expect(getDays.getText()).toEqual('1');
    expect(getFeeDays.getText()).toEqual('59,00 €');
    expect(getHours.getText()).toEqual('9');
    expect(getFeeHours.getText()).toEqual('134,10 €');
    expect(getMinutes.getText()).toEqual('20');
    expect(getFeeMinutes.getText()).toEqual('5,80 €');

    //Distanz
    expect(getFreeKm.getText()).toEqual('100');
    expect(getAdditionalKm.getText()).toEqual('0');
    expect(getfeeAdditionalKm.getText()).toEqual('0,00 €');

    //Sonstiges
    expect(getFeeStanding.getText()).toEqual('0,00 €');
    expect(getFeeAirport.getText()).toEqual('4,90 €');
  });

  it('10km, 2000 minutes, 10 standing minutes', function() {
    element(by.model('timeStanding')).clear().sendKeys(10);
    element(by.model('time')).clear().sendKeys(2000);

    //Preis
    expect(price.getText()).toEqual('200,80 €');

    //Zeit
    expect(getDays.getText()).toEqual('1');
    expect(getFeeDays.getText()).toEqual('59,00 €');
    expect(getHours.getText()).toEqual('9');
    expect(getFeeHours.getText()).toEqual('134,10 €');
    expect(getMinutes.getText()).toEqual('20');
    expect(getFeeMinutes.getText()).toEqual('5,80 €');

    //Distanz
    expect(getFreeKm.getText()).toEqual('100');
    expect(getAdditionalKm.getText()).toEqual('0');
    expect(getfeeAdditionalKm.getText()).toEqual('0,00 €');

    //Sonstiges
    expect(getFeeStanding.getText()).toEqual('1,90 €');
    expect(getFeeAirport.getText()).toEqual('0,00 €');
  });

  it('10km, 2000 minutes, 10 standing minutes, airport fee', function() {
    element(by.model('airport')).click();
    element(by.model('timeStanding')).clear().sendKeys(10);
    element(by.model('time')).clear().sendKeys(2000);

    //Preis
    expect(price.getText()).toEqual('205,70 €');

    //Zeit
    expect(getDays.getText()).toEqual('1');
    expect(getFeeDays.getText()).toEqual('59,00 €');
    expect(getHours.getText()).toEqual('9');
    expect(getFeeHours.getText()).toEqual('134,10 €');
    expect(getMinutes.getText()).toEqual('20');
    expect(getFeeMinutes.getText()).toEqual('5,80 €');

    //Distanz
    expect(getFreeKm.getText()).toEqual('100');
    expect(getAdditionalKm.getText()).toEqual('0');
    expect(getfeeAdditionalKm.getText()).toEqual('0,00 €');

    //Sonstiges
    expect(getFeeStanding.getText()).toEqual('1,90 €');
    expect(getFeeAirport.getText()).toEqual('4,90 €');
  });
});
