import React from 'react';
import EventsList from '../components/EventsList';
import Popup from '../components/Popup';
import Payers from '../components/Payers';

const EventsPage = React.createClass({
	render() {
		return (
			<div>
				<EventsList />
				<Popup
					title="Шашлык"
					closeIcon
					okButton={{
						text: 'Добавить',
						onClick: () => {},
					}}
					cancelButton={{
						text: 'Отменить',
						onClick: () => {},
					}}
				>
					<EventsList />
					<EventsList />
					<EventsList />
					<Payers />
				</Popup>
			</div>
		);
	},
});

export default EventsPage;

