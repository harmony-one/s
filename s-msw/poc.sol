/**
* @title MSW
* @dev TestContractLock
* @custom:dev-run-script foo.sol
*/
pragma solidity ^0.8.0;

contract HarmonyWallet {
    address public owner;
    uint256 public constant withdrawalAmount = 100 ether;

    constructor(address _owner) {
        owner = _owner;
    }

    receive() external payable {
        if (msg.sender == owner && msg.value == 0 && address(this).balance >= withdrawalAmount) {
            payable(owner).transfer(withdrawalAmount);
        }
    }

    fallback() external payable {}

    function checkBalance() public view returns (uint256) {
        return address(this).balance;
    }
}