import React, { useContext } from "react";
import { useQuery } from "react-query";
import CircularProgress from '@mui/material/CircularProgress';
import PostsList from "../components/PostsList";
import CommentBox from "./CommentBox";
import { getPostsByTopicId } from "./../api/Threads";
import "./Threads.css";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

const Threads = () => {
    const auth = useContext(AuthContext);
    const { id, name } = useParams();
    const { isLoading: isLoading, error: error, data: data, status: status } = useQuery({
        queryKey: ['postsByTopicId', { topic_id: id }],
        queryFn: getPostsByTopicId
    });

    if (isLoading) return (
        <div className="center">
            <CircularProgress />;
        </div>
    );
    if (error) return "An error has occurred: " + error.message;

    if (!auth.isLoggedIn) return (
        <>
            <PostsList items={data} />
        </>
    );
    return (
        <>
            <PostsList items={data} />
            <CommentBox />
        </>
    );
};

export default Threads;