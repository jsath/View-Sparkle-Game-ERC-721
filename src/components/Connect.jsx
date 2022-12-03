import React, { useEffect, useState } from 'react'
import '../styles.css'
import Passes from './Passes';
import { Alchemy, Network } from "alchemy-sdk";
const openSea = require('../opensea.png');

const Connect = (props) => {

    //state variables for wallet address and users founders passes
    const [walletAddress, setWalletAddress] = useState("");
    const [tokens, setTokens] = useState([])

    //alchemy config 
    const settings = {
        apiKey: "ENTER ALCHEMY API KEY HERE",
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

return (
    <>
    {
    tokens[0] ? 
    <>
    <h4> { tokens[0].description }</h4>
    </>
    : ''
    }
    {
        tokens.length>1?
        <>
        <h1>Founders Passes</h1>
        <Passes tokens={tokens}/>
        </>
        :
        <>
        <h3>No Founders Passes found</h3>  
        <a href='https://opensea.io/collection/sparkle-game-founders-pass' target="_blank" rel="noopener noreferrer"><button className='button'><img src={openSea} width='60vw'/></button></a>
        </>
    }
    </>
)
}

export default Connect
