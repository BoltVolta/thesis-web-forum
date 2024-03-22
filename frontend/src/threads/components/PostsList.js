import React from "react";

import ThreadItem from './ThreadItem';

import './PostsList.css';

const PostsList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <h2>No posts found.</h2>
            </div>
        );
    }

    return <ul className="posts-list">
        {props.items.map(post =>
            <ThreadItem
                key={post.id}
                id={post.id}
                topic_id={post.topic_id}
                created_by={post.created_by}
                body={post.body}
                likes={post.likes}
                updated={post.updated}
            />
        )}
    </ul>
};

export default PostsList;