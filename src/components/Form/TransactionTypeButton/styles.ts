//@ts-ignore
import styled, { css } from 'styled-components/native';
// import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import theme from '../../../global/styles/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface IconProps {
    type: "up" | "down";
}
interface ContainerProps {
    isActive: boolean;
    type: "up" | "down";

}
/* border:1px solid ${theme.colors.text} */
// export const Container = styled(TouchableOpacity)`
export const Container = styled.View`
    width:48%;

    border-width:${({ isActive }: ContainerProps) => isActive ? 0 : 1.5}px;
    border-style:solid;
    border-color:${theme.colors.text};
    border-radius: 5px;

    ${({ isActive, type }: ContainerProps) => isActive && type === 'up' && css`
        background-color: ${theme.colors.success_light};
    `};
    ${({ isActive, type }: ContainerProps) => isActive && type === 'down' && css`
        background-color: ${theme.colors.attention_light};
    `};
`
export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding:16px;

`
export const Icon = styled(Feather)`
    font-size:${RFValue(24)}px;
    margin-right:12px;

    color: ${({ type }: IconProps) =>
        type === 'up' ? theme.colors.primary : theme.colors.attention
    };
`;

export const Title = styled.Text`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;
