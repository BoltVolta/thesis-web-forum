import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import CircularProgress from '@mui/material/CircularProgress';
import PostsList from "../components/PostsList";
import CommentBox from "../components/CommentBox";
import { getPostsByTopicId } from "./../api/Threads";
import "./Threads.css";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { Pagination } from "@mui/material";

const pageSize = 25;

const Threads = () => {

    const [threads, setThreads] = useState([]);
    const [page, setPage] = useState(1);

    const auth = useContext(AuthContext);
    const { id, name } = useParams();

    const { isLoading, error } = useQuery({
        queryKey: ['postsByTopicId', { topic_id: id }],
        refetchInterval: 250,
        queryFn: getPostsByTopicId,
        onSuccess: setThreads
    });

    if (isLoading) return <CircularProgress />;

    if (error) return "An error has occurred: " + error.message;

    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const paginatedData = threads.slice(from, to);

    const handlePageChange = (event, page) => {
        console.log(page);
        setPage(page);
    };

    if (!auth.isLoggedIn) return (
        <>
            <Pagination
                count={Math.ceil(threads.length / pageSize)}
                page={page}
                onChange={handlePageChange}
                sx={{ float: "left" }} />
            <PostsList items={paginatedData} />
            <Pagination
                count={Math.ceil(threads.length / pageSize)}
                page={page}
                onChange={handlePageChange}
                sx={{ float: "left" }} />
        </>
    );

    return (
        <>
            <Pagination
                count={Math.ceil(threads.length / pageSize)}
                page={page}
                onChange={handlePageChange}
                sx={{ float: "left" }} />
            <PostsList items={paginatedData} />
            <Pagination
                count={Math.ceil(threads.length / pageSize)}
                page={page}
                onChange={handlePageChange}
                sx={{ float: "left" }} />
            <CommentBox />
        </>
    );
};

export default Threads;