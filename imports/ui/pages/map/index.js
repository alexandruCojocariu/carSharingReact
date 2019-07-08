import React from 'react';
import ReactLeaflet from 'react-leaflet';
import { List, Avatar, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import Geocode from 'react-geocode';
import searchFormSchema from './schema';
import { AutoForm, AutoField, ErrorField, NumField } from 'uniforms-antd';
import gql from 'graphql-tag';
import client from '/client/apollo.js';

const FIND_CARS = gql`
  query findCarsInRadius($input: FindCarsInput!) {
    findCarsInRadius(input: $input) {
      _id
      name
      coordinates
    }
  }
`;

const { Map: LeafletMap, TileLayer, Marker, Popup, Circle } = ReactLeaflet;

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showMap: false,
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
      cars: [],
      radius: 0
    };
  }
  onSearch = value => {
    //
    const { history } = this.props;
  };

  onSubmit = data => {
    this.setState({ showMap: false, loading: true });
    // get cars in radius
    Geocode.setApiKey('AIzaSyDC-pk22snM_St8A_ygg5gGYAQ0bh66dB0');
    Geocode.fromAddress(data.location).then(
      response => {
        if (response.results[0]) {
          const { lat, lng } = response.results[0].geometry.location;
          let input = {};
          console.log('data', data);
          input.radius = data.radius;
          input.coordinates = [];
          input.coordinates.push(lat); //[0] = lat;
          input.coordinates.push(lng); //[1] = lng;
          console.log('input', input);

          delete input.location;
          client
            .mutate({
              mutation: FIND_CARS,
              variables: {
                input
              }
            })
            .then(({ data: { findCarsInRadius } }) => {
              if (findCarsInRadius) {
                console.log('findCarsInRadius', findCarsInRadius);
                this.setState({
                  showMap: true,
                  loading: false,
                  radius: data.radius,
                  lat,
                  lng,
                  cars: findCarsInRadius
                  // zoom: data.radius
                });
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
    const position = [this.state.lat, this.state.lng];
    const { showMap, cars, radius } = this.state;

    return (
      <div>
        <h1>Search for cars</h1>
        <AutoForm schema={searchFormSchema} onSubmit={this.onSubmit}>
          <AutoField name="location" placeholder="Enter the address" label={false} />
          <ErrorField name="location" />

          <NumField decimal={false} name="radius" placeholder="Radius(km)" label={false} />
          <ErrorField name="radius">Radius must be a valid number</ErrorField>

          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </AutoForm>
        {showMap && (
          <LeafletMap center={position} zoom={this.state.zoom}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            <Circle center={position} fillColor="blue" radius={radius * 1000} />

            {cars.map(car => {
              return (
                <Marker position={car.coordinates}>
                  <Popup>
                    {car.name}
                    <br />
                    {car.type}
                    <br />
                    <Link to={`cars/view/${car._id}`}>Details..</Link>
                  </Popup>
                </Marker>
              );
            })}
          </LeafletMap>
        )}
      </div>
    );
  }
}

export default MapView;
