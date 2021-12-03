/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not
 * distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright 2019-2021 Matteo Mazzarolo and the Breathly project contributors.
 */

import { Animated, ScaleTransform, TranslateYTransform } from "react-native";

export const interpolate = (
  value: Animated.Value,
  config: Animated.InterpolationConfigType
) => {
  return value.interpolate({
    // @ts-ignore
    inputRange: [0, 1],
    ...config,
  });
};

export const interpolateScale = (
  value: Animated.Value,
  config: Animated.InterpolationConfigType
): Animated.WithAnimatedObject<ScaleTransform> => {
  return {
    scale: interpolate(value, config),
  };
};

export const interpolateTranslateY = (
  value: Animated.Value,
  config: Animated.InterpolationConfigType
): Animated.WithAnimatedObject<TranslateYTransform> => {
  return {
    translateY: interpolate(value, config),
  };
};
