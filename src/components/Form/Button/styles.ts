//@ts-ignore
import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../../global/styles/theme';
//import { TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

//export const Container = styled(TouchableOpacity)`
export const Container = styled(RectButton)`
    width: 100%;
    background-color: ${theme.colors.secondary};
    border-radius:5px;
    align-items: center;
    padding:18px;
`;
export const Title = styled.Text`
    font-family: ${theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.shape};
`;