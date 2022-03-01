import React, { useContext, useState } from "react";
import AppleSvg from "../../assets/icon-apple.svg";
import LogoSvg from "../../assets/icon-logo.svg";
import GoogleSvg from "../../assets/icon-google.svg";

import { RFValue } from "react-native-responsive-fontsize";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";
import { SignInSocialButton } from "./../../components/SignInSocialButton/index";
import { useAuth } from "../../hooks/auth";
import { ActivityIndicator, Alert } from "react-native";
import { useTheme } from "styled-components";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
    }
  }

  async function handleSignInWithApple() {
    try {
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Apple");
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)}></LogoSvg>
          <Title>
            Controle suas {"\n"}
            finanças de forma {"\n"}
            muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>Faça seu login com uma das contas abaixo</SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com o Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton
            title="Entrar com a Apple"
            svg={AppleSvg}
            onPress={handleSignInWithApple}
          ></SignInSocialButton>
        </FooterWrapper>
        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
