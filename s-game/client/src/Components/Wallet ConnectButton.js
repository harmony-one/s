import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnectButton = () => {
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        // Check for wallet address in local storage when the component mounts
        const savedWalletAddress = localStorage.getItem('walletAddress');
        if (savedWalletAddress) {
            setWalletAddress(savedWalletAddress);
        }
    }, []);

    const connectWalletHandler = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();

                setWalletAddress(address);
                localStorage.setItem('walletAddress', address);  // Store in local storage
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('Please install MetaMask');
        }
    };

    return (
        <div>
            <button onClick={connectWalletHandler}>
                {walletAddress ? 'Connected: ' + walletAddress : 'Connect Wallet'}
            </button>
        </div>
    );
};

export default WalletConnectButton;
