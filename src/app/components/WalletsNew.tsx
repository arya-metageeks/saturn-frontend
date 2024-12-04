"use client";

import React, { useState, useEffect } from "react";
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
import NewNftWertWidgetButton from "./utils/NewNftWidget";
import { useAccount, useWalletClient } from "wagmi";
import Image from "next/image";

// Define constants
const SATURN_TOKEN_PRICE = 0.005; // Token price in USD

interface SelectOption {
  label: string;
  value: string;
  image: any;
}

const selectOptions: SelectOption[] = [
  { label: "ETH", value: "eth", image: ethImage },
  { label: "CARD", value: "card", image: cardImage },
  { label: "USDT", value: "usdt", image: usdtImage },
];

const Wallets: React.FC = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [amount, setAmount] = useState<string>("0");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("eth");
  const [tokenAmount, setTokenAmount] = useState<string>("0");
  const [ethPrice, setEthPrice] = useState<string>("0");
  const wertPartnerId = process.env.NEXT_PUBLIC_WERT_PARTNER_ID!;

  const fetchEthPrice = async (): Promise<number> => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const data = await response.json();
      return data.ethereum.usd;
    } catch (error) {
      console.error("Error fetching ETH price:", error);
      return 0;
    }
  };

  const calculateTokens = async (inputAmount: string, paymentMethod: string) => {
    if (!inputAmount || isNaN(Number(inputAmount)) || Number(inputAmount) <= 0) {
      setTokenAmount("0");
      setEthPrice("0");
      return;
    }

    try {
      const numericAmount = Number(inputAmount);

      if (paymentMethod === "eth") {
        const currentEthPrice = await fetchEthPrice();
        const usdValue = numericAmount * currentEthPrice;
        const calculatedTokens = usdValue / SATURN_TOKEN_PRICE;
        
        setTokenAmount(calculatedTokens.toFixed(2));
        setEthPrice(usdValue.toFixed(2));
      } else {
        // For USDT and card payments, amount is already in USD
        const calculatedTokens = numericAmount / SATURN_TOKEN_PRICE;
        setTokenAmount(calculatedTokens.toFixed(2));
        setEthPrice(numericAmount.toFixed(2));
      }
    } catch (error) {
      console.error("Error calculating tokens:", error);
      setTokenAmount("0");
      setEthPrice("0");
    }
  };

  useEffect(() => {
    calculateTokens(amount, selectedPaymentMethod);
  }, [amount, selectedPaymentMethod]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
    setAmount("0");
  };

  const handleTokenMinting = async () => {
    const ArbicontractAddress = process.env.NEXT_PUBLIC_UPGRADABLECONTRACT_ADDRESS!;
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

          // Approve USDT spend
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

          // Purchase tokens
          console.log("Sending purchase transaction...");
          const purchaseTxn = await contract.buyTokensUSDT(buyAmount, {
            gasLimit: 300000,
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
                  <span>$</span>
                ) : (
                  <span className="mr-1">
                    <Image
                      src={ethImage}
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
                {!address && (
                  <div className="w-full flex justify-center items-center">
                    <WalletConnectButton />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="w-full flex justify-center">
            {selectedPaymentMethod === "card" && (
              <WertWidgetComponent partnerId={wertPartnerId} amount={amount} />
            )}
          </div>
          <div className="w-full flex justify-center">
            <NewNftWertWidgetButton
              partnerId="01JD5CYSF61XNZWPPV6ZYB965M"
              amount={amount}
            />
          </div>
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