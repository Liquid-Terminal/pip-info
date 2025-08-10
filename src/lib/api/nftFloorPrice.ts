import { NFTFloorPriceResponse } from "@/lib/types/nft";

export class NFTFloorPriceAPI {
  private static async makeRequest<T>(): Promise<T> {
    try {
      const response = await fetch('/api/nft-floor-price', {
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
      console.error("NFT Floor Price API error:", error);
      throw error;
    }
  }

  static async getFloorPrice(): Promise<NFTFloorPriceResponse> {
    return this.makeRequest<NFTFloorPriceResponse>();
  }
}
