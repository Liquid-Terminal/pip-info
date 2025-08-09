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

  static async getHolders(tokenName: string, limit: number = 1000): Promise<HoldersResponse> {
    return this.makeRequest<HoldersResponse>(`/holdersWithLimit/${tokenName}/${limit}`);
  }

  static formatHoldersData(response: HoldersResponse): Holder[] {
    const totalSupply = Object.values(response.holders).reduce((sum, balance) => sum + balance, 0);
    
    return Object.entries(response.holders)
      .map(([address, balance], index) => ({
        address: this.formatAddress(address),
        balance,
        percentage: (balance / totalSupply) * 100,
        rank: index + 1,
      }))
      .sort((a, b) => b.balance - a.balance) // Trier par balance décroissante
      .slice(0, 10); // Prendre les 10 premiers
  }

  private static formatAddress(address: string): string {
    if (address === "0x0000000000000000000000000000000000000000") {
      return "Dead Wallet";
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
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


