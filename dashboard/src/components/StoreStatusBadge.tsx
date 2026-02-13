import React from "react";
type Props = {
  status: string;
};

export function StoreStatusBadge({ status }: Props) {
  let bg = "rgba(148, 163, 184, 0.2)";
  let color = "var(--text-muted)";
  let glow = "none";
  let text = status;

  if (status === "READY") {
    bg = "rgba(16, 185, 129, 0.2)";
    color = "#34d399";
    glow = "0 0 10px rgba(16, 185, 129, 0.3)";
  } else if (status === "FAILED") {
    bg = "rgba(239, 68, 68, 0.2)";
    color = "#f87171";
    glow = "0 0 10px rgba(239, 68, 68, 0.3)";
  } else if (status === "PROVISIONING") {
    bg = "rgba(245, 158, 11, 0.2)";
    color = "#fbbf24";
    glow = "0 0 10px rgba(245, 158, 11, 0.3)";
    text = "Deploying...";
  }

  return (
    <span style={{
      background: bg,
      color: color,
      padding: "0.4rem 0.8rem",
      borderRadius: "8px",
      fontSize: "0.75rem",
      fontWeight: "700",
      letterSpacing: "0.05em",
      boxShadow: glow,
      border: `1px solid ${color}33`,
      display: "inline-flex",
      alignItems: "center",
      gap: "6px"
    }}>
      {status === "PROVISIONING" && (
        <span style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: color,
          animation: "pulse-glow 1.5s infinite"
        }}></span>
      )}
      {text}
    </span>
  );
}
