/// <reference types="vite/client" />

const imageModules = import.meta.glob("./images/*.{svg,png,jpg,jpeg,webp}", {
  eager: true,
  as: "url",
});

const assetUrls = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [
    path.replace("./images/", ""),
    url,
  ]),
) as Record<string, string>;

export const assets = assetUrls;
export const assetNames = Object.keys(assetUrls);
export const backgroundNames = assetNames.filter((name) =>
  name.startsWith("background-"),
);
export const otherImageNames = assetNames.filter(
  (name) => !name.startsWith("background-"),
);

export function getAssetUrl(name: string) {
  return assetUrls[name];
}

export function getBackgroundUrl(name: string) {
  return getAssetUrl(name);
}

export * from "./assets";
