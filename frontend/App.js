import * as React from "react";
import {
  ActivityIndicator,
  MD2Colors,
  Provider as PaperProvider,
} from "react-native-paper";
import { View, Text } from "react-native";
import { store } from "./store";
import { Provider } from "react-redux";
import Navigation from "./navigation";

import theme from "./theme";
import { enGB, registerTranslation } from "react-native-paper-dates";
const App = () => {
  registerTranslation("en-GB", enGB);
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Navigation></Navigation>
      </PaperProvider>
    </Provider>
  );
};

export default App;
