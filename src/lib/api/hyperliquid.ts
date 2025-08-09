import { HyperLiquidTokenRequest, HyperLiquidTokenResponse, TokenInfo } from "@/lib/types/token";

const HYPERLIQUID_API_BASE = "https://api.hyperliquid.xyz";

export class HyperLiquidAPI {
  private static async makeRequest<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${HYPERLIQUID_API_BASE}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("HyperLiquid API error:", error);
      throw error;
    }
  }

  static async getTokenDetails(tokenId: string): Promise<HyperLiquidTokenResponse> {
    const request: HyperLiquidTokenRequest = {
      tokenId,
      type: "tokenDetails",
    };

    return this.makeRequest<HyperLiquidTokenResponse>("/info", request);
  }

  static formatTokenInfo(response: HyperLiquidTokenResponse): TokenInfo {
    const priceChange24h = ((parseFloat(response.markPx) - parseFloat(response.prevDayPx)) / parseFloat(response.prevDayPx) * 100).toFixed(2);
    
    return {
      name: response.name,
      symbol: response.name,
      price: `$${parseFloat(response.markPx).toFixed(4)}`,
      marketCap: `$${(parseFloat(response.markPx) * parseFloat(response.circulatingSupply)).toLocaleString()}`,
      totalSupply: parseFloat(response.totalSupply).toLocaleString(),
      circulatingSupply: parseFloat(response.circulatingSupply).toLocaleString(),
      deployTime: new Date(response.deployTime).toLocaleDateString(),
      deployer: response.deployer,
      priceChange24h: `${priceChange24h}%`,
    };
  }
}
