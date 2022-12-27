import { RunOptions, RunTarget } from "github-action-ts-run-api";

const target = RunTarget.mainJs("action.yml");

async function expectRunInitiatesUpload(options: RunOptions) {
  const result = await target.run(options);
  expect(result.commands.errors.length).toBe(0);
}

test("correct bare minimum inputs", async () => {
  const minimumOptions = RunOptions.create()
    .setInputs({
      "app-path": "./__tests__/releasefiles/release.aab",
      "browserstack-username": "gildojnior_jPYvy4",
      "browserstack-accesskey": "TS5g16xbiwviz5pqLBva",
    })
  await expectRunInitiatesUpload(minimumOptions)
});

test("correct bare all inputs", async () => {
  const minimumOptions = RunOptions.create()
    .setInputs({
      "app-path": "./__tests__/releasefiles/release.aab",
      "browserstack-username": "gildojnior_jPYvy4",
      "browserstack-accesskey": "TS5g16xbiwviz5pqLBva",
      "custom-id": "upload-test",
      "app-to-replace": "release.aab"
    })
  await expectRunInitiatesUpload(minimumOptions)
});