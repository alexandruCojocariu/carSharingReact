// import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { render } from 'react-dom';
// import App from '/imports/ui/App'

// Meteor.startup(() => {
//   render(<App />, document.getElementById('react-target'));
// });

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { setClient } from 'apollo-morpher';
import '../node_modules/antd/dist/antd.min.css';

import App from '/imports/ui/App';
import apolloClient from './apollo';

setClient(apolloClient);

const ApolloApp = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(<ApolloApp />, document.getElementById('react-target'));
