/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not
 * distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright 2019-2021 Matteo Mazzarolo and the Breathly project contributors.
 */

import React, { FC, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { useAppContext } from "../../context/AppContext";
import { animate } from "../../utils/animate";
import { buildExerciseSteps } from "../../utils/buildExerciseSteps";
import { ExerciseCircle } from "./ExerciseCircle";
import { ExerciseInterlude } from "./ExerciseInterlude";
import { ExerciseTimer } from "./ExerciseTimer";
import { useOnMount } from "../../hooks/useOnMount";
import { initializeAudio, releaseAudio } from "../../services/sound";

type Status = "interlude" | "running" | "completed";

type Props = {};

const unmountAnimDuration = 300;

export const Exercise: FC<Props> = () => {
  const {
    technique,
    timerDuration,
    guidedBreathingMode,
    stepVibrationFlag,
  } = useAppContext();
  const [status, setStatus] = useState<Status>("interlude");
  const [unmountContentAnimVal] = useState(new Animated.Value(1));
  const steps = buildExerciseSteps(technique.durations);

  const unmountContentAnimation = animate(unmountContentAnimVal, {
    toValue: 0,
    duration: unmountAnimDuration,
  });

  useOnMount(() => {
    initializeAudio();

    return () => {
      releaseAudio();
    };
  });

  const handleInterludeComplete = () => {
    setStatus("running");
  };

  const handleTimeLimitReached = () => {
    unmountContentAnimation.start(({ finished }) => {
      if (finished) {
        setStatus("completed");
      }
    });
  };

  const contentAnimatedStyle = {
    opacity: unmountContentAnimVal,
  };

  return (
    <>
      {status === "interlude" && (
        <ExerciseInterlude onComplete={handleInterludeComplete} />
      )}
      {status === "running" && (
        <Animated.View style={[styles.content, contentAnimatedStyle]}>
          <ExerciseTimer
            limit={timerDuration}
            onLimitReached={handleTimeLimitReached}
          />
          <ExerciseCircle
            steps={steps}
            guidedBreathingMode={guidedBreathingMode}
            vibrationEnabled={stepVibrationFlag}
          />
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    height: "100%",
  },
});
