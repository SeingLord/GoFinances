import React from "react";
//expo install expo-app-loading
import AppLoading from "expo-app-loading";
import { Dashboard } from "./src/screens/Dashboard";
//expo install expo-font @expo-google-fonts/poppins
import { Register } from "./src/screens/Register/index";
import { AppRoutes } from "./src/routes/app.routes";
import { LogBox, StatusBar } from "react-native";
// yarn add intl
import "intl";
import "intl/locale-data/jsonp/pt-BR";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import theme from "./src/global/styles/theme";
import { ThemeProvider } from "styled-components/native";

import { SignIn } from "./src/screens/SignIn";

import { AuthProvider, useAuth } from "./src/hooks/auth";

//import { NavigationContainer } from "@react-navigation/native";

import { Routes } from "./src/routes";

export default function App() {
  const { useStorageLoading } = useAuth();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  if (!fontsLoaded || useStorageLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />

      {/* /* <AppRoutes /> * */}
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

//1076606786383-46o04aktii93j6q2fcjrn90b9l7gagq5.apps.googleusercontent.com

//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
