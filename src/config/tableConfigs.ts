import { ColumnConfig } from "@/components/ui/DataTable";
import { Holder } from "@/lib/types/token";
import { NFTHolder } from "@/lib/types/nft";

// Configuration pour les colonnes du tableau Token Holders
export const tokenColumns: ColumnConfig[] = [
  {
    key: 'address',
    label: 'Address',
    width: 'w-1/2',
    align: 'left',
  },
  {
    key: 'amount',
    label: 'Amount',
    width: 'w-1/6',
    align: 'right',
  },
  {
    key: 'value',
    label: 'Value',
    width: 'w-1/6',
    align: 'right',
  },
  {
    key: 'percentage',
    label: '% Held',
    width: 'w-1/6',
    align: 'right',
  },
];

// Configuration pour les colonnes du tableau NFT Holders
export const nftColumns: ColumnConfig[] = [
  {
    key: 'address',
    label: 'Address',
    width: 'w-1/2',
    align: 'left',
  },
  {
    key: 'nftCount',
    label: 'NFT Count',
    width: 'w-1/4',
    align: 'right',
  },
  {
    key: 'percentage',
    label: '% Held',
    width: 'w-1/4',
    align: 'right',
  },
];

// Fonctions pour extraire l'adresse des données
export const getTokenAddress = (row: Holder): string => row.address;
export const getNFTAddress = (row: NFTHolder): string => row.address;
