import React from 'react';
import { connect } from 'react-redux';
import assign from 'object-assign';

import EditEvent from '../components/EditEvent';

import createEvent from '../actions/createEvent';
import db from '../database';
import {
	getUserType,
	setUserType,
	reachGoal,
	CREATE_EVENT,
	CREATE_EVENT_INVITED,
	INDEPENDENT,
	INVITED,
} from '../modules/metrics';

const NewEventPage = React.createClass({
	save(eventData) {
		const { dispatch } = this.props;
		const localEvents = db.getLocalEvents();
		const localEventsCount = Object.keys(localEvents).length;
		const userType = getUserType() || setUserType(INDEPENDENT);

		if (localEventsCount === 0 && userType === INDEPENDENT) {
			reachGoal(CREATE_EVENT);
		}

		if (localEventsCount < 2 && userType === INVITED) {
			reachGoal(CREATE_EVENT_INVITED);
		}

		const finalEventData = assign({}, eventData);
		delete finalEventData.updatedParticipants;

		dispatch(createEvent(finalEventData));
	},

	render() {
		return (
			<EditEvent
				pageTitle="Новое мероприятие"
				prevUrl="/events"
				handleSave={this.save}
			/>
		);
	},
});

export default connect()(NewEventPage);
