import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  sepolia,
  arbitrumSepolia
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: "1f523ad7e1f77e5ca2bf9847f4c56952",
  chains: [
    // arbitrum,
    arbitrumSepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [arbitrumSepolia] : []),
  ],
  ssr: true,
});