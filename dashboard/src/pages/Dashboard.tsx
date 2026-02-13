import React from "react";

import { useEffect, useState } from "react";
import {
  fetchStores,
  createStore,
  deleteStore
} from "../api/stores";
import { StoreList } from "../components/StoreList";
import { CreateStoreModal } from "../components/CreateStoreModal";

export function Dashboard() {
  const [stores, setStores] = useState<any[]>([]);

  async function loadStores() {
    const data = await fetchStores();
    setStores(data);
  }

  async function handleCreate(id: string, type: string, description: string) {
    await createStore(id, type, description);
    loadStores();
  }

  async function handleDelete(id: string) {
    if (!confirm(`Are you sure you want to terminate deployment ${id}? This action is irreversible.`)) return;

    try {
      await deleteStore(id);
      loadStores();
    } catch (err: any) {
      alert(`Error terminating store: ${err.message}`);
    }
  }

  useEffect(() => {
    loadStores();
    const interval = setInterval(loadStores, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem", position: "relative" }}>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "4rem",
        paddingBottom: "1.5rem",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div style={{
            width: "56px",
            height: "56px",
            background: "var(--gradient-main)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            boxShadow: "var(--glow)"
          }}>🚀</div>
          <div>
            <h1 style={{ fontSize: "2rem", margin: 0, lineHeight: 1 }}>Provision.io</h1>
            <p style={{ color: "var(--accent)", fontSize: "0.875rem", marginTop: "4px", fontWeight: "600", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              AI-Native Store Orchestrator
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="glass-card" style={{
            padding: "0.5rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "0.875rem",
            fontWeight: "600"
          }}>
            <span style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--success)",
              boxShadow: "0 0 10px var(--success)"
            }}></span>
            System Online
          </div>
        </div>
      </header>

      <main style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "3rem", alignItems: "start" }}>
        <aside className="animate-fade-in" style={{ position: "sticky", top: "2rem" }}>
          <CreateStoreModal onCreate={handleCreate} />
        </aside>

        <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem"
          }}>
            <h2 style={{ fontSize: "1.25rem", margin: 0 }}>Active Deployments</h2>
            <div style={{
              background: "var(--surface)",
              padding: "0.25rem 0.75rem",
              borderRadius: "20px",
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "var(--primary)"
            }}>
              {stores.length} Running
            </div>
          </div>
          <StoreList stores={stores} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}
