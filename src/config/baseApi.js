export const baseAPI =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v2"
    : "https://carx-server.vercel.app/api/v2";
