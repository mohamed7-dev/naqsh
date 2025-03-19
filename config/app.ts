import { Metadata } from "next";

const APP_NAME = "Naqsh";

const COMMON_METADATA: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: `${APP_NAME}: %s`,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
};

export { APP_NAME, COMMON_METADATA };
