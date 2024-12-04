"use client";

import { useState } from "react";
import { useWertWidget } from "@wert-io/module-react-component";
import type {
  GeneralOptions,
  ReactiveOptions,
  SmartContractOptions,
} from "@wert-io/module-react-component";
import Web3 from "web3";
import { Buffer } from "buffer";

if (typeof window !== "undefined") {
  (window as any).Buffer = Buffer; // Needed to use `signSmartContractData` in the browser
}

interface WertWidgetButtonProps {
  partnerId: string;
  privateKey: string;
  scAddress: string;
  //   scInputData: string;
  commodityAmount: number;
  className?: string;
}

const WertWidgetButton: React.FC<WertWidgetButtonProps> = ({
  partnerId,
  privateKey,
  scAddress,
  //   scInputData,
  commodityAmount,
  className = "",
}) => {
  // Define widget options


  let userAddress = "0x2Ba1Bf6aB49c0d86CDb12D69A777B6dF39AB79D9";
  const web3 = new Web3(window.ethereum);
  const NETWORK = 'arbitrum_sepolia' as const;
  const COMMODITY = 'ETH' as const;

  const scInputData = web3.eth.abi.encodeFunctionCall(
    {
      inputs: [
        {
          internalType: "enum NodeType",
          name: "nodeType",
          type: "uint8",
        },
      ],
      name: "mintNodeLicenseWithNative",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    [0]
  );

  
  // Define smart contract options
  const smartContractOptions: SmartContractOptions = {
    address: userAddress, // This will be set from connected wallet
    commodity: COMMODITY,
    network: NETWORK,
    commodity_amount: commodityAmount,
    sc_address: scAddress,
    sc_input_data: scInputData,
    private_key: privateKey,
  };

  const nftOptions = {
    item_info: {
      author: 'Saturn',
      image_url: 'https://gateway.pinata.cloud/ipfs/QmeJ5BX1zwsdiDDhAm8BAzNAG2XjrSXQPrPGPy842UaJ4W',
      name: 'Validator Node',
      seller: 'Saturn',
      header: 'Saturn Node Sale'
    },
}
  

  const generalOptions: GeneralOptions = {
    partner_id: partnerId,
    click_id: crypto.randomUUID(), // Generate unique ID for tracking
    origin: "https://sandbox.wert.io", // Use this for sandbox environment
    extra: nftOptions
  };

  // Define reactive options for the widget
  const [reactiveOptions] = useState<ReactiveOptions>({
    theme: "dark",
    listeners: {
      loaded: () => console.log("Widget loaded"),
      "payment-status": (status) => console.log("Payment status:", status),
      close: () => console.log("Widget closed"),
    },
  });

  // Initialize the widget hook
  const { open: openWertWidget, isWidgetOpen } = useWertWidget(reactiveOptions);

  // Handle widget opening
  const handleOpenWidget = async () => {
    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed");
      }

      // Get user's address
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Open widget with combined options
      openWertWidget({
        options: generalOptions,
        smartContractOptions: {
          ...smartContractOptions,
          address: accounts[0],
        },
      });

      console.log("Widget state:", isWidgetOpen);
    } catch (error) {
      console.error("Failed to open Wert widget:", error);
      alert(
        "Failed to connect wallet. Please ensure MetaMask is installed and try again."
      );
    }
  };

  const buttonClasses = `${className} w-full bg-[#5538CE] text-white rounded-[48px] px-4 py-2 flex justify-center items-center leading-[48px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4428BE] transition-colors`;

  return (
    <button
      onClick={handleOpenWidget}
      disabled={isWidgetOpen}
      className={buttonClasses}
    >
      {isWidgetOpen ? "Processing..." : "Make A Purchase"}
    </button>
  );
};

export default WertWidgetButton;
