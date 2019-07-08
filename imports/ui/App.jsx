// import React from 'react';
// import ReactLeaflet from 'react-leaflet';

// const { Map: LeafletMap, TileLayer, Marker, Popup } = ReactLeaflet

// class SimpleExample extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       lat: 51.505,
//       lng: -0.09,
//       zoom: 13
//     }
//   }

//   render() {
//     const position = [this.state.lat, this.state.lng];
//     return (
//       <LeafletMap center={position} zoom={this.state.zoom}>
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
//         />
//         <Marker position={position}>
//           <Popup>
//             A pretty CSS3 popup. <br/> Easily customizable.
//           </Popup>
//         </Marker>
//       </LeafletMap>
//     );
//   }
// }

// export default SimpleExample;

import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import routes from './routes';
import { Layout, Button } from 'antd';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <Button
            style={{
              marginRight: '10px'
            }}
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button>
            <Link to="/register">Register</Link>
          </Button>
        </Header>
        <Content>
          {routes.map((route, idx) => (
            <Route key={idx} exact={true} {...route} />
          ))}
        </Content>
      </Layout>
    );
  }
}

export default App; //withRouter(App);
