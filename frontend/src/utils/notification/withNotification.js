// withNotification.js
import { notification } from "antd";

const withNotification = (WrappedComponent) => {

  return (props) => {
    const openNotification = ({ type = "info", message, description }) => {
      notification[type]({
        message,
        description,
        placement: "topRight",
        duration: 300,
      });
    };

    return <WrappedComponent {...props} notify={openNotification} />;
  };
};

export default withNotification;
