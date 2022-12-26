import * as core from "@actions/core";
import * as github from "@actions/github";

import { getRecentApps, removeApp, uploadApp } from "./http-requests/app-live";
import apiAppLive from "./utils/api-app-live";

(async function () {
  try {
    // const appPath = core.getInput('app-path');
    // if (!appPath)
    //   core.setFailed('app-path is required');

    // const bsUserName = core.getInput('browserstack-username');
    // if (!bsUserName)
    //   core.setFailed('browserstack-username is required');

    // const bsAccessKey = core.getInput('browserstack-accesskey');
    // if (!bsAccessKey)
    //   core.setFailed('browserstack-accesskey is required');

    apiAppLive.defaults.auth = {
      username: "gildojunior_SHvnJP", //bsUserName,
      password: "7PHsbjMZrSqURi7zMEwa"//bsAccessKey
    };


    const appToReplace = "App.Celular-Default-release.aab"//core.getInput("app-to-replace");
    // console.log(`appPath -  ${appPath}!`);
    if (appToReplace) {
      const apps = await getRecentApps();
      const app = apps?.find(app => app.app_name === appToReplace) ?? undefined;

      if (app)
        await removeApp({ appId: app.app_id });
      else
        console.log("appToReplace informado não encontrado para o usuário em questão!");
    }

    // await uploadApp({ appPath });

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed((error as Error).message);
  }
})();