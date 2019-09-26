
import React from 'react';
import { Alert } from 'reactstrap';

export default class AlertFadelessExample extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div>
        <Alert color="primary" isOpen={this.state.visible} toggle={this.onDismiss}>
          I am a primary alert and I can be dismissed without animating!
        </Alert>
      </div>
    );
  }
}
