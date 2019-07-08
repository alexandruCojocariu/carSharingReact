import React from 'react';
import { withApollo } from 'react-apollo';
import RegisterSchema from './schema';

import { createUser } from 'meteor-apollo-accounts';
import { AutoForm, AutoField, ErrorField } from 'uniforms-antd';
import { Button, notification } from 'antd';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit = ({ email, password, firstName, lastName }) => {
    const { history, client } = this.props;

    createUser(
      {
        email,
        username: email,
        password,
        profile: {
          firstName,
          lastName
        }
      },
      client
    )
      .then(data => {
        notification.open({
          message: 'You are now registered'
          // description: 'Check your email!'
        });

        history.push('/dashboard');
      })
      .catch(error => {
        notification.open({
          message: 'Error',
          description: 'Something went bad!'
        });
      });
  };

  render() {
    return (
      <div>
        <AutoForm schema={RegisterSchema} onSubmit={this.onSubmit}>
          <h1>Register</h1>
          <AutoField name="email" placeholder="Enter your email address" label={false} />
          <ErrorField name="email" />

          <AutoField name="firstName" placeholder="Enter your first name" label={false} />
          <ErrorField name="firstName" />

          <AutoField name="lastName" placeholder="Enter your last name" label={false} />
          <ErrorField name="lastName" />

          <AutoField name="password" placeholder="Password" label={false} type="password" />
          <ErrorField name="password" />

          <Button type="primary" htmlType="submit">
            Register
          </Button>

          <Link to="/login">Remember you had an account?</Link>
        </AutoForm>
      </div>
    );
  }
}

export default withApollo(Register);
