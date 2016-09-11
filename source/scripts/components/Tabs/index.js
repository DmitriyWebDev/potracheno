import React from 'react';

export default function Tabs(props) {
	return (
		<div className="tabs__nav">
			{props.titles.map((title, index) => (
				<TabsItem
					key={title}
					isActive={props.activeTab === index}
					className="tabs__link"
					onClick={() => props.onTabClick(index)}
				>
					{title}
				</TabsItem>
			))}
		</div>
	);
}

function TabsItem(props) {
	let classes = props.className || '';

	if (props.isActive) {
		classes += ' is-active';
	}

	return (
		<div className={classes.trim()} onClick={props.onClick}>{props.children}</div>
	);
}
