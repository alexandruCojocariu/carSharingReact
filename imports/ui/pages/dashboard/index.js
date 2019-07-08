import React from 'react';
import { List, Avatar, Icon, Button } from 'antd';
import { findOwnedCars, findBorrowedCars } from './loaders';
import Geocode from 'react-geocode';

// const { Search } = Input;

const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedCarsLoading: true,
      borrowedCarsLoading: true,
      borrowedCars: null,
      ownedCars: null
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    findOwnedCars(params._id)
      .then(data => {
        this.setState({
          ownedCars: data.ownedCars,
          sharedCarsLoading: false
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      });

    findBorrowedCars(params._id)
      .then(borrowedCars => {
        this.setState({
          borrowedCars,
          borrowedCarsLoading: false
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  }

  render() {
    const { sharedCarsLoading, borrowedCarsLoading, ownedCars, borrowedCars } = this.state;
    if (sharedCarsLoading || borrowedCarsLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Button type="primary" onClick={() => this.props.history.push('/map')}>
          Search for cars
        </Button>
        <div
          style={{
            // backgroundColor: 'red',
            width: '100%',
            height: '50%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
        >
          <List
            style={{ width: '40%' }}
            itemLayout="horizontal"
            dataSource={ownedCars}
            header={<div>My owned cars</div>}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<a href={`/cars/view/${item._id}`}>{item.name}</a>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
          <List
            style={{ width: '40%' }}
            itemLayout="horizontal"
            dataSource={borrowedCars}
            header={<div>My borrowed cars</div>}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<a href={`/cars/view/${item._id}`}>{item.name}</a>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}
