/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not
 * distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright 2019-2021 Matteo Mazzarolo and the Breathly project contributors.
 */

import React, { FC, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { animate } from "../../utils/animate";
import { buildExerciseSteps } from "../../utils/buildExerciseSteps";
import { ExerciseInterlude } from "./ExerciseInterlude";
import { useOnMount } from "../../hooks/useOnMount";
import { initializeAudio, releaseAudio } from "../../services/sound";
import { Step } from "../../types/Step";
import { Technique } from "../../types/Technique";

type Status = "interlude" | "running" | "completed";

type TimerProps = {
  elapsedTime: number;
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  onLimitReached: () => void;
};

type CircleProps = {
  steps: Step[];
  elapsedTime: number;
  minimumElapsedTime: number;
  techniqueNumber: number;
};

type Props = {
  techniqueNumber: number;
  technique: Technique;
  timer: React.FC<TimerProps>;
  circle: React.FC<CircleProps>;
  onExerciseFinished: () => void;
};

const unmountAnimDuration = 300;

export const Exercise: FC<Props> = ({
  techniqueNumber,
  technique,
  timer: Timer,
  circle: Circle,
  onExerciseFinished,
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [status, setStatus] = useState<Status>("interlude");
  const [unmountContentAnimVal] = useState(new Animated.Value(1));

  const steps = buildExerciseSteps(technique.steps);

  const timerDuration = technique.moduleDurationMs;

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
        onExerciseFinished();
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
          <Animated.View style={styles.justifyFlexStart}>
            <Timer
              elapsedTime={elapsedTime}
              setElapsedTime={setElapsedTime}
              limit={timerDuration}
              onLimitReached={handleTimeLimitReached}
            />
          </Animated.View>
          <Animated.View style={styles.flex1}>
            <Circle
              steps={steps}
              elapsedTime={elapsedTime}
              minimumElapsedTime={technique.minimumDurationMs}
              techniqueNumber={techniqueNumber}
            />
          </Animated.View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    height: "100%",
  },
  justifyFlexStart: { justifyContent: "flex-start" },
  flex1: {
    flex: 1,
  },
});
