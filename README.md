# upload-app-to-app-live-browserstack action

This action helps you upload your app to BrowserStack.

## Inputs

### `app-path`

**Required** The path for the app to be uploaded. Default `"Undefined"`.

### `browserstack-username`

**Required** The username for BrowserStack. Default `"Undefined"`.

### `browserstack-accesskey`

**Required** The accesskey for BrowserStack. Default `"Undefined"`.

### `custom-id`

**Optional** The custom id for BrowserStack. Default `"upload-app-browserstack"`.

### `app-to-replace`

**Optional** The name of apps to remove before upload new app in browserstack`.

## Outputs

### `browserstack-app-url`

The url for the app uploaded.

## Example usage

```
- name: Upload APK to APP Live BrowserStack
  uses: DeviTecnologia/upload-app-to-app-live-browserstack@main
  with:
    app-path: /path-to-apk/app.apk
    browserstack-username: ${{ secrets.BROWSERSTACK_USERNAME }}
    browserstack-accesskey: ${{ secrets.BROWSERSTACK_ACCESSKEY }}
```

