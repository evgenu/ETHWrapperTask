const { ethers } = require("ethers");
const ETHWrapper = require('./build/ETHWrapper.json');
const WETH = require('./build/WETH.json')


const run = async function() {

	const providerURL = "http://localhost:8545";
	const walletPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
	const wrapperContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

	const provider = new ethers.providers.JsonRpcProvider(providerURL);
	
	const wallet = new ethers.Wallet(walletPrivateKey, provider);

	const wrapperContract = new ethers.Contract(wrapperContractAddress, ETHWrapper.abi, wallet);

	const wethAddress = await wrapperContract.getWETHToken(); 

	const tokenContract = new ethers.Contract(wethAddress, WETH.abi, wallet)

	const wrapValue = ethers.utils.parseEther("1");

	const wrapTx = await wallet.sendTransaction({to: wrapperContractAddress, value: wrapValue});
	await wrapTx.wait();

	let balance = await tokenContract.balanceOf(wallet.address);
	console.log("Balance after wrapping:", balance.toString());

	let contractETHBalance = await provider.getBalance(wrapperContractAddress);
	console.log("Contract ETH balance after wrapping:", contractETHBalance.toString());

	const approveTx = await tokenContract.approve(wrapperContractAddress, wrapValue);
	await approveTx.wait();

	const unwrapTx = await wrapperContract.unwrap(wrapValue);
	await unwrapTx.wait();

	balance = await tokenContract.balanceOf(wallet.address);
	console.log("Balance after unwrapping:", balance.toString());

	contractETHBalance = await provider.getBalance(wrapperContractAddress);
	console.log("Contract ETH balance after unwrapping:", contractETHBalance.toString());

}

run()