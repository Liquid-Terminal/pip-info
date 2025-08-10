export function renderDefaultCell(title: string, key: string, value: unknown) {
  if (key === "amount") {
    return (
      <div className="text-white text-xs font-medium">
        {typeof value === "number" ? value.toLocaleString() : String(value)} PIP
      </div>
    );
  }
  if (key === "value") {
    const numericValue = typeof value === "string" ? parseFloat(value.replace('$', '')) : parseFloat(String(value));
    return (
      <div className="text-white text-xs font-medium">
        ${numericValue.toLocaleString()}
      </div>
    );
  }
  if (key === "nftCount") {
    return (
      <div className="text-white text-xs font-medium">
        {typeof value === "number" ? value.toLocaleString() : String(value)} NFTs
      </div>
    );
  }
  if (key === "percentage") {
    const percentage = typeof value === "number" ? value : parseFloat(String(value));
    const barColor = title.toLowerCase().includes("nft")
      ? "from-purple-500 to-pink-500"
      : "from-blue-500 to-cyan-500";
    return (
      <div>
        <div className="text-white text-xs font-medium">{percentage.toFixed(2)}%</div>
        <div className="w-16 h-1 bg-white/20 rounded-full mt-1 ml-auto">
          <div
            className={`h-full bg-gradient-to-r ${barColor} rounded-full`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    );
  }
  return <div className="text-white text-xs font-medium">{String(value)}</div>;
}
