import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getTopics } from "../api/topics";
import CircularProgress from '@mui/material/CircularProgress';
import TopicsList from "../components/TopicsList";
import CreateTopic from "../components/CreateTopic";
import { Pagination } from "@mui/material";

const pageSize = 25;

const Topics = () => {

    const [topics, setTopics] = useState([]);
    const [page, setPage] = useState(1);

    const { isLoading, error } = useQuery({
        queryKey: 'topicsData',
        refetchInterval: 250,
        queryFn: getTopics,
        onSuccess: setTopics
    });

    if (isLoading) return <CircularProgress />;

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
            <CreateTopic />
            <TopicsList items={paginatedData} />
            <Pagination
                count={Math.ceil(topics.length / pageSize)}
                page={page}
                onChange={handlePageChange}
                sx={{ marginLeft: "4%", float: "left" }} />
        </div>
    )
};

export default Topics;