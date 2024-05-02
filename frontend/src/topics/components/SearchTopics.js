import React, { useState } from "react";
import { useQuery } from "react-query";
import CircularProgress from '@mui/material/CircularProgress';
import TopicsList from "../components/TopicsList";
import { getTopicsByName } from "../api/topics";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import './TopicItem.css';

const pageSize = 25;

const SearchTopics = () => {
    const { name } = useParams();

    const [topics, setTopics] = useState([]);
    const [page, setPage] = useState(1);

    const { isLoading, error } = useQuery({
        queryKey: ['topics', { name: name }],
        queryFn: getTopicsByName,
        onSuccess: setTopics
    });

    if (isLoading) return (
        <div className="center">
            <CircularProgress />;
        </div>
    );

    if (error) return "An error has occurred: " + error.message;

    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const paginatedData = topics.slice(from, to);

    const handlePageChange = (event, page) => {
        setPage(page);
    };


    return (
        <div>
            <Pagination
                count={Math.ceil(topics.length / pageSize)}
                page={page}
                onChange={handlePageChange}
                sx={{ marginLeft: "4%", float: "left" }} />
            <TopicsList items={paginatedData} />
            <Pagination
                count={Math.ceil(topics.length / pageSize)}
                page={page}
                onChange={handlePageChange}
                sx={{ marginLeft: "4%", float: "left" }} />
        </div>
    )
};

export default SearchTopics;