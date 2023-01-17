import { getRecentApps, removeApp, uploadApp } from "../../../src/http-requests/app-live";

describe("call http request", () => {
  it("uploadApp with appPath", async () => {
    try {
      await uploadApp({ appPath: "./__tests__/mocks/release-files-android/release.aab" });
    } catch (err) {
      expect((err as Error).message).toBe("Request failed with status code 401");
    }
  });

  it("uploadApp without appPath", async () => {
    try {
      await uploadApp({ appPath: "" });
    } catch (err) {
      expect((err as Error).message).toBe("appPath is required for upload app");
    }
  });

  it("getRecentApps", async () => {
    try {
      await getRecentApps();
    } catch (err) {
      expect((err as Error).message).toBe("Request failed with status code 401");
    }
  });

  it("removeApp with appId", async () => {
    try {
      await removeApp({ appId: "appId" });
    } catch (err) {
      expect((err as Error).message).toBe("Request failed with status code 401");
    }
  });

  it("removeApp without appId", async () => {
    try {
      await removeApp({ appId: "" });
    } catch (err) {
      expect((err as Error).message).toBe("appId is required for remove app");
    }
  });
})