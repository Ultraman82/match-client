import React, { Component } from "react";
import classnames from "classnames";

class Badge extends Component {
    constructor(props) {
      super(props);
      this.state = {        
      };
    }
        
    shouldComponentUpdate(nextProps, nextStates) {
        if (this.props.uchatn !== nextProps.uchatn) {
          return true;
        }        
        return false;
      }

    render() {
        return (
            <span className="badge badge-danger">
                {this.props.uchats && this.props.uchatn !== 0 ? 
                (this.props.uchatn) : 
                ("")} 
            </span>
        );
    }
};

export default Badge;
