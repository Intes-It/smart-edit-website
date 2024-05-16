import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://103.176.149.253:8088/",
        changeOrigin: true,
        secure: true,
        ws: false,
        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req) => {
            console.log(
              "Sending Request to the Target http://103.176.149.253:8088:",
              req.method,
              req.url
            );
          });
          proxy.on("proxyRes", (proxyRes, req) => {
            console.log(
              "Received Response from the Target: http://103.176.149.253:8088",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
      "/apx": {
        target: "http://171.244.64.245:8080/",
        changeOrigin: true,
        secure: true,
        ws: false,
        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req) => {
            console.log(
              "Sending Request to the Target: http://171.244.64.245:8080",
              req.method,
              req.url
            );
          });
          proxy.on("proxyRes", (proxyRes, req) => {
            console.log(
              "Received Response from the Target:http://171.244.64.245:8080",
              proxyRes.statusCode,
              req.url
            );
          });
        },
        rewrite: (path) => path.replace(/^\/apx/, "api"),
      },
    },
    port: 3000,
  },
});
