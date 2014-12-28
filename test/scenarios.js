describe('c2g test', function() {
  it('add a 0 to default values', function() {
    browser.get('http://localhost:3003/#/c2g');
    element(by.model('distance')).sendKeys(0);
    element(by.model('time')).sendKeys(0);

    expect(element(by.binding('price')).getText()).
        toEqual('65,00 €'); 
  });
});