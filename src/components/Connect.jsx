import React, { useEffect, useState } from 'react'
import '../styles.css'
import { Alchemy, Network } from "alchemy-sdk";
import Metamask from './Metamask';
import View from './View';


const Connect = (props) => {

    //state variables for wallet address and users founders passes
    const [walletAddress, setWalletAddress] = useState("");
    const [tokens, setTokens] = useState([])

    //alchemy config 
    const settings = {
        apiKey: process.env.REACT_APP_ALCHEMY_KEY,
        network: Network.ETH_MAINNET,
    };
    const connection = new Alchemy(settings);

    //getting all nfts owner by user then filtering the data so it's only sparkle game assets 
    const fetchnfts = async () => {
        const nfts = await connection.nft.getNftsForOwner(walletAddress);
        const filtered = nfts.ownedNfts.filter((nft) => {return nft.contract.address === "0xdb66fb508855035a237e4eb642c6d52d13d1a0c2"});
        setTokens(filtered)
    };

    //triggering get account with use effect to make sure variables are updated if accounts are switched
    useEffect(() => {
        getAccount()
    }, [walletAddress]);

    async function getAccount() { 
        if(typeof window.ethereum !== 'undefined'){
        try {
            const accounts = await window.ethereum.request({
            method: "eth_requestAccounts", 
            });
            setWalletAddress(accounts[0]);
        } catch(error) {
            console.log('Error connecting to MetaMask');
        }
        }

        fetchnfts()
    }

    //updating accounts when changed
    if(typeof window.ethereum !== 'undefined'){
        window.ethereum.on('accountsChanged', async function (accounts) {
            if(window.ethereum){
            try {
                const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
                });
                setWalletAddress(accounts[0]);
            } catch (error) {
                alert('Error connecting to MetaMask');
            }
            }
        })
    }

    const btnStyle = {
        backgroundColor: "rgb(0, 33, 65)",
        color: "rgb(255,255,255)",
        borderRadius: "25px",
        height: "50px", 
        width: "200px",
        fontSize: "22px"
    };

return (
    <>
    {
        walletAddress ?
        <View tokens={tokens}/>
        :
        <div>
            <Metamask/>
            <button onClick={getAccount} style={btnStyle}>Connect Wallet</button>
        </div>
    }

    </>
)
}

export default Connect
