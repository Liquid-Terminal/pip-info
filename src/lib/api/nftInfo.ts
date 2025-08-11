import { HyperScanNFTResponse, HyperScanNFTInfo } from "@/lib/types/nft";

const HYPERSCAN_API_BASE = "https://www.hyperscan.com/api/v2";

export class HyperScanAPI {
  private static async makeRequest<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${HYPERSCAN_API_BASE}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("HyperScan API error:", error);
      throw error;
    }
  }

  static async getNFTCollectionDetails(contractAddress: string): Promise<HyperScanNFTResponse> {
    return this.makeRequest<HyperScanNFTResponse>(`/tokens/${contractAddress}`);
  }

  static formatNFTInfo(response: HyperScanNFTResponse): HyperScanNFTInfo {
    return {
      address: response.address,
      name: response.name,
      symbol: response.symbol,
      totalSupply: response.total_supply,
      holdersCount: response.holders_count,
      type: response.type,
    };
  }
}
