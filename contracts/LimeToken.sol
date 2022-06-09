// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";


contract LimeToken is ERC20Burnable {

	constructor() ERC20("LimeToken", "LMT") {
		uint numberOfTokens = 2;
		_mint(msg.sender, numberOfTokens * 10**uint(decimals()));
	}

}