// Token IDs pour différents projets
export const TOKEN_IDS = {
  PIP: "0xe85f43e1f91e3c8cdf3acbd7e0855b8e",
  // Ajouter d'autres tokens ici quand tu fork le projet
  // EXAMPLE: "0x1234567890abcdef...",
} as const;

// Noms de tokens pour l'API holders
export const TOKEN_NAMES = {
  PIP: "PIP",
  // Ajouter d'autres noms de tokens ici
  // EXAMPLE: "EXAMPLE",
} as const;

// Configuration API
export const API_CONFIG = {
  HYPERLIQUID_BASE_URL: "https://api.hyperliquid.xyz",
  HOLDERS_BASE_URL: "https://api.hypurrscan.io",
  REFRESH_INTERVAL: 30000, // 30 secondes pour les données token
  HOLDERS_REFRESH_INTERVAL: 600000, // 10 minutes pour les holders
} as const;
