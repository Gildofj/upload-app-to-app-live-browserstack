import fs from "fs";
import * as core from "@actions/core";
import FormData from "form-data";

import apiAppLive from "../utils/api-app-live";
import { AppLive, RemoveAppProps, UploadAppProps } from "./types";

export async function getRecentApps() {
  const response = await apiAppLive.get<AppLive[]>("/recent_apps");
  return response.data
}

export async function uploadApp({ appPath }: UploadAppProps) {
  const customId = core.getInput('custom-id');
  const form_data = new FormData();
  form_data.append("file", fs.createReadStream(appPath));
  form_data.append("custom_id", customId);
  const response = await apiAppLive.post("/upload", form_data);
  console.log(response);
  core.setOutput("browserstack-app-url", response.data.app_url);
}

export async function removeApp({ appId }: RemoveAppProps) {
  await apiAppLive.delete(`/app/delete/${appId}`);
}