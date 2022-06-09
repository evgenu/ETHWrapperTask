require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy", "Deploys the contract", async (taskArgs, hre) => {
  const lime = await hre.run("deploy-contract");
  console.log("LimeCoin deployed to:", lime.address);
});

task("run-task", "Tasks from the learning path", async () => {
  const [deployer] = await hre.ethers.getSigners();
  const client = {address: "0x465b2b6CC578268BA33f24A7e151D144b0E44D29"}
  const lime = await hre.run("deploy-contract");

  console.log("-----Deployer and client balance-----");
  const value = await lime.balanceOf(deployer.address)
  console.log("Deployer's balance: ", await lime.balanceOf(deployer.address));
  console.log("Client's balance:   ", await lime.balanceOf(client.address));

  console.log("-----Transfering 1.43LMT to client-----");
  const amountForTransfer = new hre.ethers.BigNumber.from(1430);
  lime.transfer(client.address, amountForTransfer.mul(10**15));
  console.log("Deployer's balance: ", await lime.balanceOf(deployer.address));
  console.log("Client's balance:   ", await lime.balanceOf(client.address));

  console.log("-----Burn the remaining 0.57LMT-----");
  lime.burn(new hre.ethers.BigNumber.from("570000000000000000"));
  console.log("Deployer's balance: ", await lime.balanceOf(deployer.address));
  console.log("Client's balance:   ", await lime.balanceOf(client.address));

})

subtask("deploy-contract", "Deploys the contract")
  .setAction(async () => {
    await hre.run('compile');
    const ContractFactory = await hre.ethers.getContractFactory("LimeToken");
    const contractForDeployment = await ContractFactory.deploy();

    await contractForDeployment.deployed();

    return contractForDeployment;
  })

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
};
