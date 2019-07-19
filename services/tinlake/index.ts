const SignerProvider = require('ethjs-provider-signer');
const { sign } = require('ethjs-signer');
const rpcUrl = 'https://kovan.infura.io/v3/092108ec6aea46ab97b2175b45130455';
const eth_pr_key = '0x30934837cdc94b93a7142122338784b6c73183c8aa1d279b47e84f85c5d7367f';
const EthFromAddress = `0x54b7ffd4ae11b0896b4fc2cf59e5570dbdf18abd`;


import Tinlake from 'tinlake';
import contractAddresses from './addresses_tinlake.json';


export async function getTinlake() {
  return new Tinlake(
      new SignerProvider(rpcUrl, {
        signTransaction: (rawTx: any, cb: (arg0: null, arg1: any) => void) =>
  cb(null, sign(rawTx, eth_pr_key)),
      accounts: (cb: (arg0: null, arg1: string[]) => void) => cb(null, [EthFromAddress]),
}), contractAddresses, {
  ethConfig: { from: EthFromAddress },
});
}

export async function getTinlakeData() {
    let tinlake = await getTinlake();
    let TotalDebt = await tinlake.contracts.pile.Debt();
    let TotalValueofNFTs = await tinlake.contracts.shelf.bags();
    let totalSupply = null;
    let NumberOfLoans = await tinlake.contracts.title.count();

    let data = {
        Debt: TotalDebt[0].toString(),
        TotalValueofNFTs: TotalValueofNFTs[0].toString(),
        totalSupply: 0,
        NumberOfLoans: NumberOfLoans[0].toString()
    };

    return data
};

