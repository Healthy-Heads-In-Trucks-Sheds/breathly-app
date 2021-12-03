/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not
 * distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright 2019-2021 Matteo Mazzarolo and the Breathly project contributors.
 */

import React, { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export interface TouchableProps extends TouchableOpacityProps {}

export const Touchable: FC<TouchableProps> = ({ children, ...otherProps }) => {
  const hitSlop = {
    top: 4,
    bottom: 4,
    left: 4,
    right: 4,
  };
  return (
    <TouchableOpacity hitSlop={hitSlop} {...otherProps}>
      {children}
    </TouchableOpacity>
  );
};
