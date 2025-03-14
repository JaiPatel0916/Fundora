import { useState, useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";

const networks = {
  polygon: {
    chainId: "0x13882", // Corrected hexadecimal string
    chainName: "Polygon Amoy Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },
};

const Wallet = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await provider.getNetwork();

      if (Number(chainId) !== 80002) { // Ensuring correct chain ID check
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                ...networks["polygon"]
              }
            ],
          });
        } catch (error) {
          console.error("Failed to switch network:", error);
          return;
        }
      }

      const account = provider.getSigner();
      const Address = await account.getAddress();
      setAddress(Address);
      const Balance =ethers.utils.formatEther (await account.getBalance());
      setBalance(Balance)
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    
    <ConnectWalletWrapper onClick={connectWallet} >
      {balance == '' ? <Balance></Balance> : <Balance>{balance.slice(0, 4)}Pol</Balance>}
      {address == '' ? <Address>Connect Wallet</Address> : <Address>{address.slice(0, 6)}...{address.slice(39)}</Address>}
    </ConnectWalletWrapper>
  );
}; 

const ConnectWalletWrapper = styled.div`
display:flex;
align-items : center;
justify-content : space-between;
background-color:${(props) => props.theme.bgDiv};
padding: 5px 9px;
height:100%;
color:${(props) => props.theme.color};
border-radius: 5px;
margin-right: 15px;
font-family :'Roboto';
font-weight : bold;
font-size: small;

`;
const Address = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px; /* Adjusted height */
  min-width: 120px; /* Ensures consistency */
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 2px solid ${(props) => props.theme.mode === 'dark' ? "#00b7ff" : "#007bff"};
  color: ${(props) => props.theme.mode === 'dark' ? "#fff" : "#222"};
  background: ${(props) => props.theme.mode === 'dark' ? "#2A2A3A" : "#F5F5F5"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 3px 8px ${(props) => props.theme.mode === 'dark'
    ? "rgba(255, 255, 255, 0.2)"
    : "rgba(0, 0, 0, 0.15)"};
  }
`;
const Balance = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px; /* Adjusted height */
  min-width: 12px; /* Ensures consistency */
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 2px solid ${(props) => props.theme.mode === 'dark' ? "#00b7ff" : "#007bff"};
  color: ${(props) => props.theme.mode === 'dark' ? "#fff" : "#222"};
  background: ${(props) => props.theme.mode === 'dark' ? "#2A2A3A" : "#F5F5F5"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 3px 8px ${(props) => props.theme.mode === 'dark'
    ? "rgba(255, 255, 255, 0.2)"
    : "rgba(0, 0, 0, 0.15)"};
  }
`;
export default Wallet;

