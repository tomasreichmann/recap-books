/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Index.scss';
import CampaignList from '../CampaignList';

@withStyles(styles)
class Index extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'Knihy recapů';
    this.context.onSetTitle(title);
    var campaignList = this.props.campaigns && <CampaignList campaigns={this.props.campaigns} /> || null;
    return (
    <div className="container" role="main">
      {campaignList}
    </div>
    );
  }

}

export default Index;
