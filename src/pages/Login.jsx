import { useState } from "react";
import { Card, Form, Grid, Header, Icon, Message } from "semantic-ui-react";
import { useAuthState } from "../context/auth";

import { useForm } from "../utils/hooks";

const initialValue = {
  username: "",
};

export const Login = (props) => {
  const { error, value, handleSubmit, handleInput } = useForm(
    initialValue,
    handleLoginUser
  );

  const { login } = useAuthState();
  const [loading, setLoading] = useState(false);

  function handleLoginUser() {
    setLoading(true);
    login(value);
  }

  return (
    <Grid verticalAlign="middle" style={{ height: "70vh" }}>
      <Grid.Column>
        <Card raised fluid style={{ maxWidth: 700, margin: "auto" }}>
          <Card.Content>
            <div style={{ textAlign: "center" }}>
              <Icon name="user" size="huge" />
            </div>
            <Header textAlign="center" content="Login to Account" size="huge" />
            <Form
              autoComplete="true"
              onSubmit={handleSubmit}
              noValidate
              loading={loading}
              success={false}
              error={!!Object.keys(error).length}
              size="big"
            >
              <Message success header="Success" content="Login successful" />

              <Form.Input
                type="text"
                name="username"
                placeholder="Your username"
                icon="user"
                error={error.username}
                value={value.username}
                onChange={handleInput}
                label="Username"
                required={!!error.username}
              />

              <Form.Button content="Login" fluid size="large" color="green" />
            </Form>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
};
