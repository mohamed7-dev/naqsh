/**
 * Extra keys to be added to the output of the JSON.stringify() method
 * because the normal behavior of the method omits these feilds
 */
const JSON_KEYS = [
  "name",
  "gradientAngle",
  "selectable",
  "hasControls",
  "linkData",
  "editable",
  "extensionType",
  "extension",
];

export { JSON_KEYS };
