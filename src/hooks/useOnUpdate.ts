/**
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not
 * distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright 2019-2021 Matteo Mazzarolo and the Breathly project contributors.
 */

import { useEffect, useRef } from "react";

export function useOnUpdate<T>(onUpdate: (prevValue: T) => void, value: T) {
  // Flag that inditcates whether we are in a mount or update phase
  const isMounted = useRef<boolean>(false);

  // Create a ref object to store the value
  const valueRef = useRef<T | void>(undefined);

  useEffect(() => {
    const prevValue = valueRef.current as T;
    // If we are in an update effect invoke the callback with the prev value
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      onUpdate(prevValue);
    }
    // Update the ref object each time the value is updated
    valueRef.current = value;
    // TODO: Check this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]); // Run only when the value updates
}
