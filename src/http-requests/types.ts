export type UploadAppProps = {
  appPath: string,
}

export type RemoveAppProps = {
  appId: string,
}

export type AppLive = {
  app_name: string,
  app_version: string,
  app_url: string,
  app_id: string,
  uploaded_at: string,
}