import { createAnimations } from "@tamagui/animations-react-native";

const animations = createAnimations({
  buttonPress: {
    type: "timing",
    duration: 100,
  },

  fast: {
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },

  medium: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
});

export default animations;
