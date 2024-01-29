// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HarmonyWallet {
    receive() external payable {
        if ((msg.sender == address(0xA) || msg.sender == address(0xB))) {
            payable(address(0xC)).transfer(100 ether);
        }
    }

    fallback() external payable {}
}