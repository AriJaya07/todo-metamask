import { ethers } from "ethers";

export const connectMetaMask = async () => {
  if (typeof window.ethereum !== "undefined" && window.ethereum.request) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      return address;
    } catch (error) {
      console.error(error);
      return null;
    }
  } else {
    console.error("MetaMask not installed");
    return null;
  }
};

export const signMessage = async (message: any) => {
  if (typeof window.ethereum !== "undefined" && window.ethereum.request) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      return signature
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};
