import React, { useState } from "react";
import { useQuery } from "react-query";
import CircularProgress from '@mui/material/CircularProgress';
import ReportedPostsList from "../components/ReportedPostsList";
import { getPostById } from "../../threads/api/Threads";
import "../../threads/pages/Threads.css";
import { useParams } from "react-router-dom";


const ReportedPosts = () => {

    const [posts, setPosts] = useState([]);
    const { id } = useParams();

    const { isLoading, error } = useQuery({
        queryKey: ['postsById', { post_id: id }],
        refetchInterval: 250,
        queryFn: getPostById,
        onSuccess: setPosts
    });

    if (isLoading) return <CircularProgress />;

    if (error) return "An error has occurred: " + error.message;

    return (
        <>
            <ReportedPostsList items={posts} />
        </>
    );
};

export default ReportedPosts;