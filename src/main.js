const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate('7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf');

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const ViraCoin = new Blockchain();

// Mine block
ViraCoin.minePendingTransactions(myWalletAddress);
console.log(`Balance of Vahid is ${ViraCoin.getBalanceOfAddress(myWalletAddress)}`);



// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 45);
tx1.signTransaction(myKey);
ViraCoin.addTransaction(tx1);
console.log(`Balance of Vahid is ${ViraCoin.getBalanceOfAddress(myWalletAddress)}`);

// Mine block
ViraCoin.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 75);
tx2.signTransaction(myKey);
ViraCoin.addTransaction(tx2);
console.log(`Balance of Vahid is ${ViraCoin.getBalanceOfAddress(myWalletAddress)}`);

// Mine block
ViraCoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(`Balance of Vahid is ${ViraCoin.getBalanceOfAddress(myWalletAddress)}`);

// Uncomment this line if you want to test tampering with the chain
// savjeeCoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', ViraCoin.isChainValid() ? 'Yes' : 'No');
