import { ReactNode } from "react";
export interface StatsProps {
    coinIcon: ReactNode;
    coinType: string;
    gain: string;
    count: string;
    amount: string;
    graph: ReactNode
}