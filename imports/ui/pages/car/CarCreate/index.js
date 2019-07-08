import React from 'react';
import { AutoForm, AutoField, ErrorField } from 'uniforms-antd';
import { Button, notification } from 'antd';
import schema from './schema';
import Geocode from 'react-geocode';
import gql from 'graphql-tag';
import client from '/client/apollo.js';

const ADD_CAR = gql`
  mutation addCar($input: AddCarInput!) {
    addCar(input: $input)
  }
`;

export default class CarCreate extends React.Component {
  onSubmit = data => {
    Geocode.setApiKey('AIzaSyDC-pk22snM_St8A_ygg5gGYAQ0bh66dB0');
    Geocode.fromAddress(data.location).then(
      response => {
        if (response.results[0]) {
          const { lat, lng } = response.results[0].geometry.location;
          data.coordinates = [];
          data.coordinates.push(lat); //[0] = lat;
          data.coordinates.push(lng); //[1] = lng;
          delete data.location;
          client
            .mutate({
              mutation: ADD_CAR,
              variables: {
                input: data
              }
            })
            .then(({ data: { addCar } }) => {
              if (addCar) {
                notification.open({
                  message: 'Car has been created'
                });
                this.props.history.push('/dashboard');
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      error => {
        console.error('error', error);
      }
    );
  };
  render() {
    return (
      <div>
        <AutoForm schema={schema} onSubmit={this.onSubmit}>
          <h1>Add car</h1>
          <AutoField name="name" placeholder="Name of car" label={false} />
          <ErrorField name="name" />

          <AutoField name="type" placeholder="Type of car" label={false} />
          <ErrorField name="type" />

          <p>Is car fueled?</p>
          <AutoField name="fueled" placeholder="" label={false} defaultValue={true} />
          <ErrorField name="fueled" />

          <AutoField name="description" placeholder="Description of car" label={false} />
          <ErrorField name="description" />

          <AutoField name="location" placeholder="Current location of car" label={false} />
          <ErrorField name="location" />

          <Button type="primary" htmlType="submit">
            Add car
          </Button>
        </AutoForm>
      </div>
    );
  }
}
