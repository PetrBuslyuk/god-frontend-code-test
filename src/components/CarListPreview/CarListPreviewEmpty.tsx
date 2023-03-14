import React from "react";
import { Text } from 'vcc-ui';

/**
 * Displays when cars list preview is empty
 */
export const CarListPreviewEmpty = () => {
  return (
    <Text as={'h2'} extend={{ textAlign: 'center', width: '100%', fontWeight: 600 }}>
      Unfortunately, we did not find any car with your criteria!
    </Text>
  )
}
