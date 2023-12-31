package main

import (
	"bufio"
	"context"
	"crypto/ecdsa"
	"fmt"
	"log"
	"math/big"
	"os"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

const (
	rpcURL  = "https://api.s0.t.hmny.io" // Harmony Mainnet RPC URL (shard 0)
	chainID = int64(1666600000)          // Harmony Mainnet Chain ID
)

func main() {
	privateKey := promptForPrivateKey()
	safeAddress := promptForAddress("Enter Gnosis Safe contract address: ")
	action := promptForChoice("Choose an action:\n1) Send Tokens\n2) Check Balance\n")

	switch action {
	case "1":
		sendTokens(privateKey, safeAddress)
	case "2":
		checkBalance(safeAddress)
	default:
		fmt.Println("Invalid choice. Exiting.")
	}
}

func promptForPrivateKey() *ecdsa.PrivateKey {
	privateKeyString := promptForInput("Enter your private key: ")
	privateKey, err := crypto.HexToECDSA(privateKeyString)
	if err != nil {
		log.Fatalf("Failed to parse private key: %v", err)
	}
	return privateKey
}

func promptForAddress(prompt string) common.Address {
	addressString := promptForInput(prompt)
	return common.HexToAddress(addressString)
}

func promptForInput(prompt string) string {
	reader := bufio.NewReader(os.Stdin)
	fmt.Print(prompt)
	input, _ := reader.ReadString('\n')
	return strings.TrimSpace(input)
}

func promptForChoice(prompt string) string {
	return promptForInput(prompt)
}

// Placeholder function with standard token ABI
func getERC20ABI() (abi.ABI, error) {
	const erc20ABI = `[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
    {"payable":true,"stateMutability":"payable","type":"fallback"}]`

	return abi.JSON(strings.NewReader(erc20ABI))
}

func sendTokens(privateKey *ecdsa.PrivateKey, safeAddress common.Address) {
	tokenAddress := promptForAddress("Enter the token contract address: ")
	recipient := promptForAddress("Enter recipient address: ")
	amount := promptForBigInt("Enter amount to send: ")

	client, err := ethclient.Dial(rpcURL)
	if err != nil {
		log.Fatalf("Failed to connect to the Harmony blockchain: %v", err)
	}
	defer client.Close()

	// Read Gnosis Safe contract ABI
	file, err := os.ReadFile("GnosisSafe.json")
	if err != nil {
		log.Fatalf("Failed to read ABI file: %v", err)
	}

	gnosisABI, err := abi.JSON(strings.NewReader(string(file)))
	if err != nil {
		log.Fatalf("Failed to parse ABI: %v", err)
	}

	tokenABI, err := getERC20ABI()
	if err != nil {
		log.Fatalf("Failed to get ERC20 ABI: %v", err)
	}

	// Prepare the data for the token transfer
	tokenData, err := tokenABI.Pack("transfer", recipient, amount)
	if err != nil {
		log.Fatalf("Failed to pack data for token transfer: %v", err)
	}

	// Prepare the parameters for execTransaction
	to := tokenAddress
	value := big.NewInt(0) // For token transfer, value is 0
	data := tokenData
	operation := big.NewInt(0)         // Call operation
	safeTxGas := big.NewInt(0)         // TODO: Need to set
	baseGas := big.NewInt(0)           // TODO: Need to set
	gasToken := common.Address{}       // Address of the token to use for gas payment (0x0 for ETH)
	refundReceiver := common.Address{} // Address to receive refund (0x0 for no refund)

	// Convert the public key to a public address
	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		log.Fatal("Cannot assert type: publicKey is not of type *ecdsa.PublicKey")
	}
	fromAddress := crypto.PubkeyToAddress(*publicKeyECDSA)

	// Fetch the current gas price from the network
	gasPrice, err := client.SuggestGasPrice(context.Background())
	if err != nil {
		log.Fatalf("Failed to get gas price: %v", err)
	}

	// Fetch the current nonce for the fromAddress
	nonce, err := client.PendingNonceAt(context.Background(), fromAddress)
	if err != nil {
		log.Fatalf("Failed to get nonce: %v", err)
	}

	// Pack the data for execTransaction
	execData, err := gnosisABI.Pack("execTransaction", to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, nonce)
	if err != nil {
		log.Fatalf("Failed to pack data for execTransaction: %v", err)
	}

	// Create a new auth for the transaction
	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(chainID))
	if err != nil {
		log.Fatalf("Failed to create authorized transactor: %v", err)
	}
	auth.Nonce = big.NewInt(int64(nonce))
	auth.Value = big.NewInt(0)      // The value is 0 for contract calls
	auth.GasLimit = uint64(3000000) // TODO: Set the gas limit
	auth.GasPrice = gasPrice

	// Create the transaction
	tx := types.NewTransaction(nonce, safeAddress, auth.Value, auth.GasLimit, auth.GasPrice, execData)

	// Sign the transaction
	signedTx, err := types.SignTx(tx, types.NewEIP155Signer(big.NewInt(chainID)), privateKey)
	if err != nil {
		log.Fatalf("Failed to sign transaction: %v", err)
	}

	// Send the transaction
	err = client.SendTransaction(context.Background(), signedTx)
	if err != nil {
		log.Fatalf("Failed to send transaction: %v", err)
	}

	fmt.Printf("Transaction sent: %s\n", signedTx.Hash().Hex())
}

func promptForBigInt(prompt string) *big.Int {
	amountString := promptForInput(prompt)
	amount, _ := new(big.Int).SetString(amountString, 10)
	return amount
}

func checkBalance(safeAddress common.Address) {
	client, err := ethclient.Dial(rpcURL)
	if err != nil {
		log.Fatalf("Failed to connect to the Harmony blockchain: %v", err)
	}
	defer client.Close()

	balance, err := client.BalanceAt(context.Background(), safeAddress, nil)
	if err != nil {
		log.Fatalf("Failed to retrieve balance: %v", err)
	}

	fmt.Printf("Balance of the safe: %s\n", balance.String())
}
