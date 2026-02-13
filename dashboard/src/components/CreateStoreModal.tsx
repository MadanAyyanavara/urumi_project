import React from "react";
import { useState } from "react";

type Props = {
  onCreate: (id: string, type: string, description: string) => void;
};

export function CreateStoreModal({ onCreate }: Props) {
  const [id, setId] = useState("");
  const [type, setType] = useState("woocommerce");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      onCreate(id, type, description);
      setId("");
      setType("woocommerce");
      setDescription("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "var(--surface)",
        padding: "2rem",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
        border: "1px solid var(--border)"
      }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text)" }}>New Deployment</h3>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", margin: 0 }}>
          Provision a new isolated store environment.
        </p>
      </div>

      <div style={{ marginBottom: "1.25rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: "600" }}>
          Store Identifier
        </label>
        <input
          autoFocus
          placeholder="e.g. flash-sale-2024"
          value={id}
          onChange={e => setId(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "1.25rem" }}>
        <label style={{ display: "block", marginBottom: "0.75rem", fontSize: "0.875rem", fontWeight: "600" }}>
          Engine Type
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div
            onClick={() => setType("woocommerce")}
            style={{
              cursor: "pointer",
              border: type === "woocommerce" ? "1px solid var(--secondary)" : "1px solid var(--glass-border)",
              background: type === "woocommerce" ? "rgba(139, 92, 246, 0.1)" : "rgba(15, 23, 42, 0.4)",
              padding: "1rem",
              borderRadius: "12px",
              transition: "all 0.2s",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🛍️</div>
            <div style={{ fontSize: "0.9rem", fontWeight: "600", color: type === "woocommerce" ? "var(--secondary)" : "var(--text)" }}>WooCommerce</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>WordPress + MySQL</div>
          </div>

          <div
            onClick={() => setType("medusa")}
            style={{
              cursor: "pointer",
              border: type === "medusa" ? "1px solid var(--secondary)" : "1px solid var(--glass-border)",
              background: type === "medusa" ? "rgba(139, 92, 246, 0.1)" : "rgba(15, 23, 42, 0.4)",
              padding: "1rem",
              borderRadius: "12px",
              transition: "all 0.2s",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⚡</div>
            <div style={{ fontSize: "0.9rem", fontWeight: "600", color: type === "medusa" ? "var(--secondary)" : "var(--text)" }}>MedusaJS</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Node.js + Postgres</div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: "600" }}>
          Deployment Intent
        </label>
        <textarea
          placeholder="Describe your architecture needs (e.g. 'I need an AI agent sidecar for automated catalog management')..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
          style={{ resize: "vertical", minHeight: "100px" }}
        />
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
          ✨ AI Analysis: Use keywords "agent" or "ai" to auto-attach a management sidecar.
        </p>
      </div>

      <button
        type="submit"
        disabled={!id}
        style={{
          width: "100%",
          padding: "0.875rem",
          background: id ? "var(--primary)" : "var(--surface-hover)",
          color: id ? "white" : "var(--text-muted)",
          borderRadius: "var(--radius)",
          fontSize: "1rem",
          opacity: id ? 1 : 0.7,
          cursor: id ? "pointer" : "not-allowed"
        }}
        onMouseOver={(e) => {
          if (id) e.currentTarget.style.background = "var(--primary-hover)";
        }}
        onMouseOut={(e) => {
          if (id) e.currentTarget.style.background = "var(--primary)";
        }}
      >
        Deploy Stack
      </button>
    </form >
  );
}
