// Server setup
import express from "express";
import cors from "cors";

import storeRoutes from "./routes/stores";

const app = express();

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[backend] ${req.method} ${req.url}`);
    next();
});

/**
 * Health check
 */
app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        service: "store-provisioning-backend"
    });
});

/**
 * Store provisioning APIs
 */
app.use("/stores", storeRoutes);

// 404 Handler
app.use((_req, res) => {
    console.log(`[backend] 404 ${_req.method} ${_req.url}`);
    res.status(404).json({ error: "route not found", path: _req.path });
});

export default app;
