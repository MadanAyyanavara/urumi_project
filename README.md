# Store Provisioning Platform (Round 1)

This project implements a Kubernetes-native store provisioning platform. It allows users to create and manage e-commerce stores (WooCommerce or MedusaJS) on a local Kubernetes cluster. This setup is designed to be easily deployable to production environments with minimal configuration changes.

## Prerequisites

Before running the project, you **must** have the following tools installed and available in your system PATH:

1.  **Docker Desktop** (Start it and ensure it's running)
2.  **Kind** (Kubernetes in Docker)
    *   Install: `choco install kind` (Windows) or `brew install kind` (macOS)
3.  **Kubectl**
    *   Install: `choco install kubernetes-cli`
4.  **Helm**
    *   Install: `choco install kubernetes-helm`
5.  **Node.js & npm**

## Local Setup (Windows)

1.  **Start Docker Desktop**.

2.  **Create the Local Cluster**:
    Open a PowerShell terminal as Administrator and run the setup script:
    ```powershell
    ./scripts/setup.ps1
    ```
    This script will:
    *   Create a Kind cluster named `store-platform`.
    *   Configure port mappings (80/443).
    *   Install the NGINX Ingress Controller.

3.  **Install Dependencies**:
    ```bash
    cd backend
    npm install
    cd ../dashboard
    npm install
    ```

4.  **Run the Application**:
    You need two terminal windows.
    
    **Terminal 1 (Backend):**
    ```bash
    cd backend
    npm run dev
    ```
    
    **Terminal 2 (Dashboard):**
    ```bash
    cd dashboard
    npm run dev
    ```

5.  **Access the Dashboard**:
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1.  **Create a Store**:
    *   Click "Create New Store".
    *   Enter a Store ID (e.g., `my-shop`) and select "WooCommerce".
    *   The system will provision a new Namespace, Deployment, Service, PVC, and Ingress.
    *   **Wait**: It may take 1-2 minutes for the images to pull and pods to start.

2.  **Access the Store**:
    *   Once the status is `READY`, clicking the URL (e.g., `http://my-shop.localtest.me`) will open the store.
    *   `localtest.me` is a wildcard DNS that resolves to `127.0.0.1`, routing traffic to your local Kind cluster.

3.  **Teardown**:
    *   Clicking "Delete" will remove the entire Namespace and all resources (Pods, PVCs) for that store.

## Production Deployment (VPS)

To deploy to a VPS (e.g., running k3s):

1.  **Cluster Setup**: running `k3s` server.
2.  **Ingress**: `k3s` comes with Traefik or you can install Nginx. Ensure LoadBalancer/NodePort is accessible.
3.  **Helm Install**:
    Run the same Helm charts but use the production values file:
    ```bash
    helm install my-store ./helm/store \
      --values ./helm/store/values-prod.yaml \
      --set store.id=my-store \
      --set store.namespace=my-store \
      --set domain.host=my-store.yourdomain.com
    ```
4.  **Differences in Prod**:
    *   **StorageClass**: `values-prod.yaml` should define the correct storage class (e.g., `local-path` or `gp2`).
    *   **Domain**: Use real DNS records instead of `.localtest.me`.
    *   **Secrets**: Pass DB passwords via `--set` or External Secrets Operator, do not rely on defaults.

## System Design Notes

*   **Isolation**: Each store runs in its own **Namespace**. This provides strong isolation for resources and allows for easy cleanup.
*   **Idempotency**: The backend checks for existing stores before provisioning. Helm itself is idempotent.
*   **Networking**: We use Ingress to route traffic based on Host headers.
*   **Persistence**: PVCs ensure database data survives pod restarts.
