import Reat from "react";
import {
  GestureHandlerRootView,
  RectButtonProps,
} from "react-native-gesture-handler";
import { Container, Icon, Title, Button } from "./styles";
// import { TouchableOpacityProps } from "react-native";

interface Props extends RectButtonProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
}
const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};
export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: Props) {
  return (
    <Container isActive={isActive} type={type} {...rest}>
      <GestureHandlerRootView>
        <Button {...rest}>
          <Icon name={icons[type]} type={type} />
          <Title>{title}</Title>
        </Button>
      </GestureHandlerRootView>
    </Container>
  );
}
