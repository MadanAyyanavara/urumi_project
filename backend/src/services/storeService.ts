import { storeStore } from "../models/storeStore";
import { Store, StoreType } from "../models/store";
import { helmService } from "./helmService";

const MAX_STORES = 5; // basic guardrail

export const storeService = {
  async createStore(id: string, type: StoreType = "woocommerce", description: string = ""): Promise<Store> {
    const existing = storeStore.get(id);
    if (existing) {
      return existing; // idempotent retry
    }

    if (storeStore.getAll().length >= MAX_STORES) {
      throw new Error("store limit exceeded");
    }

    const domain = `${id}.localtest.me`;

    // Feature 2 & 3: Basic NLP for config
    // In a real GenAI app, we'd send 'description' to an LLM to get a JSON config.
    // Here we do simple keyword matching.
    const enableSidecar = description.toLowerCase().includes("agent") || description.toLowerCase().includes("ai");

    const store: Store = {
      id,
      type,
      namespace: id,
      domain,
      status: "PROVISIONING",
      createdAt: new Date().toISOString(),
      description,
      agentSidecarEnabled: enableSidecar
    };

    storeStore.save(store);

    const dbPassword = Math.random().toString(36).slice(-8);
    const rootPassword = Math.random().toString(36).slice(-8);

    try {
      await helmService.installStore(id, domain, type, dbPassword, rootPassword, enableSidecar);
      storeStore.update(id, { status: "READY" });
    } catch (err: any) {
      // Feature 1: "Smart" Auto-Healing Capture
      // We capture the error message as a log for potential analysis
      storeStore.update(id, {
        status: "FAILED",
        logs: [err.toString(), "Check pod events for OOMKilled or CrashLoopBackOff"]
      });
      throw err;
    }

    return storeStore.get(id)!;
  },

  listStores(): Store[] {
    return storeStore.getAll();
  },

  async deleteStore(id: string): Promise<void> {
    const existing = storeStore.get(id);
    if (!existing) return;

    // Fire-and-forget: Remove from DB immediately so UI updates.
    // Infrastructure cleanup happens in background.
    storeStore.delete(id);

    try {
      console.log(`[backend] Triggering helm uninstall for ${id}...`);
      await helmService.uninstallStore(id);
      console.log(`[backend] Helm uninstall for ${id} complete.`);
    } catch (err: any) {
      console.warn(`[backend] Error cleaning up infra for ${id} (record already deleted):`, err.toString());
      // No need to re-throw or re-delete, it's already gone.
    }
  }

};
