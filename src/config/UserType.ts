export const PROMOTION_PORT = "8800";
let baseURL = "",
  hostName = window.location.hostname,
  subscriptionBaseURL = "",
  reportURL = "";
if (import.meta.env.VITE_NODE_ENV === "development") {
  let stageEnvs = window?.location?.hostname.split(".");
  let stageName = (stageEnvs && stageEnvs[1]) || "stage3";
  baseURL = `https://api.${stageName}.dotnu.co`;
  subscriptionBaseURL = "https://dot-subscription.dotq.in/v1/";
  reportURL = `https://report-api.${stageName}.dotnu.co`;
} else if (import.meta.env.VITE_NODE_ENV === "production") {
  baseURL = "https://api.dotpe.in";
  subscriptionBaseURL = "https://subscription.dotpe.in/v1/";
  reportURL = "https://report-api.dotpe.in";
}
// console.warn(process.env, "node nv")
export const SERVER_API_URL = baseURL;
export const SERVER_SUBSCRIPTION_API_URL = subscriptionBaseURL;
export const REPORT_SERVER_API_URL = reportURL;
