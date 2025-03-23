const FILL_COLOR = "";
const OPACITY = 1;
const WORKSPACE_BG = "#fff";
const WORKSPACE_WIDTH = 1280;
const WORKSPACE_HEIGHT = 720;
const ZOOM_RATIO = 0.05;
const MAX_ZOOM_IN = 1;
const MIN_ZOOM_OUT = 0.4;
const DEFAULT_IMAGE_NAME = `Untitled-${new Date().getDate()}/${
  new Date().getMonth() + 1
}/${new Date().getFullYear()}`;
const DEFAULT_PROJECT_NAME = `Untitled-project-${new Date().getDate()}/${
  new Date().getMonth() + 1
}/${new Date().getFullYear()}`;
const CANVAS_DARK_BG = ["#121212", "#181604", "#1b1715", "#13171b"];
const CANVAS_LIGHT_BG = ["#f5faff", "#ffffff", "#f8f9fa", "#fffce8"];
const DEFAULT_DARK_BG = CANVAS_DARK_BG[0];
const DEFAULT_LIGHT_BG = CANVAS_LIGHT_BG[0];
export {
  FILL_COLOR,
  OPACITY,
  WORKSPACE_BG,
  WORKSPACE_HEIGHT,
  WORKSPACE_WIDTH,
  ZOOM_RATIO,
  MAX_ZOOM_IN,
  MIN_ZOOM_OUT,
  DEFAULT_IMAGE_NAME,
  CANVAS_DARK_BG,
  CANVAS_LIGHT_BG,
  DEFAULT_PROJECT_NAME,
  DEFAULT_DARK_BG,
  DEFAULT_LIGHT_BG,
};
