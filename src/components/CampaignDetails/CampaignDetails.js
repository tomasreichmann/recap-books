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
		var campaign = this.props.campaign;
		var campaignIndex = this.props.campaignIndex;
		var recapList = [];
		var campaignSlug = slugify(campaign.name);
		var campaignUrl = "/campaign/"+campaignIndex + "/" + campaignSlug

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
					<a className="CampaignDetails-recap-cover" href={recapUrl} title={recap.title} >
						<img src={recap.cover} alt="" className="img-responsive" />
						<h2 className="h1" >#{recapIndex}&ensp;{recap.title}</h2>
					</a>
					{authorText}
					<div className="CampaignDetails-recap-intro" dangerouslySetInnerHTML={{__html: recap.intro || ''}} ></div>
					<p className="text-right"><a href={recapUrl} title={recap.title} className="btn btn-info wood">Více &gt;</a></p>
					<hr className="trim8 mt-xlg mb-xlg" />
				</div>
			);
		};

		var $characters = [];
		if( typeof campaign.characters == "object"){
			for( var characterSlug in campaign.characters ){
				var character = campaign.characters[characterSlug];
				var characterUrl = campaignUrl + "/character/" + characterSlug;
				$characters.push(<a href={characterUrl} className="btn btn-info iron-dark">{character.name}</a>);
			}
			if ($characters.length > 0){
				$characters = <div className="CampaignDetails-characters" ><h2>Postavy</h2><p>{$characters}</p></div>;
			}
		}


		return <main className="CampaignDetails-module container" role="main" >
			<div className="page-header mb-xlg">
				<div className="CampaignDetails-logo"><img src={campaign.logo} alt="" className="img-responsive" /></div>
				<h1 className="text-center">{campaign.name}</h1>
			</div>
			<div className="CampaignDetails-description" dangerouslySetInnerHTML={{__html: campaign.description || ''}} ></div>
			{$characters}
			<hr className="trim8 mt-xlg mb-xlg" />
			<div className="CampaignDetails-recapList" >
				{recapList}
			</div>
		</main>
	}
}

export default CampaignDetails;
	