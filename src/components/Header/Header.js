/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';

@withStyles(styles)
class Header extends Component {

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top wood-darker" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand logo" href="/" ><img src={ require('./gotika-logo.svg') } alt="" height="32" className="middle" /> Kniha recapů</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className="active"><a href="/">Index</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Kampaň <span className="caret"></span></a>
              <ul className="dropdown-menu" role="menu">
                <li><a href="/campaign/dokud-nas-smrt-nebo-neco-horsiho-nerozdeli">Dokud nás smrt nebo něco horšího nerozdělí</a></li>
                <li><a href="/campaign/wings-of-fortune">Wings of Fortune</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
  }

}

export default Header;
