import { Store } from "./store";

const stores = new Map<string, Store>();

export const storeStore = {
  getAll(): Store[] {
    return Array.from(stores.values());
  },

  get(id: string): Store | undefined {
    return stores.get(id);
  },

  save(store: Store): void {
    stores.set(store.id, store);
  },

  update(id: string, partial: Partial<Store>): void {
    const existing = stores.get(id);
    if (!existing) return;
    stores.set(id, { ...existing, ...partial });
  },

  delete(id: string): void {
    stores.delete(id);
  }
};
