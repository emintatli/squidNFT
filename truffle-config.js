const HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {  
  contracts_build_directory:"./public/contracts",

  networks: {

    bsc: { 
      provider: () => new HDWalletProvider("ritual little buffalo tobacco anchor lunch wing tube tower color private solve", `https://bsc-dataseed3.binance.org`),
      network_id: 56,
      gasPrice:5000000000
    },
    bsctestnet: { 
      provider: () => new HDWalletProvider("ritual little buffalo tobacco anchor lunch wing tube tower color private solve", `https://data-seed-prebsc-1-s1.binance.org:8545/`),
      network_id: 97,
      gasPrice:5000000000
    },
  },


  compilers: {
    solc: {
      version: "0.8.4", 
    }
  },
  plugins: [  
    'truffle-plugin-verify'
  ],
  api_keys: {
    bscscan: "J8BN8SJQKDSFZBWCD4RKV2RH3KWAMC5KWN"
  }

};
