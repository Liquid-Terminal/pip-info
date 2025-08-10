import { NFTHolder } from "@/lib/types/nft";

interface ServerNFTResponse {
  holders: NFTHolder[];
  totalHolders: number;
  totalNFTs: number;
  lastUpdated: string;
  pagination: {
    page: number;
    itemsPerPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

export class NFTHoldersServerAPI {
  private static async makeRequest<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(endpoint, {
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
      console.error("NFT Holders Server API error:", error);
      throw error;
    }
  }

  static async getHolders(
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<ServerNFTResponse> {
    const endpoint = `/api/nft-holders?page=${page}&itemsPerPage=${itemsPerPage}`;
    return this.makeRequest<ServerNFTResponse>(endpoint);
  }

  static async getAllHolders(): Promise<NFTHolder[]> {
    const endpoint = "/api/nft-holders-csv";
    const response = await this.makeRequest<{ holders: NFTHolder[] }>(endpoint);
    return response.holders;
  }

  static formatNFTCount(count: number): string {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(2)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(2)}K`;
    } else {
      return count.toString();
    }
  }
}
