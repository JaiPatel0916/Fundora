"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

const networks = {
  polygon: {
    chainId: "0x13882",
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

export default function Wallet() {
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

      if (Number(chainId) !== 80002) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{ ...networks["polygon"] }],
          });
        } catch (error) {
          console.error("Failed to switch network:", error);
          return;
        }
      }

      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      setAddress(addr);

      const bal = ethers.utils.formatEther(await provider.getBalance(addr));
      setBalance(bal);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div
      onClick={connectWallet}
      className="flex items-center space-x-2 cursor-pointer rounded-lg border-2 border-blue-600 dark:border-yellow-400 bg-white dark:bg-gray-800 px-3 py-1 hover:bg-blue-50 dark:hover:bg-yellow-900 transition-all text-sm font-semibold"
    >
      {balance && (
        <span className="hidden sm:inline-block text-blue-600 dark:text-yellow-400">
          {parseFloat(balance).toFixed(3)} POL
        </span>
      )}
      <span className="text-gray-800 dark:text-gray-100">
        {address
          ? `${address.slice(0, 6)}...${address.slice(-4)}`
          : "Connect Wallet"}
      </span>
    </div>
  );
}
