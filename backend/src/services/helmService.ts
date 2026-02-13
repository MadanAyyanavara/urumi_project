import { execCmd } from "../utils/exec";

const STORE_CHART_PATH =
  process.env.HELM_STORE_CHART_PATH || "./helm/store";

const HELM_TIMEOUT = "10m";

// MOCK MODE: Set to true if you don't have Helm/K8s installed locally
const MOCK_MODE = process.env.MOCK_MODE === "true";

export const helmService = {
  async installStore(
    storeId: string,
    domain: string,
    type: string,
    dbPassword: string,
    rootPassword: string,
    sidecar: boolean
  ): Promise<void> {

    // Feature 2: If description implies "high performance", we would change resources here.
    // For now, we just pass the sidecar flag.
    const sidecarFlag = sidecar ? "true" : "false";

    const cmd = `helm install ${storeId} ${STORE_CHART_PATH} --set store.id=${storeId} --set store.namespace=${storeId} --set engine.type=${type} --set domain.host=${domain} --set db.password=${dbPassword} --set db.rootPassword=${rootPassword} --set agentSidecar.enabled=${sidecarFlag} --wait --timeout ${HELM_TIMEOUT}`;

    if (MOCK_MODE) {
      console.log(`[MOCK HELM] Simulating install for ${storeId}...`);
      console.log(`[MOCK CMD] ${cmd}`);
      // Simulate provisioning delay (3 seconds)
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log(`[MOCK HELM] Install successful for ${storeId}`);
      return;
    }

    await execCmd(cmd);
  },

  async uninstallStore(storeId: string): Promise<void> {
    const cmd = `helm uninstall ${storeId}`;

    if (MOCK_MODE) {
      console.log(`[MOCK HELM] Simulating uninstall for ${storeId}...`);
      console.log(`[MOCK CMD] ${cmd}`);
      // Simulate teardown delay (1 second)
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }

    await execCmd(cmd);
  }
};
