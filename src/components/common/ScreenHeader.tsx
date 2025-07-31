import { ViewProps } from 'tamagui';
import Header from './Header';

type Props = {
  headerText?: string;
} & ViewProps;

export const ScreenHeader = ({ headerText, ...props }: Props) => {
  return <Header headerText={headerText} {...props} />;
};
