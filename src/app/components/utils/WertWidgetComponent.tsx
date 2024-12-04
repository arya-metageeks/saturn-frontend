'use client';

import React, { useMemo,useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import WertWidget from '@wert-io/widget-initializer';
import type { Options } from '@wert-io/widget-initializer/types';
import Web3 from 'web3';

interface WertWidgetProps {
  partnerId: string;
  amount: string;
}

const PROTECTED_ADDRESS = '0xB07e4d3d6aFC46852E6FC10931f93132b5dB124a' as const;
const NETWORK = 'arbitrum_sepolia' as const;
const COMMODITY = 'ETH' as const;

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

const WertWidgetComponent: React.FC<WertWidgetProps> = ({
  partnerId,
  amount,
}) => {
  const sc_input_data = useMemo(() => getEncodedFunctionData(), []);
  const [isLoading, setIsLoading] = useState(false);
  const initializeWidget = () => {
    const options: Readonly<Options> = Object.freeze({
      partner_id: partnerId,
      click_id: uuidv4(),
      origin: 'https://sandbox.wert.io',
      commodity: COMMODITY,
      network: NETWORK,
      theme: "dark",
      address: PROTECTED_ADDRESS,
      sc_address:PROTECTED_ADDRESS,
      sc_input_data: sc_input_data,
      is_address_editable: false,
      skip_init_navigation: true, // Skip the initial address input screen
      commodities: JSON.stringify([
        {
          commodity: COMMODITY,
          network: NETWORK,
        },
      ]),
      currency_amount: Number(amount),
    });

    const wertWidget = new WertWidget(options);
    wertWidget.open();
  };

  return (
    <div className="w-full flex justify-center">
     <button 
  onClick={initializeWidget} 
  className="w-full bg-[#5538CE] hover:bg-[#4428BE] transition-colors text-white rounded-[48px] px-4 py-2 flex justify-center items-center leading-[48px] group" 
  disabled={isLoading}
> 
  {/* When not loading, show Buy Now */}
  {!isLoading ? (
    'Buy Now'
  ) : (
    // When loading, show Loading... and handle hover for Coming Soon
    <>
      <span className="group-hover:hidden">Loading...</span>
      <span className="hidden group-hover:inline">Coming Soon</span>
    </>
  )}
</button>

    </div>
  );
};

export default WertWidgetComponent;