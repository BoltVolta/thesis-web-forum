import React from "react";
import { useQuery } from "react-query";
import { getTopics } from "../api/topics";
import CircularProgress from '@mui/material/CircularProgress';
import TopicsList from "../components/TopicsList";
import CreateTopic from "../components/CreateTopic";

//import TablePagination from "@mui/material/TablePagination/";

const Topics = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: 'topicsData',
        refetchInterval: 250,
        queryFn: getTopics
    });

    if (isLoading) return (
        <div className="center">
            <CircularProgress />;
        </div>
    );

    if (error) return "An error has occurred: " + error.message;

    return (
        <div>
            <CreateTopic />
            <TopicsList items={data} />
        </div>
    )
};

export default Topics;