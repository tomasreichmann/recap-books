/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Bio.scss';
import slugify from '../../core/slugify';

@withStyles(styles)
class Bio extends Component {

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
	};

	render() {
		
		var $characters = [];
		var campaign = this.props.campaign;
		var campaignIndex = this.props.campaignIndex;
		var campaignSlug = slugify(campaign.name);
		var campaignUrl = "/campaign/"+campaignIndex + "/" + campaignSlug;
		var character = this.props.character;
		this.context.onSetTitle(character.name + " | " + campaign.name);

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
		
		return <article className="Bio container" role="article" >
			<div className="col-sm-4" >
				<div className="Bio-image" >
					<img src={character.image} alt="" className="img-responsive" />
					<h1>{character.name}</h1>
				</div>
			</div>
			<div className="cols-sm-8">
				<div className="Bio-text" dangerouslySetInnerHTML={{__html: character.bio || ''}} ></div>
				<hr className="trim8 mt-xlg" />
				<div className="Bio-nav clearfix">
					{$characters}
					<p><a className="btn btn-info wood" href={campaignUrl} title={campaign.name} >Zpět na<br/>{campaign.name}</a></p>
				</div>
			</div>
		</article>
	}
}

export default Bio;
	