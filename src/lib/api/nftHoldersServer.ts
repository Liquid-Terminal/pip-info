import { NFTHolder } from "@/lib/types/nft";
import { NFTHoldersProcessor } from "./nftHoldersProcessor";

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
  static async getHolders(
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<ServerNFTResponse> {
    try {
      // Récupérer et traiter les données CSV
      const allData = await NFTHoldersProcessor.fetchAndProcessCSV();
      
      // Paginer les résultats
      const paginatedData = NFTHoldersProcessor.paginateHolders(allData.holders, page, itemsPerPage);
      
      return {
        holders: paginatedData.holders,
        totalHolders: allData.totalHolders,
        totalNFTs: allData.totalNFTs,
        lastUpdated: allData.lastUpdated,
        pagination: paginatedData.pagination,
      };
    } catch (error) {
      console.error("NFT Holders Server API error:", error);
      throw error;
    }
  }

  static async getAllHolders(): Promise<NFTHolder[]> {
    try {
      const allData = await NFTHoldersProcessor.fetchAndProcessCSV();
      return allData.holders;
    } catch (error) {
      console.error("NFT Holders Server API error:", error);
      throw error;
    }
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
