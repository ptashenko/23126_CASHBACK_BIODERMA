# Nuxt Icons
A module for Nuxt 3 that allows you to use your own SVG icons quickly and enjoyably.

This folder will hold the SVG icons to be used with this plugin.
For detailed explanation on how things work, check out the [documentation](https://github.com/gitFoxCode/nuxt-icons).

## Usage
1. Create a `icons` folder in `assets`: `assets/icons`
2. Drop your icons with the **.svg** extension into the `icons` folder
3. In the project, use `<nuxt-icon name="">`, where name is the name of your svg icon from the folder

If you need to use the original color from the svg file (for example, if your icon has defs) you need to use the **filled** attribute: <br>

```Vue
<nuxt-icon name="mySuperIcon" filled />
```

To control the size of the SVG use the font-size property
```Vue
<nuxt-icon name="mySuperIcon" class="text-[8rem]" />
```

## What this module does
The module retrieves all svg files from the assets/icons folder, overwrites the height and width from them to make them scalable, and using the `<nuxt-icon>` component allows them to be used. `<nuxt-icon>` injects the SVG code directly into `<span>`.

## Features
- Easy SVG icon management ✅
- HMR (You don't have to reset the project to reload the icons) ✅
- Ability to manipulate icons just like fonts, e.g. using `color`, `font-size` instead of `fill`,`width`,`height` ✅
- Ability to use the original color scheme for complex icons using the `filled` attribute ✅
- Icon only loads if used ✅
