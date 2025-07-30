import { View, ViewProps } from 'tamagui';

export default function GhostView({ ...props }: ViewProps) {
  return <View width={60} {...props}></View>;
}
