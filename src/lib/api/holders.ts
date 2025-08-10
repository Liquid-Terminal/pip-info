import { HoldersResponse, Holder } from "@/lib/types/token";

const HOLDERS_API_BASE = "https://api.hypurrscan.io";

export class HoldersAPI {
  private static async makeRequest<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${HOLDERS_API_BASE}${endpoint}`, {
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
      console.error("Holders API error:", error);
      throw error;
    }
  }

  static async getHolders(tokenName: string): Promise<HoldersResponse> {
    return this.makeRequest<HoldersResponse>(`/holders/${tokenName}`);
  }

  static formatHoldersData(response: HoldersResponse): Holder[] {
    const totalSupply = Object.values(response.holders).reduce((sum, balance) => sum + balance, 0);
    
    return Object.entries(response.holders)
      .map(([address, balance]) => ({
        address: this.formatAddress(address),
        balance,
        percentage: (balance / totalSupply) * 100,
      }))
      .sort((a, b) => b.balance - a.balance) // Trier par balance décroissante
      .map((holder, index) => ({
        ...holder,
        rank: index + 1, // Rank calculé après le tri
      }));
  }

  static getPaginatedHolders(holders: Holder[], page: number, itemsPerPage: number): Holder[] {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return holders.slice(startIndex, endIndex);
  }

  private static formatAddress(address: string): string {
    if (address === "0x0000000000000000000000000000000000000000") {
      return "Dead Wallet";
    }
    return address; // Retourne l'adresse complète
  }

  static formatBalance(balance: number): string {
    if (balance >= 1000000) {
      return `${(balance / 1000000).toFixed(2)}M`;
    } else if (balance >= 1000) {
      return `${(balance / 1000).toFixed(2)}K`;
    } else {
      return balance.toFixed(2);
    }
  }
}


