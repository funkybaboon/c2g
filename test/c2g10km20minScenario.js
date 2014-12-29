describe('c2g test', function() {

  // default (10km and 20 minutes)
  it('10km, 20 minutes', function() {
    browser.get('http://localhost:3003/#/c2g');

    //Preis
    expect(element(by.binding('price')).getText()).toEqual('5,80 €');

    //Zeit
    expect(element(by.binding('getDays')).getText()).toEqual('0');
    expect(element(by.binding('getFeeDays')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getHours')).getText()).toEqual('0');
    expect(element(by.binding('getFeeHours')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getMinutes')).getText()).toEqual('20');
    expect(element(by.binding('getFeeMinutes')).getText()).toEqual('5,80 €');

    //Distanz
    expect(element(by.binding('getFreeKm')).getText()).toEqual('50');
    expect(element(by.binding('getAdditionalKm')).getText()).toEqual('0');
    expect(element(by.binding('getFee_additionalKm')).getText()).toEqual('0,00 €');

    //Sonstiges
    expect(element(by.binding('getFeeStanding')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getFeeAirport')).getText()).toEqual('0,00 €');
  });

  it('10km, 20 minutes, airport fee', function() {
    browser.get('http://localhost:3003/#/c2g');
    element(by.model('airport')).click();

    //Preis
    expect(element(by.binding('price')).getText()).toEqual('10,70 €');

    //Zeit
    expect(element(by.binding('getDays')).getText()).toEqual('0');
    expect(element(by.binding('getFeeDays')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getHours')).getText()).toEqual('0');
    expect(element(by.binding('getFeeHours')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getMinutes')).getText()).toEqual('20');
    expect(element(by.binding('getFeeMinutes')).getText()).toEqual('5,80 €');

    //Distanz
    expect(element(by.binding('getFreeKm')).getText()).toEqual('50');
    expect(element(by.binding('getAdditionalKm')).getText()).toEqual('0');
    expect(element(by.binding('getFee_additionalKm')).getText()).toEqual('0,00 €');

    //Sonstiges
    expect(element(by.binding('getFeeStanding')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getFeeAirport')).getText()).toEqual('4,90 €');
  });

  it('10km, 20 minutes, 10 standing minutes', function() {
    browser.get('http://localhost:3003/#/c2g');
    element(by.model('time_standing')).clear().sendKeys(10);

    //Preis
    expect(element(by.binding('price')).getText()).toEqual('7,70 €');

    //Zeit
    expect(element(by.binding('getDays')).getText()).toEqual('0');
    expect(element(by.binding('getFeeDays')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getHours')).getText()).toEqual('0');
    expect(element(by.binding('getFeeHours')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getMinutes')).getText()).toEqual('20');
    expect(element(by.binding('getFeeMinutes')).getText()).toEqual('5,80 €');

    //Distanz
    expect(element(by.binding('getFreeKm')).getText()).toEqual('50');
    expect(element(by.binding('getAdditionalKm')).getText()).toEqual('0');
    expect(element(by.binding('getFee_additionalKm')).getText()).toEqual('0,00 €');

    //Sonstiges
    expect(element(by.binding('getFeeStanding')).getText()).toEqual('1,90 €');
    expect(element(by.binding('getFeeAirport')).getText()).toEqual('0,00 €');
  });

  it('10km, 20 minutes, 10 standing minutes, airport fee', function() {
    browser.get('http://localhost:3003/#/c2g');
    element(by.model('airport')).click();
    element(by.model('time_standing')).clear().sendKeys(10);

    //Preis
    expect(element(by.binding('price')).getText()).toEqual('12,60 €');

    //Zeit
    expect(element(by.binding('getDays')).getText()).toEqual('0');
    expect(element(by.binding('getFeeDays')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getHours')).getText()).toEqual('0');
    expect(element(by.binding('getFeeHours')).getText()).toEqual('0,00 €');
    expect(element(by.binding('getMinutes')).getText()).toEqual('20');
    expect(element(by.binding('getFeeMinutes')).getText()).toEqual('5,80 €');

    //Distanz
    expect(element(by.binding('getFreeKm')).getText()).toEqual('50');
    expect(element(by.binding('getAdditionalKm')).getText()).toEqual('0');
    expect(element(by.binding('getFee_additionalKm')).getText()).toEqual('0,00 €');

    //Sonstiges
    expect(element(by.binding('getFeeStanding')).getText()).toEqual('1,90 €');
    expect(element(by.binding('getFeeAirport')).getText()).toEqual('4,90 €');
  });
});
