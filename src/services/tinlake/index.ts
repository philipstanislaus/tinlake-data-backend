import Tinlake from 'tinlake';
import contractAddresses from './addresses_tinlake.json';
import { sign } from 'ethjs-signer';
const SignerProvider = require('ethjs-provider-signer');
import config from './../../config';

export async function getTinlake() {
  return new Tinlake(
    new SignerProvider(config['rpcUrl'], {
      signTransaction: (rawTx: any, cb: (arg0: null, arg1: any) => void) =>
        cb(null, sign(rawTx, config[''])),
      accounts: (cb: (arg0: null, arg1: string[]) => void) => cb(null, [config['EthFromAddress']]),
    }),
    contractAddresses,
    {
      ethConfig: { from: config['EthFromAddress'] },
    },
  );
}

export async function getTinlakeData() {
  const tinlake = await getTinlake();
  const TotalDebt = await tinlake.contracts.pile.Debt();
  const TotalBalance = await tinlake.contracts.pile.Balance();
  const TotalValueofNFTs = await tinlake.contracts.shelf.bags();
  const NumberOfLoans = await tinlake.contracts.title.count();
  const TotalSupply = await tinlake.contracts.collateral.totalSupply();

  const data = {
    total_debt: Number(TotalDebt[0].toString()),
    total_balance: Number(TotalBalance[0].toString()),
    total_value_of_nfts: Number(TotalValueofNFTs[0].toString()),
    total_supply: 0,
    number_of_loans: Number(NumberOfLoans[0].toString()),
  };

  return data;
}
