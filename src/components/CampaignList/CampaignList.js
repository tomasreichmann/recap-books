/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './CampaignList.scss';
import slugify from '../../core/slugify';

@withStyles(styles)
class CampaignList extends Component {

  render() {
    var campaignOutput = [];
    console.log("this.props.campaigns", this.props.campaigns);
    for (var campaignIndex = 0; campaignIndex < this.props.campaigns.length; campaignIndex++) {
      var campaign = this.props.campaigns[campaignIndex];
      var campaignSlug = slugify(campaign.name);
      var campaignUrl = "/campaign/" + campaignIndex + "/" + campaignSlug;
      var image = campaign.image ? <a href={campaignUrl} ><img className="CampaignList-campaign-image img-responsive" src={campaign.image} /></a> : null;
      var campaignDates = campaign.startDate && campaign.endDate ? <p className="CampaignList-date-span">Od: { new Date(campaign.startDate) } do { new Date(campaign.endDate) }</p> : null;
      campaignOutput.push(
        <div className="CampaignList-campaign" key={campaignIndex} >
          {image}
          <h3 className="h1"><a href={campaignUrl} >{campaign.name}</a></h3>
          {campaignDates}
          <p className="CampaignList-campaign-length">{campaign.recaps.length} Recapů</p>
          <p className="CampaignList-campaign-description"><em>{campaign.description}</em></p>
        </div>
      );
    };
    return (
    <section className="CampaignList-module">
      <div className="page-header">
        <h2>Kampaně</h2>
      </div>
      <div className="CampaignList-campaigns" >{campaignOutput}</div>
    </section>
    );
  }

}

export default CampaignList;
  