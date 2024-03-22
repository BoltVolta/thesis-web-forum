import React from "react";
import { useQuery } from "react-query";
import CircularProgress from '@mui/material/CircularProgress';
import PostsList from "../components/PostsList";
import CommentBox from "./CommentBox";
import { getPostsByTopicId } from "./../api/Threads";
import "./Threads.css";
import { useParams } from "react-router-dom";

const Threads = () => {
    const { id } = useParams();
    const { isLoading, error, data, status } = useQuery({
        queryKey: ['postsByTopicId', { topic_id: id }],
        queryFn: getPostsByTopicId
    });

    if (isLoading) return (
        <div className="center">
            <CircularProgress />;
        </div>
    );

    if (error) return "An error has occurred: " + error.message;

    return (
        <>
            <PostsList items={data} />
            <CommentBox />

        </>
    );
};

export default Threads;