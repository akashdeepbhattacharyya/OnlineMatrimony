import Header, { HeaderProps } from './Header';

export const ScreenHeader = ({
  headerText,
  ...props
}: HeaderProps) => {
  return <Header headerText={headerText} {...props} />;
};
