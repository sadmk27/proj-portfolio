/// <reference types="vite/client" />

const imageModules =
  typeof window !== "undefined" || import.meta.env.SSR === false
    ? import.meta.glob("./images/*.{svg,png,jpg,jpeg,webp}", {
        eager: true,
        as: "url",
      })
    : {};

const assetUrls = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [
    path.replace("./images/", ""),
    url,
  ]),
) as Record<string, string>;

export const assets = assetUrls;
export const assetNames = Object.keys(assetUrls);

export const backgroundNames = assetNames.filter((name) =>
  name.startsWith("background"),
);
export const otherImageNames = assetNames.filter(
  (name) => !name.startsWith("background"),
);

export function getAssetUrl(name: string): string | undefined {
  return assetUrls[name];
}

export function getBackgroundUrl(name: string): string | undefined {
  return getAssetUrl(name);
}
