import React from "react";
import { useLogin } from "@refinedev/core";
import { AuthPage } from "@refinedev/antd";

export const Login = () => {
    return (
      <AuthPage
      type="login"
      formProps={{
        initialValues: {
          email: "emp3@giper.fm",
          password: "emp3pass",
        },
      }}
      />
    );
};