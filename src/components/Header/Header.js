/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';
import slugify from '../../core/slugify';

@withStyles(styles)
class Header extends Component {

  state = {
    campaignDropdownOpen: false,
    mobileNavOpen: false
  }

  toggle(stateVar){
    var stateUpdate = {};
    stateUpdate[stateVar] = !this.state[stateVar]
    this.setState(stateUpdate);
  }

  render() {
    var $campaignLinks = [];
    var campaigns = this.props.data.campaigns;
    for (let campaignIndex = 0; campaignIndex < campaigns.length; campaignIndex++) {
      let campaign = campaigns[campaignIndex];
      let campaignSlug = slugify(campaign.name);
      let campaignUrl = "/campaign/"+campaignIndex + "/" + campaignSlug;
      $campaignLinks.push(<li key={campaignIndex}><a href={campaignUrl}>{campaign.name}</a></li>);
    };
    var campaignDropdownOpenClass = this.state.campaignDropdownOpen && " open" || "";
    var mobileNavOpenClass = this.state.mobileNavOpen && " in" || "";
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top wood-darker" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" onClick={function(){this.toggle("mobileNavOpen")}.bind(this)} data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand logo" href="/" ><img src={ require('./gotika-logo.svg') } alt="" height="32" className="middle" /> Knihy recapů</a>
        </div>
        <div id="navbar" className={"navbar-collapse collapse" + mobileNavOpenClass}>
          <ul className="nav navbar-nav">
            <li><a href="/">Index</a></li>
            <li className={"dropdown"+campaignDropdownOpenClass}>
              <span className="dropdown-toggle a" onClick={function(){this.toggle("campaignDropdownOpen")}.bind(this)} data-toggle="dropdown" role="button" aria-expanded="false">Kampaň <span className="caret"></span></span>
              <ul className="dropdown-menu" role="menu">
                {$campaignLinks}
              </ul>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/style-guide" title="Style guide">Style guide</a></li>
          </ul>
        </div>
      </div>
    </nav>
    );
  }

}

export default Header;
