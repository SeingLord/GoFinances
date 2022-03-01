//@ts-ignore
import styled, { css } from 'styled-components/native';

import { Feather } from '@expo/vector-icons'
import theme from '../../global/styles/theme';
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
    type: 'up' | 'down' | 'total'
}
export const Container = styled.View`
    background-color: ${({ type }: TypeProps) =>
        type === 'total' ? theme.colors.secondary : theme.colors.shape};
    font-size:${RFValue(300)}px;
    border-radius: 5px;
    padding:19px 23px;
    padding-bottom: ${RFValue(42)}px;
    margin-right:16px;
    
`;

export const Header = styled.View`
    flex-direction:row;
    justify-content: space-between;
    
`;

export const Title = styled.Text`
    font-family:${theme.fonts.medium};
    font-size:${RFValue(16)}px;
    color: ${({ type }: TypeProps) =>
        type === 'total' ? theme.colors.shape : theme.colors.text_dark};

`;

export const Icon = styled(Feather) <TypeProps>`
    font-size:${RFValue(40)}px;
    ${(props) => props.type === 'up' && css`
    color: ${theme.colors.success}`}
    ${(props) => props.type === 'down' && css`
    color: ${theme.colors.attention}`}
    ${(props) => props.type === 'total' && css`
    color: ${theme.colors.shape}`}
`;

export const Footer = styled.View``;

export const Amout = styled.Text`
    font-family: ${theme.fonts.medium};
    font-size: ${RFValue(32)}px;
    color: ${theme.colors.text_dark};
    margin-top: 38px;
    color: ${({ type }: TypeProps) =>
        type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`;

export const LastTransaction = styled.Text`
    font-family:${theme.fonts.regular};
    font-size:${RFValue(12)}px;
    color:${theme.colors.text};
   color: ${({ type }: TypeProps) =>
        type === 'total' ? theme.colors.shape : theme.colors.text};
`;
