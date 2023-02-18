// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "./messages/BurnMessage.sol";
import "./messages/Message.sol";

contract Transporter is Ownable {
    ERC20Burnable token; 
    
    constructor(address token_addr) {
        token = ERC20Burnable(token_addr);
    }

    function depositForBurn(uint256 amount,bytes32 mintRecipient) public {
        token.burnFrom(msg.sender, amount);

        /*bytes memory _burnMessage =*/ BurnMessage._formatMessage(
            1,
            Message.addressToBytes32(address(token)),
            mintRecipient,
            amount,
            Message.addressToBytes32(msg.sender)
        );

    }
}