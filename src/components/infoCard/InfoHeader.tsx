import Image from "next/image";

interface TokenHeaderProps {
  tokenInfo: {
    name: string;
    description: string;
    banner: string;
    tokenInfo: {
      symbol: string;
    };
  };
}

export function TokenHeader({ tokenInfo }: TokenHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Image
          src="/pending.jpg"
          alt="PIP Logo"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <h2 className="text-lg text-white">{tokenInfo.name}</h2>
      </div>
      <p className="text-xs text-white mb-3">{tokenInfo.description}</p>
      
      {/* Banner */}
      <div className="relative w-full h-32 rounded-md overflow-hidden mb-4">
        <Image
          src="/bannerInfoCard.jpg"
          alt={`${tokenInfo.name} Banner`}
          fill
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
