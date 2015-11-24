/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import CampaignDetails from './components/CampaignDetails';
import RecapDetails from './components/RecapDetails';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import StyleGuide from './components/StyleGuide';
import Index from './components/Index';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

const router = new Router(on => {
	on('*', async (state, next) => {
		const component = await next();
		return component && <App context={state.context}>{component}</App>;
	});

	on('/', async () => {
		const data = await http.get('/data.json');
		return <Index {...data} />
	});

	on('/', async () => <Index />);
	on('/style-guide', async () => <StyleGuide />);

	on('/campaign/:campaignIndex/*/:recapIndex/*', async (state) => {
		const data = await http.get('/data.json');
		console.log("RECAP");
		console.log("campaignIndex", state.params.campaignIndex, "in", data.campaigns, state.params.campaignIndex in data.campaigns);
		console.log("recapIndex", state.params.recapIndex, "in", data.campaigns[state.params.campaignIndex].recaps, state.params.recapIndex in data.campaigns[state.params.campaignIndex].recaps);
		var recapExists = "campaigns" in data
		&& state.params.campaignIndex in data.campaigns
		&& "recaps" in data.campaigns[state.params.campaignIndex]
		&& state.params.recapIndex in data.campaigns[state.params.campaignIndex].recaps;
		return recapExists ? <RecapDetails
			campaign={data.campaigns[state.params.campaignIndex]}
			campaignIndex={state.params.campaignIndex}
			recap={data.campaigns[state.params.campaignIndex].recaps[state.params.recapIndex]}
			recapIndex={state.params.recapIndex} /> : undefined;
	});

	on('/campaign/:campaignIndex/*', async (state) => {
		const data = await http.get('/data.json');
		console.log("CAMPAIGN");
		//console.log("Data", state.params.campaignIndex, "in", data.campaigns, state.params.campaignIndex in data.campaigns);
		return ("campaigns" in data && state.params.campaignIndex in data.campaigns) ? <CampaignDetails
			campaign={data.campaigns[state.params.campaignIndex]}
			campaignIndex={state.params.campaignIndex} /> : undefined;
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
