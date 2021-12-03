/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not
 * distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright 2019-2021 Matteo Mazzarolo and the Breathly project contributors.
 */

import { Animated, Easing } from "react-native";

// Reduces the boilerplate for the most used animation config
export const animate = (
  value: Animated.Value,
  config: Partial<Animated.TimingAnimationConfig>
) => {
  return Animated.timing(value, {
    toValue: config.toValue!,
    ...config,
    useNativeDriver: true,
    easing: Easing.inOut(Easing.quad),
  });
};
