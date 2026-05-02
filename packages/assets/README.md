# @portfolio/assets

This package exports image assets by file name, so you can choose backgrounds and other images dynamically in the app.

## Usage

```ts
import {
  getAssetUrl,
  backgroundNames,
  otherImageNames,
} from "@portfolio/assets";

const url = getAssetUrl("background-1.svg");
const backgroundOptions = backgroundNames;
```

Add additional image files into `src/images` and they will automatically be available through the package.
