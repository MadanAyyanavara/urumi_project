export type StoreStatus = "PROVISIONING" | "READY" | "FAILED";
export type StoreType = "woocommerce" | "medusa";

export interface Store {
  id: string;
  type: StoreType;
  namespace: string;
  domain: string;
  status: StoreStatus;
  createdAt: string;

  // Feature 1: "Smart" Auto-Healing with RCA
  logs?: string[]; // Simplified: last 10 error lines for LLM analysis

  // Feature 2: Natural Language Store Provisioning
  description?: string; // "high-performance store for flash sale"

  // Feature 3: Sidecar Status
  agentSidecarEnabled?: boolean;
}
