import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Text, Snackbar, HelperText } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../store/user";

const LoadingOrError = () => {
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const onDismissSnackBar = () => dispatch(AuthActions.removeError());
  console.log(error);
  return (
    <View>
      <Snackbar
        visible={error != null}
        onDismiss={onDismissSnackBar}
        style={{ position: "absolute" }}
        action={{
          label: "Undo",
          onPress: () => {
            // Do something
          },
        }}
      >
        {error}
      </Snackbar>
      {loading && <ActivityIndicator size='large' />}
    </View>
  );
};

export default LoadingOrError;
