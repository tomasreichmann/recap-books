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
      var image = campaign.logo ? <a href={campaignUrl} className="block" ><img className="CampaignList-campaign-image img-responsive" src={campaign.logo} /></a> : null;
      var campaignDates = campaign.startDate && campaign.endDate ? <p className="CampaignList-date-span">Od: { new Date(campaign.startDate) } do { new Date(campaign.endDate) }</p> : null;
      campaignOutput.push(
        <div className="CampaignList-campaign" key={campaignIndex} >
          <div className=" clearfix">
            <div className="col-xs-12 col-sm-4 col-lg-3 col-xlg-2" >{image}</div>
            <div className="col-xs-12 col-sm-8 col-lg-9 col-xlg-10">
              <h3 className="h1"><a href={campaignUrl} >{campaign.name}</a></h3>
              {campaignDates}
              <p className="CampaignList-campaign-length">{campaign.recaps.length} Recapů</p>
              <p className="CampaignList-campaign-description"><em>{campaign.description}</em></p>
            </div>
          </div>
          <hr className="trim8 mt-xlg mb-xlg" />
        </div>
      );
    };
    return (
    <section className="CampaignList">
      <div className="CampaignList-campaigns" >{campaignOutput}</div>
    </section>
    );
  }

}

export default CampaignList;
  