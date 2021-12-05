/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not
 * distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright 2019-2021 Matteo Mazzarolo and the Breathly project contributors.
 */

import React, { FC, useEffect, useState } from "react";
import { Animated, StyleSheet, TextStyle } from "react-native";
import { useInterval } from "../../hooks/useInterval";
import { useOnMount } from "../../hooks/useOnMount";
import { animate } from "../../utils/animate";
import { formatTimer } from "../../utils/formatTimer";

export type Props = {
  styles?: typeof defaultStyles;
  limit: number;
  onLimitReached: () => void;
};

export const ExerciseTimer: FC<Props> = ({ limit, onLimitReached }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [opacityAnimVal] = useState(new Animated.Value(0));

  const increaseElapsedTime = () => {
    setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
  };

  useInterval(increaseElapsedTime, 1000);

  const showContainerAnimation = animate(opacityAnimVal, {
    toValue: 1,
  });

  useOnMount(() => {
    showContainerAnimation.start();
    return () => {
      showContainerAnimation.stop();
    };
  });

  useEffect(() => {
    if (limit && elapsedTime * 1000 >= limit) {
      onLimitReached();
    }
    // TODO: Check this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, elapsedTime]);

  const containerAnimatedStyle = {
    opacity: opacityAnimVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  const timerText = formatTimer(elapsedTime);

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Animated.Text style={styles.text}>{timerText}</Animated.Text>
    </Animated.View>
  );
};

export const defaultStyles = StyleSheet.create({
  container: {},
  text: {
    textAlign: "center",
    fontSize: 26,
    color: "white",
  } as TextStyle,
});
