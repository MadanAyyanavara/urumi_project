import { Router } from "express";
import { storeService } from "../services/storeService";

const router = Router();

/**
 * Create a new store
 * POST /stores
 */
router.post("/", async (req, res) => {
  const { id, type, description } = req.body;

  if (!id) {
    return res.status(400).json({ error: "store id is required" });
  }

  try {
    const store = await storeService.createStore(id, type, description);
    return res.status(201).json(store);
  } catch (err: any) {
    if (err.message?.includes("limit")) {
      return res.status(429).json({ error: err.message });
    }
    return res.status(500).json({ error: "failed to create store" });
  }
});

/**
 * List all stores
 * GET /stores
 */
router.get("/", (_req, res) => {
  const stores = storeService.listStores();
  res.json(stores);
});

/**
 * Get a single store by ID
 * GET /stores/:id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const store = storeService.listStores().find(s => s.id === id);

  if (!store) {
    return res.status(404).json({ error: "not found" });
  }

  res.json(store);
});

/**
 * Delete a store
 * DELETE /stores/:id
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await storeService.deleteStore(id);
    return res.status(204).send();
  } catch {
    return res.status(500).json({ error: "failed to delete store" });
  }
});

export default router;
