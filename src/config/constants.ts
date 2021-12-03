/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not
 * distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright 2019-2021 Matteo Mazzarolo and the Breathly project contributors.
 */

import { Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get("screen");

export const androidNavBarHeight = 48;
export const androidStatusBarHeight = StatusBar.currentHeight || 24;

export const deviceWidth = width;
export const deviceHeight = height;
