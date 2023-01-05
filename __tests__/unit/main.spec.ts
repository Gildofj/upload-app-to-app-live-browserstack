import { RunOptions, RunTarget } from "github-action-ts-run-api";

const target = RunTarget.mainJs("action.yml");

describe("try upload app to browserstack", () => {
  it("correct bare minimum inputs", async () => {
    const options = RunOptions.create()
      .setInputs({
        "app-path": "path",
        "browserstack-username": "username",
        "browserstack-accesskey": "accesskey",
      });

    const result = await target.run(options);
    expect(result.isSuccess).toBe(false);
    expect(result.commands.errors.length).toBe(1);
    expect(result.commands.errors).toContain("Request failed with status code 401");
  });

  it("correct bare all inputs", async () => {
    const options = RunOptions.create()
      .setInputs({
        "app-path": "path",
        "browserstack-username": "usrname",
        "browserstack-accesskey": "acceskey",
        "custom-id": "customId",
        "app-to-replace": "appToReplace"
      });

    const result = await target.run(options);
    expect(result.isSuccess).toBe(false);
    expect(result.commands.errors.length).toBe(1);
    expect(result.commands.errors).toContain("Request failed with status code 401");
  });

  it("without any input", async () => {
    const options = RunOptions.create().setInputs({});

    const result = await target.run(options);
    expect(result.isSuccess).toBe(false);
    expect(result.commands.errors.length).toBe(3);
    expect(result.commands.errors).toContain("app-path is required");
    expect(result.commands.errors).toContain("browserstack-username is required");
    expect(result.commands.errors).toContain("browserstack-accesskey is required");
  });

  it("without required app-path input", async () => {
    const options = RunOptions.create()
      .setInputs({
        "browserstack-username": "username",
        "browserstack-accesskey": "accesskey",
      });

    const result = await target.run(options);
    expect(result.isSuccess).toBe(false);
    expect(result.commands.errors.length).toBe(1);
    expect(result.commands.errors).toContain("app-path is required");
  });

  it("without required browserstack-username input", async () => {
    const options = RunOptions.create()
      .setInputs({
        "app-path": "path",
        "browserstack-accesskey": "accesskey",
      });

    const result = await target.run(options);
    expect(result.isSuccess).toBe(false);
    expect(result.commands.errors.length).toBe(1);
    expect(result.commands.errors).toContain("browserstack-username is required");
  });

  it("without required browserstack-accesskey input", async () => {
    const options = RunOptions.create()
      .setInputs({
        "app-path": "path",
        "browserstack-username": "username",
      });

    const result = await target.run(options);
    expect(result.isSuccess).toBe(false);
    expect(result.commands.errors.length).toBe(1);
    expect(result.commands.errors).toContain("browserstack-accesskey is required");
  });

  it("without not required custom-id input", async () => {
    const options = RunOptions.create()
      .setInputs({
        "app-path": "path",
        "browserstack-username": "username",
        "browserstack-accesskey": "accesskey",
        "app-to-replace": "appToReplace"
      });

    const result = await target.run(options);
    expect(result.isSuccess).toBe(false);
    expect(result.commands.errors.length).toBe(1);
    expect(result.commands.errors).toContain("Request failed with status code 401");
  });

  it("without not required app-to-replace input", async () => {
    const options = RunOptions.create()
      .setInputs({
        "app-path": "path",
        "browserstack-username": "username",
        "browserstack-accesskey": "accesskey",
        "custom-id": "customId",
      });

    const result = await target.run(options);
    expect(result.isSuccess).toBe(false);
    expect(result.commands.errors.length).toBe(1);
    expect(result.commands.errors).toContain("Request failed with status code 401");
  });
});