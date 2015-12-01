/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './RecapDetails.scss';
import slugify from '../../core/slugify';

@withStyles(styles)
class RecapDetails extends Component {

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
		var campaign = this.props.campaign;
		var campaignIndex = this.props.campaignIndex;
		var recap = this.props.recap;
		var recapIndex = parseInt(this.props.recapIndex);
		this.context.onSetTitle(recap.title + " | " + campaign.name);
		var campaignSlug = slugify(campaign.name);
		var campaignUrl = "/campaign/"+campaignIndex + "/" + campaignSlug;

		var previousRecapIndex = recapIndex-1;
		var previousRecap = this.getRecapByIndex(previousRecapIndex);
		var previousRecapUrl = previousRecap ? this.getRecapUrl(previousRecap, previousRecapIndex, campaignUrl) : undefined;
		var $previousRecapLink = previousRecapUrl ? <a href={previousRecapUrl} title={previousRecap.title} className="btn btn-info wood">&lt; Předchozí<br/>{previousRecap.title}</a> : undefined

		var nextRecapIndex = recapIndex+1;
		var nextRecap = this.getRecapByIndex(nextRecapIndex);
		var nextRecapUrl = nextRecap ? this.getRecapUrl(nextRecap, nextRecapIndex, campaignUrl) : undefined;
		var $nextRecapLink = nextRecapUrl ? <a href={nextRecapUrl} title={nextRecap.title} className="btn btn-info wood">Následující &gt;<br/>{nextRecap.title}</a> : undefined

		var authorUrl = recap.author && campaignUrl + "/bio/" + slugify(recap.author) || null;
			!recap.authorText && console.log(recapIndex, "recap authorText missing");
			recap.authorText = recap.authorText || "";
		var authorText = recap.authorText && <div className="RecapDetails-author-text">{this.mapAlternate(recap.authorText.split(/#([^#]*)#/), 
			function(textFragment){ return textFragment },
			function(textFragment){ return <a href={authorUrl} key="link">{textFragment}</a>; }
		)}</div> || null;

		var text = recap.text.replace(/\[img([^\]]*)\]/g, '<img src="/' + campaignSlug + '/$1.jpg" alt="" class="RecapDetails-text-image" />' );

		return <article className="RecapDetails container" role="article" >
			<div className="RecapDetails-recap-cover" >
				<img src={recap.cover} alt="" className="img-responsive" />
				<h1 >#{recapIndex+1}&ensp;{recap.title}</h1>
			</div>
			{authorText}
			<div className="RecapDetails-recap-intro" dangerouslySetInnerHTML={{__html: recap.intro || ''}} ></div>
			<hr className="trim8 mt-xlg mb-xlg" />
			<div className="RecapDetails-text clearfix" dangerouslySetInnerHTML={{__html: text || ''}} ></div>
			<hr className="trim8 mt-xlg mb-xlg clearfix" />
			<div className="RecapDetails-nav clearfix">
				<div className="col-sm-4 no-pl">{ $previousRecapLink }</div>
				<div className="col-sm-4 no-pl text-center"><a className="btn btn-info wood" href={campaignUrl} title={campaign.name} >Zpět na<br/>{campaign.name}</a></div>
				<div className="col-sm-4 no-pr text-right">{ $nextRecapLink }</div>
			</div>
		</article>
	}
}

export default RecapDetails;
	