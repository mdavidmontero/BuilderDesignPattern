import { useHeaderFactory } from "./HeaderFactory";

const Header = () => {
  const factory = useHeaderFactory();
  return factory.createContainer();
};

export default Header;
