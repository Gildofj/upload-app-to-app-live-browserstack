import * as fs from "fs";
import * as core from "@actions/core";
import FormData from "form-data";

import apiAppLive from "../utils/api-app-live";
import { AppLive, InitializeApiAppLiveProps, RemoveAppProps, UploadAppProps, UploadAppResponse } from "./types";

export function initializeApiAppLive({ username, password }: InitializeApiAppLiveProps) {
  apiAppLive.defaults.auth = { username, password };
}

export async function getRecentApps() {
  try {
    const response = await apiAppLive.get<AppLive[]>("/recent_apps");
    return response.data
  } catch (err) {
    throw err as Error;
  }
}

export async function uploadApp({ appPath }: UploadAppProps) {
  if (!appPath)
      throw new Error("appId is required for upload app");

  const customId = core.getInput('custom-id');
  const form_data = new FormData();
  form_data.append("file", fs.createReadStream(appPath));
  form_data.append("custom_id", customId);
  const response = await apiAppLive.post<UploadAppResponse>("/upload", form_data);
  core.setOutput("browserstack-app-url", response.data.app_url);
}

export async function removeApp({ appId }: RemoveAppProps) {
    if (!appId)
      throw new Error("appId is required for remove app");

    await apiAppLive.delete(`/app/delete/${appId}`);
}