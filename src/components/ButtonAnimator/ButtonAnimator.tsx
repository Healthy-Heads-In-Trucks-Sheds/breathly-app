/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not
 * distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright 2019-2021 Matteo Mazzarolo and the Breathly project contributors.
 */

import React, { FC, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { deviceHeight } from "../../config/constants";
import { images } from "../../config/images";
import { useAppContext } from "../../context/AppContext";
import { useOnMount } from "../../hooks/useOnMount";
import { useOnUpdate } from "../../hooks/useOnUpdate";
import { animate } from "../../utils/animate";
import {
  interpolateScale,
  interpolateTranslateY,
} from "../../utils/interpolate";
import { Touchable } from "../../common/Touchable";

export const buttonSize = 60;
export const buttonAnimatorContentHeight = deviceHeight - buttonSize * 2;
const showAnimDuration = 600;
const hideAnimDuration = 300;
const maxExpansionScale = (deviceHeight / buttonSize) * 2;
const expandAnimValDuration = 600;
const expandAnimValFrontTranslateY = 300;

type Props = {
  visible: boolean;
  onClosePress: () => void;
};

type Status =
  | "showing"
  | "hiding"
  | "hidden"
  | "front"
  | "back"
  | "to-front"
  | "to-back";

export const ButtonAnimator: FC<Props> = ({ visible, onClosePress }) => {
  const { theme } = useAppContext();
  const [visibilityAnimVal] = useState(new Animated.Value(0));
  const [expandAnimVal] = useState(new Animated.Value(0));
  const [status, setStatus] = useState<Status>("showing");

  const buttonDisabled = status !== "front" && status !== "back";

  const showAnimation = animate(visibilityAnimVal, {
    toValue: 1,
    duration: showAnimDuration,
  });

  const hideAnimation = animate(visibilityAnimVal, {
    toValue: 0,
    duration: hideAnimDuration,
  });

  useOnMount(() => {
    showAnimation.start(() => {
      setStatus("front");
    });
  });

  useOnUpdate((prevVisible) => {
    if (prevVisible && !visible) {
      hideAnimation.start(() => {
        setStatus("hidden");
        // onHide();
      });
    }
  }, visible);

  const handlePress = () => {
    onClosePress();

    setStatus((prevStatus) =>
      prevStatus === "front" ? "to-back" : "to-front"
    );
    animate(expandAnimVal, {
      toValue: status === "front" || status === "to-back" ? 1 : 0,
      duration: expandAnimValDuration,
    }).start(() => {
      setStatus((prevStatus) => (prevStatus === "to-front" ? "front" : "back"));
    });
  };
  const underlayAnimatedStyle = {
    opacity: visibilityAnimVal.interpolate({
      inputRange: [0.99, 1],
      outputRange: [0, 1],
    }),
    transform: [
      interpolateScale(expandAnimVal, {
        inputRange: [0, 1],
        outputRange: [1, Math.ceil(maxExpansionScale)],
      }),
    ],
  };
  const underlayChildrenAnimatedStyle = {
    opacity: expandAnimVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      interpolateTranslateY(expandAnimVal, {
        inputRange: [0, 1],
        outputRange: [expandAnimValFrontTranslateY, 0],
      }),
    ],
  };
  const activeButtonAnimatedStyle = {};

  return (
    <>
      <Animated.View style={styles.buttonContainer}>
        <Animated.View style={[styles.underlay, underlayAnimatedStyle]} />
        <Touchable
          testID="exercise-button-stop"
          onPress={handlePress}
          disabled={buttonDisabled}
          style={styles.stopButtonTouchable}
        >
          <Animated.View
            style={[
              styles.button,
              styles.buttonActive,
              activeButtonAnimatedStyle,
              styles.stopButton,
            ]}
          >
            <Animated.Image
              source={images.iconClose}
              style={[styles.icon, { tintColor: theme.mainColor }]}
            />
          </Animated.View>
        </Touchable>
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={[styles.underlayChildren, underlayChildrenAnimatedStyle]}
      />
    </>
  );
};

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    height: buttonSize,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    marginBottom: buttonSize / 2,
  },
  underlay: {
    position: "absolute",
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    justifyContent: "center",
    alignItems: "center",
    ...shadowStyle,
  },
  underlayChildren: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  backContainer: {},
  button: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    ...shadowStyle,
  },
  buttonInactive: {},
  stopButtonTouchable: {
    position: "absolute",
    zIndex: 2,
  },
  stopButton: {
    backgroundColor: "white",
  },
  icon: {
    width: buttonSize / 3,
    height: buttonSize / 3,
  },
});
