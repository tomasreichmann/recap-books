/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './CampaignDetails.scss';
import slugify from '../../core/slugify';

@withStyles(styles)
class CampaignDetails extends Component {

	mapAlternate(array, fn1, fn2, thisArg) {
		var fn = fn1, output = [];
		for (var i=0; i<array.length; i++){
			output[i] = fn.call(thisArg, array[i], i, array);
			// toggle between the two functions
			fn = fn === fn1 ? fn2 : fn1;
		}
		return output;
	};

	render() {
		var campaignOutput = [];
		console.log("this.props.campaign", this.props.campaign);
		var campaign = this.props.campaign;
		var campaignIndex = this.props.campaignIndex;
		var recapList = [];
		var campaignSlug = slugify(campaign.name);
		var campaignUrl = "/campaign/"+campaignIndex + "/" +campaignSlug

		for (var recapIndex = 0; recapIndex < campaign.recaps.length; recapIndex++) {
			var recap = campaign.recaps[recapIndex];
			var recapSlug = slugify(recap.title);
			var recapUrl = campaignUrl + "/" + recapIndex + "/" + recapSlug;
			var authorUrl = campaignUrl + "/bio/" + slugify(recap.author);
			var authorText = <div className="CampaignDetails-author-text">{this.mapAlternate(recap.authorText.split(/#([^#]*)#/), 
				function(textFragment){ return textFragment },
				function(textFragment){ return <a href={authorUrl} key="link">{textFragment}</a>; }
			)}</div>;
			recapList.push(
				<div className="CampaignDetails-recap" key={recapIndex} >
					<div className="CampaignDetails-recap-cover"><img src={recap.cover} alt="" className="img-responsive" /></div>
					<h2><a href={recapUrl} title="{recap.title}">{recap.title}</a></h2>
					{authorText}
					<div className="CampaignDetails-recap-intro" dangerouslySetInnerHTML={{__html: recap.intro || ''}} ></div>
					<p className="text-right"><a href={recapUrl} title={recap.title}>Více &gt;</a></p>
				</div>
			);
		};


		return <main className="CampaignDetails-module container" role="main" >
			<div className="page-header">
				<div className="CampaignDetails-logo"><img src={campaign.logo} alt="" className="img-responsive" /></div>
				<h1 className="text-center">{campaign.name}</h1>
			</div>
			<div className="CampaignDetails-description" dangerouslySetInnerHTML={{__html: campaign.description || ''}} ></div>
			<div className="CampaignDetails-recapList" >
				{recapList}
			</div>
		</main>
	}
}

export default CampaignDetails;
	