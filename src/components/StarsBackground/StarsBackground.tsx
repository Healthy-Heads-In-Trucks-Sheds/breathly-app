/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not
 * distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright 2019-2021 Matteo Mazzarolo and the Breathly project contributors.
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import { deviceHeight, deviceWidth } from "../../config/constants";
import { images } from "../../config/images";
import { Thumbnail } from "native-base";

export const StarsBackground = () => {
  return (
    <View pointerEvents="none" style={styles.container}>
      <Thumbnail
        source={images.starsBackground}
        accessibilityLabel={"Stars background"}
        resizeMode="cover"
        style={[styles.backgroundImage]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: deviceWidth,
    height: deviceHeight + 60,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
});
