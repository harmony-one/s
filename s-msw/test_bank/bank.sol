// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    uint256 constant depositAmount = 1000 ether;
    mapping(bytes32 => uint256) private deposits;
    mapping(address => bytes32) private secretMessages;

    event DepositMade(address indexed depositor, uint256 amount, bytes32 secretMessage);

    receive() external payable {
        revert("Please use the deposit function.");
    }

    fallback() external payable {
        revert("Please use the deposit function.");
    }

    function deposit() external payable {
        require(msg.value == depositAmount, "You must deposit exactly 1000 ONE");

        // Generate a secret message (hash) based on the sender and transaction details
        bytes32 secretMessage = keccak256(abi.encodePacked(msg.sender, address(this), block.timestamp));
        secretMessages[msg.sender] = secretMessage;
        deposits[secretMessage] = msg.value;

        emit DepositMade(msg.sender, msg.value, secretMessage);
    }

    function withdraw(bytes32 secretMessage) external {
        uint256 amount = deposits[secretMessage];
        require(amount > 0, "No funds available for withdrawal");

        // Transfer funds to the caller
        payable(msg.sender).transfer(amount);
        deposits[secretMessage] = 0;  // Prevent re-entrancy attacks
    }

    function checkBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
O