/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not
 * distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright 2019-2021 Matteo Mazzarolo and the Breathly project contributors.
 */

import { Step } from "../types/Step";

// Given an array of durations (e.g.: [4, 4, 4, 4]) maps it to an array of
// objects with the steps informations
export const buildExerciseSteps = (durations: number[]): Step[] => [
  {
    id: "inhale",
    label: "inhale",
    duration: durations[0] * 1000,
    showDots: false,
    skipped: durations[0] === 0,
  },
  {
    id: "afterInhale",
    label: "hold",
    duration: durations[1] * 1000,
    showDots: true,
    skipped: durations[1] === 0,
  },
  {
    id: "exhale",
    label: "exhale",
    duration: durations[2] * 1000,
    showDots: false,
    skipped: durations[2] === 0,
  },
  {
    id: "afterExhale",
    label: "hold",
    duration: durations[3] * 1000,
    showDots: true,
    skipped: durations[3] === 0,
  },
];
