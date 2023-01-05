// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  
  const Users = await hre.ethers.getContractFactory("Users")
  const users = await Users.deploy()

  await users.deployed()

  const DProduct = await hre.ethers.getContractFactory("DProduct")
  const dProduct = await DProduct.deploy()

  await dProduct.deployed()

  const FProduct = await hre.ethers.getContractFactory("FProduct")
  const fProduct = await FProduct.deploy(users.address)

  await fProduct.deployed()
  
  const Market = await hre.ethers.getContractFactory("Market")
  const market = await Market.deploy(1)

  await market.deployed()
  
  // For each contract, pass the deployed contract and name to this function to 
  // save a copy of the contract ABI and address to the front end.
  saveFrontendFiles(users, "Users")
  saveFrontendFiles(dProduct, "DProduct")
  saveFrontendFiles(fProduct, "FProduct")
  saveFrontendFiles(market, "Market")
}


function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../client/src/contractsData";
  
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
