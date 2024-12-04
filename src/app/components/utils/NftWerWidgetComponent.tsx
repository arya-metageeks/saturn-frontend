// import React, { useState } from 'react';
// import WertWidget from '@wert-io/widget-initializer';
// import type { Options } from '@wert-io/widget-initializer/types';
// import { signSmartContractData } from '@wert-io/widget-sc-signer';
// import { v4 as uuidv4 } from 'uuid';
// import Web3 from 'web3';

// import { Buffer } from 'buffer';

// // Ensure `window` is available before assigning
// if (typeof window !== 'undefined') {
//   (window as any).Buffer = Buffer; // Needed to use `signSmartContractData` in the browser
// }

// window.Buffer = Buffer; // needed to use `signSmartContractData` in browser
// interface WertWidgetButtonProps {
//   partnerId: string;
//   privateKey: string;
//   amount: string;
// }
// const userAddress = "0x0E976df9bb3ac63F7802ca843C9d121aE2Ef22ee"
// const web3 = new Web3(window.ethereum);
// const sc_input_data = web3.eth.abi.encodeFunctionCall(
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'to',
//         type: 'address',
//       },
//       {
//         internalType: 'uint256',
//         name: 'numberOfTokens',
//         type: 'uint256',
//       },
//     ],
//     name: 'mintNFT',
//     outputs: [],
//     stateMutability: 'payable',
//     type: 'function',
//   },
//   [userAddress, 1]
// );
// const WertWidgetButton: React.FC<WertWidgetButtonProps> = ({ partnerId, privateKey, amount }) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleClick = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const signedData = signSmartContractData(
//         {
//           address: userAddress, // user's address
//           commodity: 'POL',
//           commodity_amount: Number(amount), // the crypto amount that should be sent to the contract method
//           network: 'amoy',
//           sc_address: '0xAAC496808A678B834073FB3435857FdcF0dc186F', // your SC address
//           sc_input_data,
//         },
//         privateKey
//       );
//       // Prepare options for signing
//       const nftOptions: Options['extra'] = {
//         item_info: {
//           author: 'Wert',
//           image_url: 'http://localhost:8765/sample_nft.png',
//           name: 'Wert Sample NFT',
//           seller: 'Wert',
//           header: 'Wert Sample header'
//         },
//       };
//       const otherWidgetOptions: Options = {
//         partner_id: partnerId, // your partner id
//         click_id: uuidv4(), // unique id of purhase in your system
//         origin: 'https://sandbox.wert.io', // this option needed only in sandbox
//         extra: nftOptions,
//       };

//       const wertWidget = new WertWidget({
//         ...signedData,
//         ...otherWidgetOptions,
//       });
//       // Open the widget for the user to complete the transaction
//       wertWidget.open();

//       setLoading(false);
//     } catch (err) {
//       setLoading(false);
//       setError('An error occurred during the signing process.');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center">
//       <button
//         onClick={handleClick}
//         disabled={loading}
//         className="w-full bg-[#5538CE] text-white rounded-[48px] px-4 py-2 flex justify-center items-center leading-[48px]"
//         style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//       >
//         {loading ? 'Processing...' : 'Buy NFT Now'}
//       </button>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//     </div>
//   );
// };

// export default WertWidgetButton;


/* eslint-disable no-undef */
import WertWidget from '@wert-io/widget-initializer';
import type { Options } from '@wert-io/widget-initializer/types';
import { signSmartContractData } from '@wert-io/widget-sc-signer';
import { v4 as uuidv4 } from 'uuid';
import Web3 from 'web3';

import { Buffer } from 'buffer';

window.Buffer = Buffer; // needed to use `signSmartContractData` in browser

/* We advise you not to use the private key on the frontend
    It is used only as an example
*/

if (window.ethereum) {
  (async () => {
    // Get user address
    const userAccounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const web3 = new Web3(window.ethereum);
    const userAddress = userAccounts[0];
    // Encode the call to mintNFT(address = userAddress, numberOfTokens = 1)
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
    const privateKey =
      '0x57466afb5491ee372b3b30d82ef7e7a0583c9e36aef0f02435bd164fe172b1d3';
    // Create signed SC data for wert-widget
    // Please do this on backend
    const signedData = signSmartContractData(
      {
        address: userAddress, // user's address
        commodity: 'POL',
        commodity_amount: 10, // the crypto amount that should be sent to the contract method
        network: 'amoy',
        sc_address: '0xAAC496808A678B834073FB3435857FdcF0dc186F', // your SC address
        sc_input_data,
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
      partner_id: '01JD5CYSF61XNZWPPV6ZYB965M', // your partner id
      click_id: uuidv4(), // unique id of purhase in your system
      origin: 'https://sandbox.wert.io', // this option needed only in sandbox
      extra: nftOptions,
    };

    const wertWidget = new WertWidget({
      ...signedData,
      ...otherWidgetOptions,
    });

    wertWidget.open();
  })();
}
