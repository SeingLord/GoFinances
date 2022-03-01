//@ts-ignore
import styled from 'styled-components/native';
import theme from './../../../src/global/styles/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { RFPercentage } from 'react-native-responsive-fontsize';


export const Container = styled.View`
    flex:1;
    
`
export const Header = styled.View`
    width:100%;
    height:70%;

    background-color: ${theme.colors.primary};

    justify-content: flex-end;
    align-items: center;
`
export const TitleWrapper = styled.View`
    align-items: center;
    padding: 0 4%;
`
export const Title = styled.Text`
    font-family: ${theme.fonts.medium};
    color:${theme.colors.shape};
    font-size:${RFValue(30)}px;
    
    text-align: center;
    margin-top:45px;
`
export const SignInTitle = styled.Text`

    font-family: ${theme.fonts.regular};
    color: ${theme.colors.shape};
    font-size: ${RFValue(16)}px;
    padding: 0 20%;

    text-align:center;
    margin-top: 35px;
    margin-bottom:50px;
`;
export const Footer = styled.View`
    width:100%;
    height:30%;

    background-color: ${theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
    margin-top:${RFPercentage(-4)}px;
    padding:0 32px;
    justify-content:space-between;

`;