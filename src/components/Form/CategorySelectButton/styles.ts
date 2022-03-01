//@ts-ignore
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import theme from "../../../global/styles/theme";
import { RFValue } from "react-native-responsive-fontsize";

// export const Container = styled.TouchableOpacity.attrs({
export const Container = styled(RectButton).attrs({
  activeOpacity: 0.7,
})`
  background-color: ${theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
    
  border-radius: 5px;
`;
export const Category = styled.Text`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    margin:16px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${theme.colors.text};
  margin:16px;
`;
