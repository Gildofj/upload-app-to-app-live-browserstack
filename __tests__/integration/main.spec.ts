import { RunOptions, RunTarget } from "github-action-ts-run-api";
import UserTest from "../mocks/browserstack-user";

const target = RunTarget.mainJs("action.yml");

async function expectRunInitiatesUpload(options: RunOptions) {
  const result = await target.run(options);
  expect(result.isSuccess).toBe(true);
}

describe("try upload app to browserstack", () => {
  it("correct bare minimum inputs", async () => {
    const minimumOptions = RunOptions.create()
      .setInputs({
        "app-path": "./__tests__/mocks/release-files-android/release.aab",
        "browserstack-username": UserTest.username,
        "browserstack-accesskey": UserTest.accessKey,
      });
    await expectRunInitiatesUpload(minimumOptions);
  });

  it("correct bare all inputs", async () => {
    const minimumOptions = RunOptions.create()
      .setInputs({
        "app-path": "./__tests__/mocks/release-files-android/release.aab",
        "browserstack-username": UserTest.username,
        "browserstack-accesskey": UserTest.accessKey,
        "custom-id": "upload-test",
        "app-to-replace": "release.aab"
      });
    await expectRunInitiatesUpload(minimumOptions);
  });
});