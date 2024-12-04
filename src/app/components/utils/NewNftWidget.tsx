import React, { useState } from 'react';
import WertWidget from '@wert-io/widget-initializer';
import type { Options } from '@wert-io/widget-initializer/types';
import { signSmartContractData } from '@wert-io/widget-sc-signer';
import { v4 as uuidv4 } from 'uuid';
import Web3 from 'web3';

import { Buffer } from 'buffer';

window.Buffer = Buffer; // needed to use `signSmartContractData` in browser
interface WertWidgetButtonProps {
  partnerId: string;
  privateKey: string;
  amount: string;
}
const userAddress = "0x0E976df9bb3ac63F7802ca843C9d121aE2Ef22ee"
const web3 = new Web3(window.ethereum);
const sc_input_data = web3.eth.abi.encodeFunctionCall(
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'numberOfTokens',
        type: 'uint256',
      },
    ],
    name: 'mintNFT',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  [userAddress, 1]
);
const WertWidgetButton: React.FC<WertWidgetButtonProps> = ({ partnerId, privateKey, amount }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const signedData = signSmartContractData(
        {
          address: userAddress, // user's address
          commodity: 'POL',
          commodity_amount: Number(amount), // the crypto amount that should be sent to the contract method
          network: 'amoy',
          sc_address: '0xAAC496808A678B834073FB3435857FdcF0dc186F', // your SC address
          sc_input_data,
        },
        privateKey
      );
      // Prepare options for signing
      const nftOptions: Options['extra'] = {
        item_info: {
          author: 'Wert',
          image_url: 'http://localhost:8765/sample_nft.png',
          name: 'Wert Sample NFT',
          seller: 'Wert',
          header: 'Wert Sample header'
        },
      };
      const otherWidgetOptions: Options = {
        partner_id: '01GCRJZ1P7GP32304PZCS6RSPD', // your partner id
        click_id: uuidv4(), // unique id of purhase in your system
        origin: 'https://sandbox.wert.io', // this option needed only in sandbox
        extra: nftOptions,
      };

      const wertWidget = new WertWidget({
        ...signedData,
        ...otherWidgetOptions,
      });
      // Open the widget for the user to complete the transaction
      wertWidget.open();

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('An error occurred during the signing process.');
      console.error(err);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full bg-[#5538CE] text-white rounded-[48px] px-4 py-2 flex justify-center items-center leading-[48px]"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {loading ? 'Processing...' : 'Buy NFT Now'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default WertWidgetButton;