import Header, { HeaderProps } from './Header';

export const TabHeader = ({ headerText, ...props }: HeaderProps) => {
  return <Header headerText={headerText} screenType="tab" {...props} />;
};
