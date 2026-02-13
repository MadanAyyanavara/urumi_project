import React from "react";
import { StoreStatusBadge } from "./StoreStatusBadge";

type Store = {
  id: string;
  type: string;
  domain: string;
  status: string;
  createdAt: string;
  logs?: string[];
  agentSidecarEnabled?: boolean;
};

type Props = {
  stores: Store[];
  onDelete: (id: string) => void;
};

export function StoreList({ stores, onDelete }: Props) {
  const [expandedLogs, setExpandedLogs] = React.useState<Set<string>>(new Set());

  const toggleLogs = (id: string) => {
    const newSet = new Set(expandedLogs);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedLogs(newSet);
  };

  if (stores.length === 0) {
    return (
      <div className="glass-card" style={{
        padding: "4rem 2rem",
        textAlign: "center",
        color: "var(--text-muted)",
        boxShadow: "none",
        border: "1px dashed var(--glass-border)"
      }}>
        <div style={{ fontSize: "4rem", marginBottom: "1.5rem", opacity: 0.5 }}>📦</div>
        <h3 style={{ fontSize: "1.25rem", color: "var(--text)", marginBottom: "0.5rem" }}>No Active Deployments</h3>
        <p style={{ fontSize: "0.95rem", opacity: 0.7, maxWidth: "400px", margin: "0 auto" }}>
          Your fleet is currently empty. Use the panel on the left to provision a new isolated environment.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.03)", textAlign: "left" }}>
            <th style={{ padding: "1.25rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>Instance</th>
            <th style={{ padding: "1.25rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
            <th style={{ padding: "1.25rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>Configuration</th>
            <th style={{ padding: "1.25rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>Endpoint</th>
            <th style={{ padding: "1.25rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(store => (
            <React.Fragment key={store.id}>
              <tr style={{ borderTop: "1px solid rgba(255,255,255,0.05)", transition: "background 0.2s" }}
                onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "1.25rem" }}>
                  <div style={{ fontWeight: "600", fontSize: "0.95rem", color: "var(--text)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ opacity: 0.5 }}>#</span>{store.id}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {new Date(store.createdAt).toISOString().split('T')[0]}
                  </div>
                </td>
                <td style={{ padding: "1.25rem" }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <StoreStatusBadge status={store.status} />
                    {store.status === "FAILED" && store.logs && store.logs.length > 0 && (
                      <button
                        onClick={() => toggleLogs(store.id)}
                        style={{
                          background: "transparent",
                          color: "var(--error)",
                          fontSize: "0.75rem",
                          padding: "2px 6px",
                          border: "1px solid var(--error)",
                          borderRadius: "4px",
                          cursor: "pointer",
                          opacity: 0.8
                        }}
                      >
                        {expandedLogs.has(store.id) ? "Hide Logs" : "View Logs"}
                      </button>
                    )}
                  </div>
                </td>
                <td style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--text)" }}>{store.type === 'woocommerce' ? 'WooCommerce' : 'MedusaJS'}</span>
                    {store.agentSidecarEnabled && (
                      <span style={{
                        color: "#a78bfa",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}>
                        ⚡ AI Agent Attached
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ padding: "1.25rem" }}>
                  {store.status === "READY" ? (
                    <a
                      href={`http://${store.domain}`}
                      target="_blank"
                      style={{
                        color: "var(--accent)",
                        textDecoration: "none",
                        fontSize: "0.85rem",
                        fontWeight: "500",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        background: "rgba(6, 182, 212, 0.1)",
                        borderRadius: "6px",
                        border: "1px solid rgba(6, 182, 212, 0.2)"
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.background = "rgba(6, 182, 212, 0.2)"; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = "rgba(6, 182, 212, 0.1)"; }}
                    >
                      🌐 Open App
                    </a>
                  ) : (
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", opacity: 0.5 }}>-</span>
                  )}
                </td>
                <td style={{ padding: "1.25rem", textAlign: "right" }}>
                  <button
                    onClick={() => onDelete(store.id)}
                    title="Terminate Deployment"
                    style={{
                      background: "transparent",
                      color: "var(--text-muted)",
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      transition: "all 0.2s"
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"; e.currentTarget.style.color = "var(--error)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-muted)"; }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
              {expandedLogs.has(store.id) && (
                <tr style={{ background: "rgba(0,0,0,0.2)" }}>
                  <td colSpan={5} style={{ padding: "0 1.25rem 1.25rem 1.25rem" }}>
                    <div style={{
                      background: "#0f172a",
                      border: "1px solid var(--error)",
                      borderRadius: "8px",
                      padding: "1rem",
                      marginTop: "0.5rem",
                      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)"
                    }}>
                      <h4 style={{ color: "var(--error)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Failure Diagnosis</h4>
                      <pre style={{
                        fontFamily: "monospace",
                        fontSize: "0.75rem",
                        color: "#e2e8f0",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all",
                        margin: 0
                      }}>
                        {store.logs?.join('\n') || "No detailed logs available."}
                      </pre>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
