import React from 'react';
import { withApollo } from 'react-apollo';
import { loginWithPassword } from 'meteor-apollo-accounts';
import { AutoForm, AutoField, ErrorField } from 'uniforms-antd';
import { Button, notification } from 'antd';
import { LoginSchema } from './schema';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  onSubmit = ({ email, password }) => {
    const { history, client } = this.props;

    loginWithPassword({ email, password }, client)
      .then(() => {
        history.push('/dashboard');
        notification.open({
          message: 'Log in successful'
        });
      })
      .catch(error => {
        notification.open({
          message: 'Error',
          description: 'Username or password incorrect'
        });
      });
  };

  render() {
    return (
      <div>
        <AutoForm schema={LoginSchema} onSubmit={this.onSubmit}>
          <h1>Login</h1>

          <AutoField name="email" placeholder="Enter your email address" label={false} />
          <ErrorField name="email" />

          <AutoField name="password" placeholder="Password" label={false} type="password" />
          <ErrorField name="email" />

          <Button type="primary" htmlType="submit">
            Login
          </Button>

          <div>
            <Link to="/register">Register Now!</Link>
          </div>
        </AutoForm>
      </div>
    );
  }
}

export default withApollo(Login);
