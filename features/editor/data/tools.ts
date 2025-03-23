enum EditorToolsEnum {
  Select = "Select",
  Rect = "Rect",
  ClipRect = "ClipRect",
  SoftRect = "SoftRect",
  Circle = "Circle",
  Triangle = "Triangle",
  InvertedTriangle = "InvertedTriangle",
  Diamond = "Diamond",
  Text = "Text",
  Header = "Header",
  SubHeading = "SubHeading",
  Paragraph = "Paragraph",
  Images = "Images",
  Draw = "Draw",
  Fill = "Fill",
  StrokeColor = "StrokeColor",
  StrokeWidth = "StrokeWidth",
  Font = "Font",
  Opacity = "Opacity",
  Filter = "Filter",
  Settings = "Settings",
  AI = "AI",
  RemoveBackground = "RemoveBackground",
  Templates = "Templates",
}

const EditorTools = Object.values(EditorToolsEnum);

export { EditorToolsEnum, EditorTools };
