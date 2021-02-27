const erc20 = require('../src/chain/erc20');
require('../src/chain/api')
process.env.VUE_APP_CHAIN_URL = "http://192.168.1.5:8545"
process.env.VUE_APP_DREAM_TOKEN = "0x5045765ebFa7C5018CEfe2484559Fb985520F9a6"
process.env.VUE_APP_DREAM_MAKE = "0x1aD76125f61c974ebdD7471E0D8498eb967e6565"
process.env.VUE_APP_CHAIN_ID = "999"
let cm = new erc20.ContractManager()
test('viewTotalAmount', async () => {
    let result = await cm.ViewTotalAmount()
    console.log(result)
});

test("withdraw", async () => {
    let result = await cm.Withdraw('0x300B0975B6F277515AD7a7B32a1eC2da1bE27F7B', '1.00')
    console.log(result)
});

