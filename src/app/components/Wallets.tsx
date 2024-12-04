"use client";
import React, { useState, useEffect, useRef } from "react";
import upgradeableContractAbi from "./utils/abi/upgradableContract.json";
import usdtContractAbi from "./utils/abi/usdt.json";
import {
  btcValue,
  walletValue,
  listPrice,
  nextPrice,
  balance,
} from "./constant";
import { ethers } from "ethers";
import BoxWrapper from "./Wrappers/BoxWrapper";
import data from "../data/dummyJson.json";
import ethImage from "../../images/ethNewIcon.png";
import cardImage from "../../images/card-round.png";
import usdtImage from "../../images/usdt-round.png";
import ListContainer from "./Shared/ListContainer";
import ProgressBar from "./Shared/ProgressBar";
import SelectBox from "./Shared/SelectBox";
import Logo from "../../images/icon.svg";
import UIIcon from "../../images/respIcon.svg";
import WalletConnectButton from "./utils/button";
import WertWidgetComponent from "./utils/WertWidgetComponent";
// import NftWertWidgetComponent from "./utils/NftWerWidgetComponent";
import { useAccount, useWalletClient } from "wagmi";
import NewWertWidgetComponent from "./utils/NewWertWidget";
import NewNftWertWidgetButton from "./utils/NewNftWidget";
import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";
// import NftWertWidgetComponent from './utils/reactNftWidget'
const NftWertWidgetComponent = dynamic(() => import("./utils/reactNftWidget"), {
  ssr: false,
});

interface TokenCalculationResponse {
  tokenAmount: string;
  usdValue: string;
  ethPrice: string;
  saturnTokenPrice: string;
}
interface SelectOption {
  label: string;
  value: string;
  image: any; // The type for the image URL or image source
}
const selectOptions: SelectOption[] = [
  { label: "ETH", value: "eth", image: ethImage },
  { label: "CARD", value: "card", image: cardImage },
  { label: "USDT", value: "usdt", image: usdtImage },
];
const Wallets: React.FC = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [amount, setAmount] = useState<string | string>("0");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("eth"); // Default to "UPI"
  const [tokenAmount, setTokenAmount] = useState<string | null>(null);
  const [nodePriceUSDT, setNodePriceUSDT] = useState<string | null>(null);
  const [nodePriceNative, setNodePriceNative] = useState<string | null>(null);
  const [ethPrice, setEthPrice] = useState<string | null>("0");
  const [responseData, setResponseData] =
    useState<TokenCalculationResponse | null>(null); // Store response data
  const wertPartnerId = process.env.NEXT_PUBLIC_WERT_PARTNER_ID!;
  const nftPartnerId = process.env.NEXT_PUBLIC_NFT_PARTNER_ID!;
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };
  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
  };

  const saturnNodeSBT_ABI = [
    // Minimal ABI for fetching node prices
    {
      inputs: [],
      name: "nodePrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "nodePriceNative",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  const saturnNodeContractAddress =
    "0xE91FFBDD609531Bcef75EcB5c21c294aAc514904";
  
    const saturnTokenContractAddress =
    "0xE91FFBDD609531Bcef75EcB5c21c294aAc514904";

  const provider = new ethers.BrowserProvider(window.ethereum);
  const saturnNodeContract = new ethers.Contract(
    saturnNodeContractAddress,
    saturnNodeSBT_ABI,
    provider
  );

  const port = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
  useEffect(() => {
    if (
      amount === "" ||
      amount === undefined ||
      selectedPaymentMethod === undefined
    )
      return;
    const fetchData = async () => {
      try {
        const requestData = {
          selectedPaymentMethod,
          ethAmount:
            selectedPaymentMethod === "eth" ? Number(amount) : undefined,
          usdtAmount:
            selectedPaymentMethod === "usdt" || selectedPaymentMethod === "card"
              ? Number(amount)
              : undefined,
        };
        const response = await axios.post<TokenCalculationResponse>(
          `${port}/api/calculate-tokens`,
          requestData
        );
        console.log(response.data);
        if (
          selectedPaymentMethod === "card" ||
          selectedPaymentMethod === "usdt"
        ) {
          setEthPrice(amount);
        } else {
          setEthPrice(response.data.ethPrice);
        }
        setTokenAmount(response.data.tokenAmount);
        setResponseData(response.data);

        const nodePriceUSDT = await saturnNodeContract.nodePrice(); // USDT price (6 decimals)
        const nodePriceNative = await saturnNodeContract.nodePriceNative(); // Native token price (18 decimals)
        setNodePriceUSDT(nodePriceUSDT)
        setNodePriceNative(nodePriceNative)
        // Format prices for display
        const formattedNodePrice = ethers.formatUnits(nodePriceUSDT, 6); // USDT (6 decimals)
        const formattedNodePriceNative = ethers.formatEther(nodePriceNative); // Native token (18 decimals)

        console.log("Node Price (USDT):", formattedNodePrice);
        console.log("Node Price (Native Token):", formattedNodePriceNative);
      } catch (error) {
        console.error("Error calculating tokens:", error);
      }
    };

    // Trigger the fetchData function to call the API
    fetchData();
  }, [amount, selectedPaymentMethod]);
  const handleTokenMinting = async () => {
    const ArbicontractAddress =
      process.env.NEXT_PUBLIC_UPGRADABLECONTRACT_ADDRESS!;
    const usdtAddress = process.env.NEXT_PUBLIC_USDT_ADDRESS!;
    const contractABI = upgradeableContractAbi;
    const usdtABI = usdtContractAbi;
    if (!contractABI || !address || !usdtABI) {
      setLoader(false);
      return;
    }
    try {
      if (!walletClient) {
        setLoader(false);
        return;
      }
      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        ArbicontractAddress,
        contractABI,
        signer
      );
      if (selectedPaymentMethod === "eth") {
        let buyAmount = ethers.parseEther(amount);
        console.log("Buy Amount:", buyAmount);
        let txn = await contract.buyTokensNative({ value: buyAmount });
        await txn.wait();
      } else if (selectedPaymentMethod === "usdt") {
        try {
          const usdtContract = new ethers.Contract(
            usdtAddress,
            usdtABI,
            signer
          );
          let buyAmount = ethers.parseUnits("1", 6);
          console.log("Contract Addresses:", {
            USDT: usdtAddress,
            Presale: ArbicontractAddress,
          });
          // Check USDT balance
          const balance = await usdtContract.balanceOf(address);
          console.log("USDT Balance:", ethers.formatUnits(balance, 6));
          // Check allowance
          const currentAllowance = await usdtContract.allowance(
            address,
            ArbicontractAddress
          );
          console.log(
            "Current Allowance:",
            ethers.formatUnits(currentAllowance, 6)
          );
          if (balance < buyAmount) {
            throw new Error(
              `Insufficient USDT balance. Required: ${ethers.formatUnits(
                buyAmount,
                6
              )}, Available: ${ethers.formatUnits(balance, 6)}`
            );
          }
          // Always approve before purchase to ensure sufficient allowance
          console.log("Approving USDT spend...");
          let buyAmount1 = ethers.parseUnits("1", 6);
          const approveTxn = await usdtContract.approve(
            ArbicontractAddress,
            buyAmount1
          );
          console.log("Approval tx sent:", approveTxn.hash);
          await approveTxn.wait();
          console.log("Approval confirmed");
          // Verify allowance after approval
          const newAllowance = await usdtContract.allowance(
            address,
            ArbicontractAddress
          );
          console.log("New Allowance:", ethers.formatUnits(newAllowance, 6));
          // Purchase tokensconst walletValue: string = "$7,607,841";
          console.log("Sending purchase transaction...");
          const purchaseTxn = await contract.buyTokensUSDT(buyAmount, {
            gasLimit: 300000, // Add explicit gas limit
          });
          console.log("Purchase tx sent:", purchaseTxn.hash);
          await purchaseTxn.wait();
          console.log("Purchase confirmed");
        } catch (error: any) {
          if (error.code === "ACTION_REJECTED") {
            throw new Error("Transaction was rejected by user");
          } else if (error.message.includes("insufficient")) {
            throw new Error("Insufficient USDT balance");
          } else {
            throw error;
          }
        }
      }
      setLoader(false);
    } catch (error: any) {
      console.error("Transaction failed:", error);
      let errorMessage = "Transaction failed";
      if (error.code === "ACTION_REJECTED") {
        errorMessage = "Transaction rejected by user";
      } else if (error.message.includes("insufficient")) {
        errorMessage = "Insufficient balance";
      } else if (error.message.includes("user rejected")) {
        errorMessage = "User rejected the transaction";
      }
      setError(errorMessage);
      setLoader(false);
    }
  };
  return (
    <section className="w-full flex justify-center">
      <BoxWrapper title="Recent Active Wallets">
        <ListContainer items={data} />
      </BoxWrapper>
      <div className="h-full flex flex-col justify-end min-h-[650px]">
        <UIIcon />
      </div>
      <BoxWrapper title="">
        <div className="w-full h-full flex flex-col gap-4">
          <div className="w-full rounded-2xl bg-[#eaeaea] p-[30px]">
            <div className="flex text-black justify-between items-center pb-4 font-bold">
              <p>Person is Live</p>
              <p>
                <span className="text-[#008000] text-xs">Raised: </span>
                {walletValue}
              </p>
            </div>
            <ProgressBar completed="70" />
            <h1 className="font-semibold text-3xl text-black mt-5 text-center">
              {btcValue}
            </h1>
          </div>
          <div className="w-full rounded-2xl bg-[#eaeaea] px-[30px] py-[15px] flex justify-center items-center gap-9 font-bold">
            <div className="flex gap-[43px]">
              <p className="text-[#556FF5]">Listing Price</p>
              <p className="text-[#000]">{listPrice}</p>
            </div>
            <div className="flex gap-[43px]">
              <p className="text-[#556FF5]">Next Price</p>
              <p className="text-[#000]">{nextPrice}</p>
            </div>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <div className="flex flex-col">
              <p className="text-[#556ff5] font-bold text-[16px] pb-3">
                Select a Payment Method
              </p>
              <SelectBox
                options={selectOptions}
                onChange={handlePaymentMethodChange}
              />
            </div>
            <div className="w-full flex flex-col">
              <div className="w-full flex items-center justify-between">
                <p className="text-[#556ff5] font-bold text-[16px] pb-3">
                  USD cost
                </p>
                <p className="text-[#556ff5] font-bold text-[16px] pb-3">
                  ${ethPrice}
                </p>
              </div>
              <div className="w-full flex items-center justify-between font-bold appearance-none bg-[#EAEAEA] text-black rounded-[48px] py-5 ps-[30px]">
                {selectedPaymentMethod !== "eth" ? (
                  <span>$</span> // Display the dollar symbol if selectedPaymentMethod is not "eth"
                ) : (
                  <span className="mr-1">
                    <Image
                      src={ethImage} // USDT (Tether) icon
                      alt="eth"
                      width={25}
                      height={25}
                    />
                  </span>
                )}
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="bg-transparent border-none text-black outline-none"
                  min="0"
                  step="1"
                  onInput={(e) => {
                    const inputElement = e.target as HTMLInputElement; // Type assertion
                    if (parseInt(inputElement.value) < 0) {
                      inputElement.value = "0"; // Update the value to '0'
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-2">
            {selectedPaymentMethod !== "card" && (
              <>
                {address && (
                  <button
                    onClick={handleTokenMinting}
                    className="w-full bg-[#5538CE] text-white rounded-[48px] px-4 py-2 flex justify-center items-center leading-[48px]"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Buy Now
                  </button>
                )}
                {
                  <div className="w-full flex justify-center items-center">
                    <WalletConnectButton />
                  </div>
                }
              </>
            )}
          </div>
          <div className="w-full flex justify-center">
            {selectedPaymentMethod === "card" && (
              <WertWidgetComponent 
              partnerId={nftPartnerId}
              privateKey="0x57466afb5491ee372b3b30d82ef7e7a0583c9e36aef0f02435bd164fe172b1d3"
              scAddress= {saturnTokenContractAddress}
              // scInputData=""
              commodityAmount={1}
              className="w-72 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
            />            )}
          </div>
          {/* <div className="w-full flex justify-center">
            {selectedPaymentMethod === "card" && (
              <NewWertWidgetComponent
                partnerId="01JD5CYSF61XNZWPPV6ZYB965M"
                amount={amount}
              />
            )}
          </div> */}
          {/* <div className="w-full flex justify-center">
            <NftWertWidgetComponent
              partnerId={nftPartnerId}
              amount={amount}
              privateKey="0x57466afb5491ee372b3b30d82ef7e7a0583c9e36aef0f02435bd164fe172b1d3" />
          </div> */}
          <div className="w-full flex justify-center">
            <NftWertWidgetComponent
              partnerId={nftPartnerId}
              privateKey="0x57466afb5491ee372b3b30d82ef7e7a0583c9e36aef0f02435bd164fe172b1d3"
              scAddress= {saturnNodeContractAddress}
              // scInputData=""
              commodityAmount={0.001}
              className="w-72 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
            />
          </div>
          {/* <div className="w-full flex justify-center">
            <NewNftWertWidgetButton
              partnerId="01JD5CYSF61XNZWPPV6ZYB965M"
              amount={amount}
              privateKey="0x57466afb5491ee372b3b30d82ef7e7a0583c9e36aef0f02435bd164fe172b1d3"
            />
          </div> */}
          <div className="w-full">
            <div className="flex justify-between items-center">
              <p className="text-[#556ff5] font-bold text-[16px] pb-3">
                Balance
              </p>
              <p className="text-[#556ff5] font-bold text-[16px] pb-3">
                {balance}
              </p>
            </div>
            <div className="w-full flex items-center justify-between font-bold appearance-none bg-[#EAEAEA] text-black rounded-[48px] py-5 ps-[30px] pr-12 ">
              <Logo color="#000" />
              <span>{tokenAmount}</span>
            </div>
          </div>
        </div>
      </BoxWrapper>
    </section>
  );
};
export default Wallets;
