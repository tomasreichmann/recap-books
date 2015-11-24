/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './RecapDetails.scss';
import slugify from '../../core/slugify';

@withStyles(styles)
class RecapDetails extends Component {

	mapAlternate(array, fn1, fn2, thisArg) {
		var fn = fn1, output = [];
		for (var i=0; i<array.length; i++){
			output[i] = fn.call(thisArg, array[i], i, array);
			// toggle between the two functions
			fn = fn === fn1 ? fn2 : fn1;
		}
		return output;
	};

	getRecapByIndex(recapIndex){
		console.log("getRecapByIndex", recapIndex, this.props.campaign.recaps, recapIndex in this.props.campaign.recaps);
		console.log("getRecapByIndex", this.props.campaign.recaps[recapIndex]);
		if(recapIndex in this.props.campaign.recaps){
			return this.props.campaign.recaps[recapIndex];
		}
		return undefined;
	};

	getRecapUrl(recap, recapIndex, campaignUrl){
		return campaignUrl + "/" + recapIndex + "/" + slugify(recap.title);
	};

	render() {
		var campaignOutput = [];
		console.log("this.props.campaign", this.props.campaign);
		console.log("this.props.recap", this.props.recap);
		var campaign = this.props.campaign;
		var campaignIndex = this.props.campaignIndex;
		var recap = this.props.recap;
		var recapIndex = parseInt(this.props.recapIndex);
		var campaignSlug = slugify(campaign.name);
		var recapSlug = slugify(recap.title);
		var campaignUrl = "/campaign/"+campaignIndex + "/" +campaignSlug;
		//var recapUrl = campaignUrl + "/" + recapIndex + "/" + recapSlug;

		var previousRecapIndex = recapIndex-1;
		var previousRecap = this.getRecapByIndex(previousRecapIndex);
		var previousRecapUrl = previousRecap ? this.getRecapUrl(previousRecap, previousRecapIndex, campaignSlug) : undefined;
		var $previousRecapLink = previousRecapUrl ? <a href={previousRecapUrl} title={previousRecap.title} className="btn btn-primary wood">&lt; Předchozí<br/>{previousRecap.title}</a> : undefined

		var nextRecapIndex = recapIndex+1;
		var nextRecap = this.getRecapByIndex(nextRecapIndex);
		var nextRecapUrl = nextRecap ? this.getRecapUrl(nextRecap, nextRecapIndex, campaignSlug) : undefined;
		console.log("nextRecap", nextRecap);
		console.log("nextRecapUrl", nextRecapUrl);
		var $nextRecapLink = nextRecapUrl ? <a href={nextRecapUrl} title={nextRecap.title} className="btn btn-primary wood">Následující &gt;<br/>{nextRecap.title}</a> : undefined

		var authorUrl = campaignUrl + "/bio/" + slugify(recap.author);
		var authorText = <div className="RecapDetails-author-text">{this.mapAlternate(recap.authorText.split(/#([^#]*)#/), 
			function(textFragment){ return textFragment },
			function(textFragment){ return <a href={authorUrl} key="link">{textFragment}</a>; }
		)}</div>;

		var text = recap.text.replace(/\[img([^\]]*)\]/, '<img src="/' + campaignSlug + '/$1.jpg" alt="" class="RecapDetails-text-image" />' );

		return <article className="RecapDetails-module container" role="article" >
			<div className="RecapDetails-recap-cover" >
				<img src={recap.cover} alt="" className="img-responsive" />
				<h1 >#{recapIndex}&ensp;{recap.title}</h1>
			</div>
			{authorText}
			<div className="RecapDetails-recap-intro" dangerouslySetInnerHTML={{__html: recap.intro || ''}} ></div>
			<hr className="trim8 mt-xlg mb-xlg" />
			<div className="RecapDetails-text" dangerouslySetInnerHTML={{__html: text || ''}} ></div>
			<hr className="trim8 mt-xlg mb-xlg" />
			<div className="RecapDetails-nav clear">
				<div className="col-sm-6 no-pl">{ $previousRecapLink }</div>
				<div className="col-sm-6 no-pr text-right">{ $nextRecapLink }</div>
			</div>
		</article>
	}
}

export default RecapDetails;
	