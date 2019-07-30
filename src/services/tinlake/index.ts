import Tinlake from 'tinlake';
import contractAddresses from './addresses_tinlake.json';
import { sign } from 'ethjs-signer';
const SignerProvider = require('ethjs-provider-signer');
import config from './../../config';
import BN from 'BN.js';

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

async function getTotalDept(tinlake: Tinlake, allLoans) {
  let debt = 0;

  for (const loanID in allLoans) {
    const loan = allLoans[loanID];
    const LoanIDBN = loanID.toString();
    const BalanceDebt = await tinlake.getBalanceDebt(LoanIDBN);
    console.log(`BalanceDebt ${BalanceDebt.debt}`);
    if (BalanceDebt.debt > 0) {
      console.log(`Loan ID is ${LoanIDBN}`);

      const cur_dept = await tinlake.getCurrentDebt(LoanIDBN);
      console.log(`CurrentDebt is ${cur_dept}`);
      debt += cur_dept;
    }

  }

  return debt;

}

async function getAllLoans(tinlake, loansCount) {
  const loans = [];
  for (let loanId = 0; loanId < loansCount; loanId += 1) {
    const loan = await tinlake.getLoan(loanId);

    loans[loanId] = loan;
  }
  return loans;
}

export async function getTinlakeData() {
  const tinlake = await getTinlake();

  const loanCountBn: BN = await tinlake.loanCount();

  const allLoans = await getAllLoans(tinlake, loanCountBn.toNumber());

  try {
    const TotalDebt = await getTotalDept(tinlake, allLoans);
    console.log(`TotalDebt is ${TotalDebt}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }

  // console.log(TotalDebt);
  // const TotalBalance = await tinlake.contracts.pile.Balance();
  // const TotalValueofNFTs = await tinlake.contracts.shelf.bags();
  //
  // const TotalSupply = await tinlake.contracts.collateral.totalSupply();
  //
  //
  //
  // const data = {
  //  total_debt: Number(TotalDebt[0].toString()),
  //  total_balance: Number(TotalBalance[0].toString()),
  //  total_value_of_nfts: Number(TotalValueofNFTs[0].toString()),
  //  total_supply: Number(TotalSupply[0].toString()),
  //  number_of_loans: Number(NumberOfLoans[0].toString()),
  // };
  //
  // return data;
}
