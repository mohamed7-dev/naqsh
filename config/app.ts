import { Metadata } from "next";

const APP_NAME = "Naqsh";

const COMMON_METADATA: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: `${APP_NAME}: %s`,
  },
};

const DEFAULT_LIMIT = 10;

export { APP_NAME, COMMON_METADATA, DEFAULT_LIMIT };
