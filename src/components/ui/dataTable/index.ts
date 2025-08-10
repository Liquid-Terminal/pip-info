// Point d'entrée unique pour DataTable modulaire
export { DataTable } from "./DataTable";

// Export des types pour l'API publique
export type { DataTableProps, ColumnConfig } from "./types";

// Export des composants pour usage avancé si besoin
export { TableHeader } from "./components/TableHeader";
export { AddressCell } from "./components/AddressCell";
export { DataTableBody } from "./components/TableBody";
export { TableFooter } from "./components/TableFooter";

// Export du hook pour usage custom
export { useDataTable } from "./hooks/useDataTable";

// Export des utils
export { renderDefaultCell } from "./utils/cellRenderers";
