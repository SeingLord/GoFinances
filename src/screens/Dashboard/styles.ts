//@ts-ignore
import styled from 'styled-components/native';
import theme from './../../../src/global/styles/theme';
// npm i react - native - responsive - fontsize--save
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { AntDesign } from "@expo/vector-icons";
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { FlatList, FlatListProps } from "react-native";
import { BorderlessButton } from 'react-native-gesture-handler';
import { DataListProps } from '.';

export const Container = styled.View`
    flex:1;
    background-color: ${theme.colors.background};
`
export const UserWrapper = styled.View`
    width:100%;
    padding:0 24px;
    margin-top: ${getStatusBarHeight() + RFValue(-160)}px;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
`
export const Header = styled.View`
    width:100%;
    background-color:${theme.colors.primary};
    height: ${RFPercentage(42)}px;
    justify-content:center;
    align-items:center;
    flex-direction:row;
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items:center;
`
export const Photo = styled.Image`
    width: ${RFValue(55)}px;
    height: ${RFValue(55)}px;
    border-radius: 10px;
`
export const User = styled.View`
    margin-left:17px;
`
export const UserGreeting = styled.Text`
    color:${theme.colors.shape};
    font-size:${RFValue(18)}px;
    font-family:${theme.fonts.regular};
`
export const UserName = styled.Text`
    color:${theme.colors.shape};
    font-size:${RFValue(18)}px;
    font-family:${theme.fonts.bold};
`
export const LogoutButton = styled(BorderlessButton)``

export const Icon = styled(AntDesign)`
    color:${theme.colors.secondary};
    font-size:${RFValue(55)}px;

`

// attrs pode controlar as propriedades do proprio componente com attrs
export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24 }
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
    flex:1%;
    padding: 0 24px;

`
export const TransactionList = styled(
    FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
).attrs({
    showVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace(),
    }
})``


export const Title = styled.Text`
    font-size:${RFValue(18)}px;
    font-family:${theme.fonts.regular};
    margin-top:${RFPercentage(14)}px;
    margin-bottom: ${RFValue(16)}px;
`

export const LoadContainer = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`