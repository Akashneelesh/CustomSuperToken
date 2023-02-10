// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {SuperTokenBase} from "./base/SuperTokenBase.sol";

/// @title Mintable Pure Super Token
/// @author jtriley.eth
/// @notice Only the owner may mint
contract OurSuperToken is SuperTokenBase, Ownable {
	
    /// @notice Initializer, used AFTER factory upgrade
	/// @param factory Super token factory for initialization
    /// @param name Name of Super Token
    /// @param symbol Symbol of Super Token
    function initialize(
		address factory,
		string memory name,
		string memory symbol,
		uint256 initialSupply,
		address receiver,
		bytes memory userData
	) external {
		_initialize(factory, name, symbol);
		_mint(receiver, initialSupply, userData);
	}

	
	function mint(address receiver, uint256 amount, bytes memory userData) external onlyOwner {
		_mint(receiver, amount, userData);
	}

    function totalSupply() external view returns (uint t) {
        _totalSupply();

    }
    function approve(address account,address spender,uint256 amount) external {
        _approve(account, spender, amount);
    }

    function transferFrom(address holder,address spender, address recipient,uint256 amount) external {
        _transferFrom(holder,spender,recipient,amount);
    }

    function burn(uint256 amount, bytes memory userData) external {
        _burn(msg.sender,amount,userData);
    }


}
