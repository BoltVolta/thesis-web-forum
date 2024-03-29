import React from "react";
import { useQuery } from "react-query";
import CircularProgress from '@mui/material/CircularProgress';
import TopicsList from "../components/TopicsList";
import { getTopicsByName } from "../api/topics";
import { useParams } from "react-router-dom";
import './TopicItem.css';


const SearchTopics = () => {
    const { name } = useParams();
    const { isLoading, error, data, isSuccess } = useQuery({
        queryKey: ['topics', { name: name }],
        queryFn: getTopicsByName
    });

    if (isLoading) return (
        <div className="center">
            <CircularProgress />;
        </div>
    );

    if (error) return "An error has occurred: " + error.message;

    return (
        <div>
            <TopicsList items={data} />
        </div>
    )
};

export default SearchTopics;