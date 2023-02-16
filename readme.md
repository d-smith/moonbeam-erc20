# moonbeam erc20

Fun with ERC 20

Bootstrap the project: 

* npm init -y
* npm install hardhat
* npx hardhat (select empty config file option)
* npm install @nomiclabs/hardhat-ethers ethers

Create the contract:

* mkdir contracts
* touch contracts/Token.sol
* Generate the contract using the [Open Zeppelin Wizard](https://wizard.openzeppelin.com/)

* Create a secrets.json and a deploy script. This project uses files configured to leverage the moonbeam dev network.
* update hardhad config for secrets, network config
*  npm install @openzeppelin/contracts
* npx hardhat compile
* npx hardhat run --network dev scripts/deploy.js
* npm install @nomicfoundation/hardhat-network-helpers