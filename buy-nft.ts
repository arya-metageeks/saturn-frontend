import React, { useState, useEffect } from 'react';
import WertWidget from '@wert-io/widget-initializer';
import type { Options } from '@wert-io/widget-initializer/types';
import { signSmartContractData } from '@wert-io/widget-sc-signer';
import { v4 as uuidv4 } from 'uuid';
import Web3 from 'web3';
import { Buffer } from 'buffer';

// Set Buffer globally for browser compatibility
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

interface WertWidgetButtonProps {
  partnerId: string;
  privateKey: string;
  amount: string;
}

const WertWidgetButton: React.FC<WertWidgetButtonProps> = ({ partnerId, privateKey, amount }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string>('');
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [scInputData, setScInputData] = useState<string>('');

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          setUserAddress(accounts[0]);
          setWeb3(web3Instance);

          // Generate sc_input_data once we have the user address
          const inputData = web3Instance.eth.abi.encodeFunctionCall(
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
            [accounts[0], 1]
          );
          setScInputData(inputData);
        } catch (err) {
          setError('Failed to connect to MetaMask');
          console.error(err);
        }
      } else {
        setError('MetaMask is not installed');
      }
    };

    initializeWeb3();
  }, []);

  const handleClick = async () => {
    if (!web3 || !userAddress || !scInputData) {
      setError('Web3 not initialized');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const signedData = signSmartContractData(
        {
          address: userAddress,
          commodity: 'POL',
          commodity_amount: Number(amount),
          network: 'amoy',
          sc_address: '0xAAC496808A678B834073FB3435857FdcF0dc186F',
          sc_input_data: scInputData,
        },
        privateKey
      );

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
        partner_id: partnerId,
        click_id: uuidv4(),
        origin: 'https://sandbox.wert.io',
        extra: nftOptions,
      };

      const wertWidget = new WertWidget({
        ...signedData,
        ...otherWidgetOptions,
      });

      wertWidget.open();
    } catch (err) {
      setError('An error occurred during the signing process.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="w-full flex flex-col items-center gap-4">
  //     <button
  //       onClick={handleClick}
  //       disabled={loading || !web3}
  //       className="w-full bg-[#5538CE] text-white rounded-[48px] px-4 py-2 flex justify-center items-center leading-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
  //     >
  //       {loading ? 'Processing...' : 'Buy NFT Now'}
  //     </button>
  //     {error && <div className="text-red-500">{error}</div>}
  //   </div>
  // );
};

export default WertWidgetButton;