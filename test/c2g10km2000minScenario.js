describe('c2g test', function() {

  // 10km and 2000 minutes)
  it('10km, 2000 minutes', function() {
    browser.get('http://localhost:3003/#/c2g');
    element(by.model('time')).clear().sendKeys(2000);

    //Preis
    expect(element(by.binding('price')).getText()).toEqual('198,90 €');

    //Zeit
    expect(element(by.binding('getDays')).getText()).toEqual('1');
    expect(element(by.binding('getFeeDays')).getText()).toEqual('59,00 €');
    expect(element(by.binding('getHours')).getText()).toEqual('9');
    expect(element(by.binding('getFeeHours')).getText()).toEqual('134,10 €');
    expect(element(by.binding('getMinutes')).getText()).toEqual('20');
    expect(element(by.binding('getFeeMinutes')).getText()).toEqual('5,80 €');

    //Distanz
    expect(element(by.binding('getFreeKm')).getText()).toEqual('100');
    expect(element(by.binding('getAdditionalKm')).getText()).toEqual('0');
    expect(element(by.binding('getFee_additionalKm')).getText()).toEqual('0,00 €');

    //Sonstiges
    expect(element(by.binding('getFeeStanding')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getFeeAirport')).getText()).toEqual('0,00 €');
  });

  it('10km, 2000 minutes, airport fee', function() {
    browser.get('http://localhost:3003/#/c2g');
    element(by.model('airport')).click();
    element(by.model('time')).clear().sendKeys(2000);

    //Preis
    expect(element(by.binding('price')).getText()).toEqual('203,80 €');

    //Zeit
    expect(element(by.binding('getDays')).getText()).toEqual('1');
    expect(element(by.binding('getFeeDays')).getText()).toEqual('59,00 €');
    expect(element(by.binding('getHours')).getText()).toEqual('9');
    expect(element(by.binding('getFeeHours')).getText()).toEqual('134,10 €');
    expect(element(by.binding('getMinutes')).getText()).toEqual('20');
    expect(element(by.binding('getFeeMinutes')).getText()).toEqual('5,80 €');

    //Distanz
    expect(element(by.binding('getFreeKm')).getText()).toEqual('100');
    expect(element(by.binding('getAdditionalKm')).getText()).toEqual('0');
    expect(element(by.binding('getFee_additionalKm')).getText()).toEqual('0,00 €');

    //Sonstiges
    expect(element(by.binding('getFeeStanding')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getFeeAirport')).getText()).toEqual('4,90 €');
  });

  it('10km, 2000 minutes, 10 standing minutes', function() {
    browser.get('http://localhost:3003/#/c2g');
    element(by.model('time_standing')).clear().sendKeys(10);
    element(by.model('time')).clear().sendKeys(2000);

    //Preis
    expect(element(by.binding('price')).getText()).toEqual('200,80 €');

    //Zeit
    expect(element(by.binding('getDays')).getText()).toEqual('1');
    expect(element(by.binding('getFeeDays')).getText()).toEqual('59,00 €');
    expect(element(by.binding('getHours')).getText()).toEqual('9');
    expect(element(by.binding('getFeeHours')).getText()).toEqual('134,10 €');
    expect(element(by.binding('getMinutes')).getText()).toEqual('20');
    expect(element(by.binding('getFeeMinutes')).getText()).toEqual('5,80 €');

    //Distanz
    expect(element(by.binding('getFreeKm')).getText()).toEqual('100');
    expect(element(by.binding('getAdditionalKm')).getText()).toEqual('0');
    expect(element(by.binding('getFee_additionalKm')).getText()).toEqual('0,00 €');

    //Sonstiges
    expect(element(by.binding('getFeeStanding')).getText()).toEqual('1,90 €');
    expect(element(by.binding('getFeeAirport')).getText()).toEqual('0,00 €');
  });

  it('10km, 2000 minutes, 10 standing minutes, airport fee', function() {
    browser.get('http://localhost:3003/#/c2g');
    element(by.model('airport')).click();
    element(by.model('time_standing')).clear().sendKeys(10);
    element(by.model('time')).clear().sendKeys(2000);

    //Preis
    expect(element(by.binding('price')).getText()).toEqual('205,70 €');

    //Zeit
    expect(element(by.binding('getDays')).getText()).toEqual('1');
    expect(element(by.binding('getFeeDays')).getText()).toEqual('59,00 €');
    expect(element(by.binding('getHours')).getText()).toEqual('9');
    expect(element(by.binding('getFeeHours')).getText()).toEqual('134,10 €');
    expect(element(by.binding('getMinutes')).getText()).toEqual('20');
    expect(element(by.binding('getFeeMinutes')).getText()).toEqual('5,80 €');

    //Distanz
    expect(element(by.binding('getFreeKm')).getText()).toEqual('100');
    expect(element(by.binding('getAdditionalKm')).getText()).toEqual('0');
    expect(element(by.binding('getFee_additionalKm')).getText()).toEqual('0,00 €');

    //Sonstiges
    expect(element(by.binding('getFeeStanding')).getText()).toEqual('1,90 €');
    expect(element(by.binding('getFeeAirport')).getText()).toEqual('4,90 €');
  });
});
