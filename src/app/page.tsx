import Hero from "./components/Hero";
import ScrollDown from "./components/Shared/ScrollDown";
// import Wallets from "./components/WalletsNew";
import Wallets from "./components/Wallets";
import TokenUtility from "./components/TokenUtility";
import FAQ from "./components/FAQ";
import Testimonial from "./components/Testimonial";
import ContentWrapper from "./components/Wrappers/ContentWrapper";
import BlogPost from "./components/BlogPost";
import {RainBowProviders} from "./components/Wrappers/rainbowKitWrapper"

export default function Home() {
  return (
    <>
      <RainBowProviders>
      <ContentWrapper>
        <Hero />
        <ScrollDown />
        <Wallets />
        <TokenUtility />
        <FAQ />
      </ContentWrapper>
      </RainBowProviders>
      <Testimonial />
      <BlogPost />
    </>
  );
}
