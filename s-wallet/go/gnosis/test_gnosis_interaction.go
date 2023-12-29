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

func main() {
	reader := bufio.NewReader(os.Stdin)

	fmt.Print("Enter your private key: ")
	privateKeyString, _ := reader.ReadString('\n')
	privateKeyString = strings.TrimSpace(privateKeyString)
	privateKey, err := crypto.HexToECDSA(privateKeyString)
	if err != nil {
		log.Fatalf("Failed to parse private key: %v", err)
	}

	fmt.Print("Enter Gnosis Safe contract address: ")
	safeAddressString, _ := reader.ReadString('\n')
	safeAddressString = strings.TrimSpace(safeAddressString)
	safeAddress := common.HexToAddress(safeAddressString)

	// User choice
	fmt.Print("Choose an action:\n1) Send Tokens\n2) Check Balance\n")
	choiceString, _ := reader.ReadString('\n')
	choiceString = strings.TrimSpace(choiceString)

	if choiceString == "1" {
		// Proceed with token transfer
		sendTokens(reader, privateKey, safeAddress)
	} else if choiceString == "2" {
		// Check balance
		checkBalance(privateKey, safeAddress)
	} else {
		fmt.Println("Invalid choice. Exiting.")
	}
}

func sendTokens(reader *bufio.Reader, privateKey *ecdsa.PrivateKey, safeAddress common.Address) {
	fmt.Print("Enter recipient address: ")
	recipientString, _ := reader.ReadString('\n')
	recipientString = strings.TrimSpace(recipientString)
	recipient := common.HexToAddress(recipientString)

	fmt.Print("Enter amount to send: ")
	amountString, _ := reader.ReadString('\n')
	amountString = strings.TrimSpace(amountString)
	amount, _ := new(big.Int).SetString(amountString, 10)

	client, err := ethclient.Dial("https://api.harmony.one")
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
		log.Fatal(err)
	}

	gasPrice, err := client.SuggestGasPrice(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(1666600000)) // Harmony Mainnet Chain ID
	if err != nil {
		log.Fatal(err)
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
		log.Fatal(err)
	}

	// Send the transaction
	err = client.SendTransaction(context.Background(), signedTx)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Transaction sent: %s\n", signedTx.Hash().Hex())
}

func checkBalance(privateKey *ecdsa.PrivateKey, safeAddress common.Address) {
	client, err := ethclient.Dial("https://api.harmony.one")
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
