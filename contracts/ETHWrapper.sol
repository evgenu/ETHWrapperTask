// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
pragma abicoder v2;

import "./WETH.sol";

contract ETHWrapper {

	WETH public WETHToken;

	event LogETHWrapped(address sender, uint256 amount);
	event LogETHUnwrapped(address sender, uint256 amount);

	receive() external payable {
		wrap();
	}

	fallback() external payable {
		wrap();
	} 

	constructor() {
		WETHToken = new WETH();
	}

	function wrap() public payable {
		require(msg.value > 0, "There must be at least 1 wei");
		WETHToken.mint(msg.sender, msg.value);
		emit LogETHWrapped(msg.sender, msg.value);
	}

	function unwrap(uint value) public payable{
		require(value > 0, "There must be at least 1 wei");
		WETHToken.transferFrom(msg.sender, address(this), value);
		WETHToken.burn(value);
		payable(msg.sender).transfer(value);
		emit LogETHUnwrapped(msg.sender, msg.value);
	}

	function getWETHToken() public view returns(WETH) {
		return WETHToken;
	}

}