import {createAction} from 'redux-actions';
import db from '../database';
import {
	CREATE_EVENT_ACTION,
} from '../constants';

const space = '_s_';
const bold = 'b_';

export const getDiff = (oldPs, newPs) => {
	let removed = [];
	let added = [];
	added = newPs.filter((newP) => {
		return !oldPs.includes(newP);
	});

	removed = oldPs.filter((oldP) => {
		return !newPs.includes(oldP);
	});

	return {
		added,
		removed,
	};
};

export const eventActionTypes = {
	changeEventName(currentUser, eventName, date) {
		return {
			text: `${bold}${currentUser}${space}
			изменил(-а)${space}название${space}мероприятия
			${space}на${space}${bold}${eventName}`,
			icon: 'pen',
			date,
		};
	},
	changeEventDate(currentUser, start, end, date) {
		return {
			text: `${bold}${currentUser}${space}изменил(-а)
			${space}время${space}мероприятия${space}
			на${space}${bold}${start}-${end}`,
			icon: 'pen',
			date,
		};
	},
	addParticipantToEvent(currentUser, participantName, date) {
		return {
			text: `${bold}${currentUser}${space}добавил(-а)${space}
			в${space}мероприятие${space}${bold}${participantName}`,
			icon: 'person',
			date,
		};
	},
	removeParticipantFromEvent(currentUser, participantName, date) {
		return {
			text: `${bold}${currentUser}${space}исключил(-а)${space}${bold}${participantName}
			${space}из мероприятия`,
			icon: 'exit',
			date,
		};
	},
	addPurchase(currentUser, purchaseName, sum, date) {
		return {
			text: `${bold}${currentUser}${space}купил(-а)${space}${bold}${purchaseName}
			${space}на${space}сумму`,
			icon: 'purchase',
			date,
			sum,
		};
	},
	deletePurchase(currentUser, purchaseName, date) {
		return {
			text: `${bold}${currentUser}${space}удалил(-а)
			${space}покупку${space}${bold}${purchaseName}`,
			icon: 'pen',
			date,
		};
	},
	addParticipantToPurchase(currentUser, payerName, purchaseName, date) {
		let text;
		if (currentUser === payerName) {
			text = `${bold}${currentUser}${space}добавил(-а)
			${space}себя${space}в${space}покупку${space}${bold}${purchaseName}`;
		} else {
			text = `${bold}${currentUser}${space}добавил(-а)${space}${bold}${payerName}
			${space}в${space}покупку${space}${bold}${purchaseName}`;
		}
		return {
			text,
			icon: 'pen',
			date,
		};
	},
	removeParticipantFromPurchase(currentUser, payerName, purchaseName, date) {
		let text;
		if (currentUser === payerName) {
			text = `${bold}${currentUser}${space}убрал(-а)${space}себя${space}из
			${space}покупки${space}${bold}${purchaseName}`;
		} else {
			text = `${bold}${currentUser}${space}убрал(-а)${space}${bold}${payerName}${space}из
			${space}покупки${space}${bold}${purchaseName}`;
		}
		return {
			text,
			icon: 'pen',
			date,
		};
	},
	giveBackPartially(currentUser, payerName, debtSum, date) {
		return {
			text: `${bold}${currentUser}${space}отметил(-а)${space}долг
			${space}${bold}${payerName}${space}частично${space}возвращенным`,
			icon: 'check-active',
			date,
			debtSum,
		};
	},
	giveBack(currentUser, payerName, debtSum, date) {
		return {
			text: `${bold}${currentUser}${space}отметил(-а)
			${space}долг${space}${bold}${payerName}${space}возвращенным`,
			icon: 'check-active',
			date,
			debtSum,
		};
	},
};

export const createEventAction = createAction(CREATE_EVENT_ACTION);

export function createEventActionAsync(payload) {
	return dispatch => {
		db.addEventAction(payload.eventId, payload.eventActionInfo).then(result => {
			dispatch(createEventAction({
				key: result.key,
				eventActionInfo: result.eventActionInfo,
			}));
		});
	};
}
