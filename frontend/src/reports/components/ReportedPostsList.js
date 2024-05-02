import React from "react";

import ReportedPostItem from './ReportedPostItem';

import '../../threads/components/PostsList.css';

const ReportedPostsList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <h2>No posts found.</h2>
            </div>
        );
    }

    return <ul className="posts-list">
        {props.items.map(post =>
            <ReportedPostItem
                key={post.id}
                id={post.id}
                topic_id={post.topic_id}
                created_by={post.created_by}
                body={post.body}
                likes={post.likes}
                wholiked={post.wholiked}
                created={post.created}
                updated={post.updated}
            />
        )}
    </ul>
};

export default ReportedPostsList;