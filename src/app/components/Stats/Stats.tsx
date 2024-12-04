import Bitcoin from "../../../images/coinIcons/bitcoin.svg";
import Ethereum from "../../../images/coinIcons/eth.svg";
import LiteCoin from "../../../images/coinIcons/litecoin.svg";
import UpwardGraph from "../../../images/graph/upward.svg";
import DownwardGraph from "../../../images/graph/lower.svg";
import { StatsProps } from "@/app/interfaces/Stats";
import StatCard from "../Shared/StatCard";

const tokens = [
  {
    coinType: "BTC",
    graph: <UpwardGraph />,
    coinIcon: <Bitcoin />,
    amount: "$21,495.12",
    count: "2.54 BTC",
    gain: "+1.5%",
  },
  {
    coinType: "BTC",
    graph: <DownwardGraph />,
    coinIcon: <Ethereum />,
    amount: "$21,495.12",
    count: "2.54 BTC",
    gain: "+1.5%",
  },
  {
    coinType: "BTC",
    graph: <UpwardGraph />,
    coinIcon: <LiteCoin />,
    amount: "$21,495.12",
    count: "2.54 BTC",
    gain: "+1.5%",
  },
  {
    coinType: "BTC",
    graph: <DownwardGraph />,
    coinIcon: <Ethereum />,
    amount: "$21,495.12",
    count: "2.54 BTC",
    gain: "+1.5%",
  },
  {
    coinType: "BTC",
    graph: <UpwardGraph />,
    coinIcon: <LiteCoin />,
    amount: "$21,495.12",
    count: "2.54 BTC",
    gain: "+1.5%",
  },
  {
    coinType: "BTC",
    graph: <UpwardGraph />,
    coinIcon: <Bitcoin />,
    amount: "$21,495.12",
    count: "2.54 BTC",
    gain: "+1.5%",
  },
];

const Stats = () => {
  return (
    <ul
      role="list"
      className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-16"
    >
      {tokens.map((token: StatsProps, index: number) => {
        const { coinType, coinIcon, graph, amount, count, gain } = token;
        return (
          <StatCard
            coinIcon={coinIcon}
            coinType={coinType}
            graph={graph}
            amount={amount}
            count={count}
            gain={gain}
            key={index}
          />
        );
      })}
    </ul>
  );
};

export default Stats;
