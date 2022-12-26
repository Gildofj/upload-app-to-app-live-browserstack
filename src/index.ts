import * as core from "@actions/core";
import * as github from "@actions/github";

import { getRecentApps, removeApp, uploadApp } from "./http-requests/app-live";
import apiAppLive from "./utils/api-app-live";

(async function () {
  try {
    const appPath = core.getInput('app-path');
    if (!appPath)
      core.setFailed('app-path is required');

    const bsUserName = core.getInput('browserstack-username');
    if (!bsUserName)
      core.setFailed('browserstack-username is required');

    const bsAccessKey = core.getInput('browserstack-accesskey');
    if (!bsAccessKey)
      core.setFailed('browserstack-accesskey is required');

    if (appPath && bsUserName && bsAccessKey) {
      apiAppLive.defaults.auth = {
        username: bsUserName,
        password: bsAccessKey
      };


      const appToReplace = core.getInput("app-to-replace");
      console.log(`appPath -  ${appPath}!`);
      if (appToReplace) {
        const apps = await getRecentApps();
        if (apps && apps.length > 0) {
          const app = apps.find(app => app.app_name === appToReplace);

          if (app)
            await removeApp({ appId: app.app_id });
          else
            console.log("reported app-to-replace not found for the user in question reported not found for the user in question!");
        }
      }

      await uploadApp({ appPath });

    }
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed((error as Error).message);
  }
})();