import React from "react";
import { useQuery } from "react-query";
import { getTopics } from "../api/topics";
import CircularProgress from '@mui/material/CircularProgress';
import TopicsList from "../components/TopicsList";

const Topics = () => {

    /*const { isLoading, error, data } = useQuery("topicsData", getTopics);

    if (isLoading) return (
        <div className="center">
            <CircularProgress />;
        </div>
    );

    if (error) return "An error has occurred: " + error.message;*/

    const data = [{
        key: 1,
        id: 1,
        name: "test"
    },
    {
        key: 2,
        id: 2,
        name: "test2"
    },
    {
        key: 3,
        id: 3,
        name: "test3"
    }]
    return (
        <div>
            <TopicsList items={data} />
        </div>
    )
};

export default Topics;