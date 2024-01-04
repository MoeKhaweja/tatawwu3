import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Text, Snackbar, HelperText } from "react-native-paper";
import { useSelector } from "react-redux";

const LoadingOrError = () => {
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  return (
    <View>
      <HelperText
        type='error'
        visible={error != null}
        style={{ alignContent: "center" }}
      >
        {error}
      </HelperText>
      {loading && <ActivityIndicator size='large' />}
    </View>
  );
};

export default LoadingOrError;
