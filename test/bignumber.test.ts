const bignumber = require('../src/chain/bignumber');
test('convertAmountToRawNumber', () => {
    console.log(bignumber.convertAmountToRawNumber("1.1",18))
});