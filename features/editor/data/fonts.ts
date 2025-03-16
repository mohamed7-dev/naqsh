enum FontsEnum {
  Arial = "Arial",
  ArialBlack = "Arial Black",
  Verdana = "Verdana",
  Helvetica = "Helvetica",
  Tahoma = "Tahoma",
  TrebuchetMS = "Trebuchet MS",
  TimesNewRoman = "Times New Roman",
  Georgia = "Georgia",
  Garamond = "Garamond",
  CourierNew = "Courier New",
  BrushScriptMT = "Brush Script MT",
  Palatino = "Palatino",
  Bookman = "Bookman",
  ComicSansMS = "Comic Sans MS",
  Impact = "Impact",
  LucidaSansUnicode = "Lucida Sans Unicode",
  Geneva = "Geneva",
  LucidaConsole = "Lucida Console",
}

const FONTS = Object.values(FontsEnum) as unknown as Array<
  keyof typeof FontsEnum
>;

export { FONTS, FontsEnum };
