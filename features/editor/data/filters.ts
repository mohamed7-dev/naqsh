enum FiltersEnum {
  None = "none",
  Polaroid = "polaroid",
  Sepia = "sepia",
  Kodachrome = "kodachrome",
  Contrast = "contrast",
  Brightness = "brightness",
  Greyscale = "greyscale",
  Brownie = "brownie",
  Vintage = "vintage",
  Technicolor = "technicolor",
  Pixelate = "pixelate",
  Invert = "invert",
  Blur = "blur",
  Sharpen = "sharpen",
  Emboss = "emboss",
  RemoveColor = "removecolor",
  BlackNWhite = "blacknwhite",
  Vibrance = "vibrance",
  BlendColor = "blendcolor",
  HueRotate = "huerotate",
  Resize = "resize",
  Saturation = "saturation",
  Gamma = "gamma",
}
const FILTERS = Object.values(FiltersEnum) as unknown as Filters[];

type Filters = keyof typeof FiltersEnum;

export { FILTERS, FiltersEnum };
export type { Filters };
