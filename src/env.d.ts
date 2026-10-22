/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_APP_URL_GRC?: string;
  readonly PUBLIC_APP_URL_AMPLIFY?: string;
  readonly PUBLIC_APP_URL_SENTINEL?: string;
  readonly PUBLIC_FORM_ENDPOINT?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
