import { Platform } from "react-native";
/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not
 * distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright 2019-2021 Matteo Mazzarolo and the Breathly project contributors.
 */

const buildImageSource = (
  iosSrc: string,
  androidSrc: string
): { uri: string } => {
  return { uri: Platform.OS === "ios" ? iosSrc : androidSrc };
};

export const images = {
  iconCheck: buildImageSource("IconCheck", "icon_check"),
  iconClose: buildImageSource("IconClose", "icon_close"),
  iconLeftArrow: buildImageSource("IconLeftArrow", "icon_left_arrow"),
  iconMeditation: buildImageSource("IconMeditation", "icon_meditation"),
  iconPlay: buildImageSource("IconPlay", "icon_play"),
  iconSettings: buildImageSource("IconSettings", "icon_settings"),
  logo: buildImageSource("Logo", "logo"),
  starsBackground: buildImageSource("StarsBackground", "background_stars"),
};
