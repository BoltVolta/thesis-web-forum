import React from "react";

import TopicItem from './TopicItem';

import './TopicsList.css';

const TopicsList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <h2>No Topics found.</h2>
            </div>
        );
    }

    return <ul className="topics-list">
        {props.items.map(topic =>
            <TopicItem
                key={topic.id}
                id={topic.id}
                name={topic.name}
                created_by={topic.created_by}
                created={topic.created}
            />
        )}
    </ul>
};

export default TopicsList;