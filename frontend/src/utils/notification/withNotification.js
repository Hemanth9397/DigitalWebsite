// withNotification.js
import React from "react";
import { notification } from "antd";

const withNotification = (WrappedComponent) => {
  return (props) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = ({ type = "info", message, description }) => {
      api[type]({
        message,
        description,
        placement: "topRight",
        duration: 3,
      });
    };

    return (
      <>
        {contextHolder}
        <WrappedComponent {...props} notify={openNotification} />
      </>
    );
  };
};

export default withNotification;
