// scripts/deploy.js
async function main() {
    // 1. Get the contract to deploy
    const MyToken = await ethers.getContractFactory('MyToken');
    console.log('Deploying MyToken...');
 
    // 2. Instantiating a new Box smart contract
    const mytoken = await MyToken.deploy();
 
    // 3. Waiting for the deployment to resolve
    await mytoken.deployed();
 
    // 4. Use the contract instance to get the contract address
    console.log('MyToken deployed to:', mytoken.address);
 }
 
 main()
    .then(() => process.exit(0))
    .catch((error) => {
       console.error(error);
       process.exit(1);
    });