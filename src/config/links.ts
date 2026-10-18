// Centralized links configuration
// You can override this dynamically via VITE_RESUME_DRIVE_URL in your Vercel / environment settings,
// or simply update the URL below without touching any UI code.
export const RESUME_DRIVE_URL: string =
    (import.meta as any).env?.VITE_RESUME_DRIVE_URL ||
    "https://drive.google.com/file/d/17-nGvDHYbfJ7AWoBJKcEbikvQr1JXUv6/view?usp=drive_link";
