import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "dev.draftpilot.app",
  appName: "draftpilot",
  webDir: "out",
  server: {
    // Development: point to local Next.js server
    // Remove this in production build
    url: "http://localhost:3085",
    cleartext: true,
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    },
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: "#08090c",
      androidSplashResourceName: "splash",
      showSpinner: false,
    },
    StatusBar: {
      style: "Dark",
      backgroundColor: "#08090c",
    },
  },
};

export default config;
