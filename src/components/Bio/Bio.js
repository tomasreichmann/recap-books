/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Bio.scss';
import slugify from '../../core/slugify';

@withStyles(styles)
class Bio extends Component {

	render() {
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
		
		return <article className="Bio-module container" role="article" >
			<div className="Bio-image col-sm-4" >
				<img src={recap.cover} alt="" className="img-responsive" />
				<h1>{recap.title}</h1>
			</div>
			<div className="cols-sm-8">
				<div className="Bio-text" dangerouslySetInnerHTML={{__html: text || ''}} ></div>
				<hr className="trim8 mt-xlg mb-xlg" />
				<div className="Bio-nav clearfix">
					{characters}
					<p><a className="btn btn-info wood" href={campaignUrl} title={campaign.name} >Zpět na<br/>{campaign.name}</a></p>
					}
				</div>
			</div>
		</article>
	}
}

export default Bio;
	