const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="w-full flex flex-col px-[84px] gap-[80px]">{children}</div>;
};

export default ContentWrapper;
