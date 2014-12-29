describe('c2g test', function() {

  // 100km and 20 minutes)
  it('100km, 20 minutes', function() {
    browser.get('http://localhost:3003/#/c2g');
    element(by.model('distance')).clear().sendKeys(100);

    //Preis
    expect(element(by.binding('price')).getText()).toEqual('20,30 €');

    //Zeit
    expect(element(by.binding('getDays')).getText()).toEqual('0');
    expect(element(by.binding('getFeeDays')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getHours')).getText()).toEqual('0');
    expect(element(by.binding('getFeeHours')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getMinutes')).getText()).toEqual('20');
    expect(element(by.binding('getFeeMinutes')).getText()).toEqual('5,80 €');

    //Distanz
    expect(element(by.binding('getFreeKm')).getText()).toEqual('50');
    expect(element(by.binding('getAdditionalKm')).getText()).toEqual('50');
    expect(element(by.binding('getFee_additionalKm')).getText()).toEqual('14,50 €');

    //Sonstiges
    expect(element(by.binding('getFeeStanding')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getFeeAirport')).getText()).toEqual('0,00 €');
  });

  it('100km, 20 minutes, airport fee', function() {
    browser.get('http://localhost:3003/#/c2g');
    element(by.model('airport')).click();
    element(by.model('distance')).clear().sendKeys(100);

    //Preis
    expect(element(by.binding('price')).getText()).toEqual('25,20 €');

    //Zeit
    expect(element(by.binding('getDays')).getText()).toEqual('0');
    expect(element(by.binding('getFeeDays')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getHours')).getText()).toEqual('0');
    expect(element(by.binding('getFeeHours')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getMinutes')).getText()).toEqual('20');
    expect(element(by.binding('getFeeMinutes')).getText()).toEqual('5,80 €');

    //Distanz
    expect(element(by.binding('getFreeKm')).getText()).toEqual('50');
    expect(element(by.binding('getAdditionalKm')).getText()).toEqual('50');
    expect(element(by.binding('getFee_additionalKm')).getText()).toEqual('14,50 €');

    //Sonstiges
    expect(element(by.binding('getFeeStanding')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getFeeAirport')).getText()).toEqual('4,90 €');
  });

  it('100km, 20 minutes, 10 standing minutes', function() {
    browser.get('http://localhost:3003/#/c2g');
    element(by.model('time_standing')).clear().sendKeys(10);
    element(by.model('distance')).clear().sendKeys(100);

    //Preis
    expect(element(by.binding('price')).getText()).toEqual('22,20 €');

    //Zeit
    expect(element(by.binding('getDays')).getText()).toEqual('0');
    expect(element(by.binding('getFeeDays')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getHours')).getText()).toEqual('0');
    expect(element(by.binding('getFeeHours')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getMinutes')).getText()).toEqual('20');
    expect(element(by.binding('getFeeMinutes')).getText()).toEqual('5,80 €');

    //Distanz
    expect(element(by.binding('getFreeKm')).getText()).toEqual('50');
    expect(element(by.binding('getAdditionalKm')).getText()).toEqual('50');
    expect(element(by.binding('getFee_additionalKm')).getText()).toEqual('14,50 €');

    //Sonstiges
    expect(element(by.binding('getFeeStanding')).getText()).toEqual('1,90 €');
    expect(element(by.binding('getFeeAirport')).getText()).toEqual('0,00 €');
  });

  it('100km, 20 minutes, 10 standing minutes, airport fee', function() {
    browser.get('http://localhost:3003/#/c2g');
    element(by.model('airport')).click();
    element(by.model('time_standing')).clear().sendKeys(10);
    element(by.model('distance')).clear().sendKeys(100);

    //Preis
    expect(element(by.binding('price')).getText()).toEqual('27,10 €');

    //Zeit
    expect(element(by.binding('getDays')).getText()).toEqual('0');
    expect(element(by.binding('getFeeDays')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getHours')).getText()).toEqual('0');
    expect(element(by.binding('getFeeHours')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getMinutes')).getText()).toEqual('20');
    expect(element(by.binding('getFeeMinutes')).getText()).toEqual('5,80 €');

    //Distanz
    expect(element(by.binding('getFreeKm')).getText()).toEqual('50');
    expect(element(by.binding('getAdditionalKm')).getText()).toEqual('50');
    expect(element(by.binding('getFee_additionalKm')).getText()).toEqual('14,50 €');

    //Sonstiges
    expect(element(by.binding('getFeeStanding')).getText()).toEqual('1,90 €');
    expect(element(by.binding('getFeeAirport')).getText()).toEqual('4,90 €');
  });
});
