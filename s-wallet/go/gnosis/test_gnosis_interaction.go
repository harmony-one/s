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

func sendTokens(privateKey *ecdsa.PrivateKey, safeAddress common.Address) {
	recipient := promptForAddress("Enter recipient address: ")
	amount := promptForBigInt("Enter amount to send: ")

	client, err := ethclient.Dial(rpcURL)
	if err != nil {
		log.Fatalf("Failed to connect to the Harmony blockchain: %v", err)
	}
	defer client.Close()

	file, err := os.ReadFile("gnosis.json")
	if err != nil {
		log.Fatalf("Failed to read ABI file: %v", err)
	}

	parsedABI, err := abi.JSON(strings.NewReader(string(file)))
	if err != nil {
		log.Fatalf("Failed to parse ABI: %v", err)
	}

	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		log.Fatal("Cannot assert type: publicKey is not of type *ecdsa.PublicKey")
	}

	fromAddress := crypto.PubkeyToAddress(*publicKeyECDSA)
	nonce, err := client.PendingNonceAt(context.Background(), fromAddress)
	if err != nil {
		log.Fatal("Failed to generate fromAddress: %v", err)
	}

	gasPrice, err := client.SuggestGasPrice(context.Background())
	if err != nil {
		log.Fatal("Failed get gas price suggestion: %v", err)
	}

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(chainID))
	if err != nil {
		log.Fatal("Failed to generate contract binding: %v", err)
	}
	auth.Nonce = big.NewInt(int64(nonce))
	auth.Value = big.NewInt(0)      // in wei
	auth.GasLimit = uint64(3000000) // in units
	auth.GasPrice = gasPrice

	// Construct the transaction data
	data, err := parsedABI.Pack("transfer", recipient, amount)
	if err != nil {
		log.Fatalf("Failed to pack data for transfer: %v", err)
	}

	// Create the transaction
	tx := types.NewTransaction(nonce, safeAddress, big.NewInt(0), auth.GasLimit, gasPrice, data)

	// Sign the transaction
	chainID, err := client.NetworkID(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	signedTx, err := types.SignTx(tx, types.NewEIP155Signer(chainID), privateKey)
	if err != nil {
		log.Fatal("Failed to sign transaction: %v", err)
	}

	// Send the transaction
	err = client.SendTransaction(context.Background(), signedTx)
	if err != nil {
		log.Fatal(err)
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
