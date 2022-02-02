import { Button, Form, Input, Typography } from "antd";
import { authApi } from "api";
import { useMutation } from "react-query";
import { Redirect } from "react-router-dom";
import cn from "./style.module.scss";

type FormType = {
  username: string;
  password: string;
};

type Props = {
  token: string | null;
  setToken: (arg: string | null) => void;
};

export const Auth = ({ token, setToken }: Props) => {
  const { mutate } = useMutation((params: authApi.SignInParams) =>
    authApi.signIn(params)
  );
  const onSubmit = (data: FormType) => {
    const dto: authApi.SignInParams = {
      ...data,
      subdomain: "toko",
    };
    mutate(dto, {
      onSuccess(data) {
        setToken(data.data.token);
      },
    });
  };

  if (Boolean(token)) {
    return <Redirect to="/" />;
  }

  return (
    <div className={cn.root}>
      <Form autoComplete="off" className={cn.form} onFinish={onSubmit}>
        <Typography.Title style={{ textAlign: "center" }} level={1}>
          Авторизация
        </Typography.Title>
        <Form.Item
          label="Username"
          name="username"
          className={cn.input}
          rules={[{ required: true, message: "Обязательное поле" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          className={cn.input}
          rules={[{ required: true, message: "Обязательное поле" }]}
        >
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form>
    </div>
  );
};
