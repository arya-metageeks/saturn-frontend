'use client';

import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import WertWidget from '@wert-io/widget-initializer';
import type { Options } from '@wert-io/widget-initializer/types';
import { signSmartContractData } from '@wert-io/widget-sc-signer';
import Web3 from 'web3';
import { Buffer } from 'buffer';

// Required for browser compatibility
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

interface WertWidgetProps {
  partnerId: string;
  amount: string;
}

// Constants
const NETWORK = 'arbitrum_sepolia' as const;
const COMMODITY = 'ETH' as const;
const SC_ADDRESS = '0xB07e4d3d6aFC46852E6FC10931f93132b5dB124a' as const;
const USER_ADDRESS = '0x2Ba1Bf6aB49c0d86CDb12D69A777B6dF39AB79D9' as const;
const PRIVATE_KEY = '0x57466afb5491ee372b3b30d82ef7e7a0583c9e36aef0f02435bd164fe172b1d3' as const;

const getEncodedFunctionData = () => {
  const web3 = new Web3(window.ethereum);
  return web3.eth.abi.encodeFunctionCall(
    {
      inputs: [],
      name: "buyTokensNative",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    []
  );
};

const NewWertWidgetComponent: React.FC<WertWidgetProps> = ({
  partnerId,
  amount,
}) => {
  const sc_input_data = useMemo(() => getEncodedFunctionData(), []);

  const initializeWidget = async () => {
    try {
      // Sign smart contract data
      const signedData = signSmartContractData(
        {
          address: USER_ADDRESS,
          commodity: COMMODITY,
          commodity_amount: Number(amount),
          network: NETWORK,
          sc_address: SC_ADDRESS,
          sc_input_data,
        },
        PRIVATE_KEY
      );

      // Create widget options
      const widgetOptions: Readonly<Options> = Object.freeze({
        ...signedData,
        partner_id: partnerId,
        click_id: uuidv4(),
        origin: 'https://sandbox.wert.io',
        theme: "dark",
        is_address_editable: false,
        commodities: JSON.stringify([
          {
            commodity: COMMODITY,
            network: NETWORK,
          },
        ]),
        currency_amount: Number(amount),
      });

      // Initialize and open widget
      const wertWidget = new WertWidget(widgetOptions);
      wertWidget.open();
    } catch (error) {
      console.error('Failed to initialize Wert widget:', error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={initializeWidget}
        className="w-full bg-[#5538CE] hover:bg-[#4428BE] transition-colors text-white rounded-[48px] px-4 py-2 flex justify-center items-center leading-[48px]"
      >
        Buy Now
      </button>
    </div>
  );
};

export default NewWertWidgetComponent;