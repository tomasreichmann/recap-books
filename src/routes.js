/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
import ContentPage from './components/ContentPage';
import CampaignDetails from './components/CampaignDetails';
import RecapDetails from './components/RecapDetails';
import StyleGuide from './components/StyleGuide';
import Index from './components/Index';
import Bio from './components/Bio';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

var data;
const router = new Router(on => {


	on('*', async (state, next) => {
		const component = await next();
		return component && <App context={state.context} data={data} >{component}</App>;
	});

	on('/', async () => {
		data = data || await http.get('/data.json');
		return <Index {...data} />
	});

	on('/style-guide', async () => <StyleGuide />);

	on('/campaign/:campaignIndex/*/character/:characterSlug', async (state) => {
		data = data || await http.get('/data.json');
		console.log("BIO");
		var characterExists = "campaigns" in data
			&& state.params.campaignIndex in data.campaigns
			&& "characters" in data.campaigns[state.params.campaignIndex]
			&& state.params.characterSlug in data.campaigns[state.params.campaignIndex].characters
		;
		return characterExists ? <Bio
			campaign={data.campaigns[state.params.campaignIndex]}
			campaignIndex={state.params.campaignIndex}
			character={data.campaigns[state.params.campaignIndex].characters[state.params.characterSlug]} /> : false;
	});

	on('/campaign/:campaignIndex/*/:recapIndex/*', async (state) => {
		data = data || await http.get('/data.json');
		var recapExists = "campaigns" in data
			&& state.params.campaignIndex in data.campaigns
			&& "recaps" in data.campaigns[state.params.campaignIndex]
			&& state.params.recapIndex in data.campaigns[state.params.campaignIndex].recaps
		;
		return recapExists ? <RecapDetails
			campaign={data.campaigns[state.params.campaignIndex]}
			campaignIndex={state.params.campaignIndex}
			recap={data.campaigns[state.params.campaignIndex].recaps[state.params.recapIndex]}
			recapIndex={state.params.recapIndex} /> : false;
	});

	on('/campaign/:campaignIndex/*', async (state) => {
		data = data || await http.get('/data.json');
		return ("campaigns" in data && state.params.campaignIndex in data.campaigns) ? <CampaignDetails
			campaign={data.campaigns[state.params.campaignIndex]}
			campaignIndex={state.params.campaignIndex} /> : false;
	});

	//on('/login', async () => <LoginPage />);

	on('*', async (state) => {
		const content = await http.get(`/api/content?path=${state.path}`);
		return content && <ContentPage {...content} />;
	});

	on('error', (state, error) => state.statusCode === 404 ?
		<App context={state.context} error={error}><NotFoundPage /></App> :
		<App context={state.context} error={error}><ErrorPage /></App>
	);
});

export default router;
