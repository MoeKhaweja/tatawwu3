import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Snackbar, HelperText } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { removeError } from "../../store/user";

const LoadingOrError = () => {
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const onDismissSnackBar = () => dispatch(removeError());

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Snackbar
        visible={error != null}
        onDismiss={onDismissSnackBar}
        style={{ position: "absolute" }}
        action={{
          label: "dismiss",
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
