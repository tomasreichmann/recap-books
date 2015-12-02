/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './CampaignDetails.scss';
import slugify from '../../core/slugify';

@withStyles(styles)
class CampaignDetails extends Component {

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
	};

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
		var campaign = this.props.campaign;
		var campaignIndex = this.props.campaignIndex;
		this.context.onSetTitle(campaign.name);
		var recapList = [];
		var campaignSlug = slugify(campaign.name);
		var campaignUrl = "/campaign/"+campaignIndex + "/" + campaignSlug

		for (var recapIndex = 0; recapIndex < campaign.recaps.length; recapIndex++) {
			var recap = campaign.recaps[recapIndex];
			var recapSlug = slugify(recap.title);
			var recapUrl = campaignUrl + "/" + recapIndex + "/" + recapSlug;
			var authorUrl = recap.author && campaignUrl + "/bio/" + slugify(recap.author) || null;
			!recap.authorText && console.log(recapIndex, "recap authorText missing");
			var authorText = recap.authorText && <div className="CampaignDetails-author-text">{this.mapAlternate(recap.authorText.split(/#([^#]*)#/), 
				function(textFragment){ return textFragment },
				function(textFragment){ return <a href={authorUrl} key="link">{textFragment}</a>; }
			)}</div> || null;
			recapList.push(
				<div className="CampaignDetails-recap" key={recapIndex} >
					<a className="CampaignDetails-recap-cover" href={recapUrl} title={recap.title} >
						<img src={recap.cover} alt="" className="img-responsive" />
						<h2>#{recapIndex+1}&ensp;{recap.title}</h2>
					</a>
					<div className="CampaignDetails-recap-text">
						{authorText}
						<div className="CampaignDetails-recap-intro" dangerouslySetInnerHTML={{__html: recap.intro || ''}} ></div>
					</div>
					<p className="CampaignDetails-recap-more"><a href={recapUrl} title={recap.title} className="btn btn-info wood">Více &gt;</a></p>
				</div>
			);
		};

		var $characters = [];
		if( typeof campaign.characters == "object"){
			for( var characterSlug in campaign.characters ){
				var character = campaign.characters[characterSlug];
				var characterUrl = campaignUrl + "/character/" + characterSlug;
				$characters.push(<a href={characterUrl} className="btn btn-primary gold-lighter" key={characterSlug}>{character.name}</a>);
			}
			if ($characters.length > 0){
				$characters = <div className="CampaignDetails-characters" ><hr className="trim7 mt-xlg mb-lg" /><h2>Postavy</h2><p>{$characters}</p></div>;
			}
		}

		var image = campaign.logo ? <div><img className="img-responsive" src={campaign.logo} /></div> : null;
		var campaignDates = campaign.startDate && campaign.endDate ? <p className="CampaignList-date-span">Od: { new Date(campaign.startDate) } do { new Date(campaign.endDate) }</p> : null;

		return <main className="CampaignDetails container" role="main" >
			<div className="CampaignDetails-heading" key={campaignIndex} >
				<div className="CampaignDetails-heading-image" >{image}</div>
				<div className="CampaignDetails-heading-text">
					<h1><a href={campaignUrl} >{campaign.name}</a></h1>
					{campaignDates}
					<p className="CampaignDetails-heading-length">{campaign.recaps.length} Recapů</p>
					<div className="CampaignDetails-heading-description" dangerouslySetInnerHTML={{__html: campaign.description || ''}} ></div>
				</div>
			</div>
			{$characters}
			<hr className="trim8 mt-xlg mb-xlg" />
			<div className="CampaignDetails-recapList" >
				{recapList}
			</div>
		</main>
	}
}

export default CampaignDetails;
	