import { ViewProps } from 'tamagui';
import Header from './Header';

type Props = {
  headerText?: string;
} & ViewProps;

export const TabHeader = ({ headerText, ...props }: Props) => {
  return (
    <Header
      headerText={headerText}
      screenType="tab"
      {...props}
    />
  );
};
