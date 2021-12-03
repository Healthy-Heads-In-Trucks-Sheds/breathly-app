/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not
 * distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright 2019-2021 Matteo Mazzarolo and the Breathly project contributors.
 */

// Lodash's times replacement.
// Example usage: times(3).map(x => `hi`) -> ['hi', 'hi', 'hi']
export const times = (n: number) => Array.from({ length: n }, (_, x) => x);
