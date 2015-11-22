/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Index.scss';

@withStyles(styles)
class Index extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'Style guide';
    this.context.onSetTitle(title);
    return (
    <div className="container theme-showcase" role="main">
      
      <div className="jumbotron iron-dark text-gray-lighter">
        <h1>Wings of fortune</h1>
        <p><a href="/style-guide" className="btn btn-primary btn-lg gold-lighter" role="button">Style guide »</a></p>
      </div>

    </div>
    );
  }

}

export default Index;
