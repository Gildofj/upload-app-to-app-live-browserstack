import * as core from "@actions/core";
import * as github from "@actions/github";

import { getRecentApps, initializeApiAppLive, removeApp, uploadApp } from "./http-requests/app-live";

export async function run() {
  try {
    const appPath = core.getInput('app-path');
    if (appPath === 'undefined')
      core.setFailed('app-path is required');

    const bsUserName = core.getInput('browserstack-username');
    if (bsUserName === 'undefined')
      core.setFailed('browserstack-username is required');

    const bsAccessKey = core.getInput('browserstack-accesskey');
    if (bsAccessKey === 'undefined')
      core.setFailed('browserstack-accesskey is required');

    if (appPath !== 'undefined' && bsUserName !== 'undefined' && bsAccessKey !== 'undefined') {
      initializeApiAppLive({ username: bsUserName, password: bsAccessKey });
      console.log(`appPath -  ${appPath}!`);
      const appToReplace = core.getInput("app-to-replace");
      if (appToReplace) {
        const apps = await getRecentApps();
        if (apps && apps.length > 0) {
          const app = apps.find(app => app.app_name === appToReplace);

          if (app)
            await removeApp({ appId: app.app_id });
          else
            console.log("Reported app-to-replace not found for the user in question reported not found for the user in question!");
        }
      }

      await uploadApp({ appPath });
    }
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed('Unknown error occurred.')
    }
  }
}

void run();