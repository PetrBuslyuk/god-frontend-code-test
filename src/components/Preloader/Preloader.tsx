import React from "react";
import { Spinner, View } from "vcc-ui";

/**
 * Preloader component
 */
export const Preloader = () => {
  return (
    <View width={'100vw'} height={'100vh'} justifyContent={"center"} alignItems={"center"}>
      <Spinner size={48} />
    </View>
  );
}
