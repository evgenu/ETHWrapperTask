const hre = require('hardhat')
const ethers = hre.ethers;

async function EthWrapper() {
	const ETHWrapper = await ethers.getContractFactory("ETHWrapper");
    const ethWrapperContract = await ETHWrapper.deploy();
    console.log('Waiting for ETHWrapper deployment...');
    await ethWrapperContract.deployed();

    console.log("Deployed at: ", ethWrapperContract.address);


}

EthWrapper();
// module.exports = EthWrapper;