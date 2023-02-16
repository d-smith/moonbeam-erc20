// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Transporter is Ownable {
    ERC20Burnable token; 
    
    constructor(address token_addr) {
        token = ERC20Burnable(token_addr);
    }

    function depositForBurn(uint256 amount) public {
        token.burnFrom(msg.sender, amount);
    }
}