import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Button } from '@mui/material';


const WalletConnectButton = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [myOTP, setMyOTP] = useState('');

    useEffect(() => {
        const savedWalletAddress = localStorage.getItem('walletAddress');
        if (savedWalletAddress) {
            setWalletAddress(savedWalletAddress);
            setMyOTP(savedWalletAddress.substring(savedWalletAddress.length - 4));
        }
    }, []);

    const connectWalletHandler = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                const otp = address.substring(address.length - 4);

                setWalletAddress(address);
                setMyOTP(otp);
                localStorage.setItem('myOTP', otp);
                localStorage.setItem('walletAddress', address);

                const event = new Event('myOTPUpdated');
                window.dispatchEvent(event);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('Please install MetaMask');
        }
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={connectWalletHandler}>
                Connect Wallet
            </Button>
        </div>
    );
};

export default WalletConnectButton;
