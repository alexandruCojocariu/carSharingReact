import React from 'react';
import { findById } from './loaders';
import { Card, Button, Modal, DatePicker, notification } from 'antd';
import gql from 'graphql-tag';
import client from '/client/apollo.js';

const { RangePicker } = DatePicker;
const RESERVE_CAR = gql`
  mutation reserveCar($input: ReserveCarInput!) {
    reserveCar(input: $input) {
      success
    }
  }
`;

export default class CarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: true,
      car: null
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    findById(params._id)
      .then(car => {
        this.setState({
          car,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    const { reservationStartDate, reservationEndDate } = this.state;
    client
      .mutate({
        mutation: RESERVE_CAR,
        variables: {
          input: {
            carId: this.props.match.params.id,
            reservationStartDate,
            reservationEndDate
          }
        }
      })
      .then(({ data: { reserveCar } }) => {
        if (reserveCar.success) {
          this.setState({
            visible: false
          });
          notification.open({
            message: 'Car has been reserved'
          });
          this.props.history.push('/dashboard');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  onDatesChange = (date, dateString) => {
    this.setState({ reservationStartDate: date[0], reservationEndDate: date[1] });
  };

  render() {
    const { loading, car } = this.state;
    if (loading) {
      return <div>loading...</div>;
    }
    return (
      <Card style={{ width: '100%' }}>
        <p>name: {car.name}</p>
        <p>type: {car.type}</p>
        <p>description: {car.description}</p>
        <p>reserved: {car.reserved ? 'yes' : 'no'}</p>
        {!car.reserved && <Button onClick={this.showModal}>Reserve Car</Button>}
        <Modal
          title="Reserve Car"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Select the dates for your reservation</p>
          <RangePicker onChange={this.onDatesChange} />
        </Modal>
      </Card>
    );
  }
}
