import React from "react";
import { useQuery } from "react-query";
import CircularProgress from '@mui/material/CircularProgress';
import PostsList from "../components/PostsList";
import CommentBox from "./CommentBox"
import "./Threads.css";

const data = [
    {
        id: 1,
        created_by: "test1",
        body: "this is an example text baby",
        likes: 20,
        updated: new Date(Date.now()).toLocaleString()
    },
    {
        id: 2,
        created_by: "test2",
        body: "this is an example text baby2",
        likes: 10,
        updated: new Date(Date.now()).toLocaleString()
    },
    {
        id: 3,
        created_by: "test1",
        body: "this is a reply text baby",
        likes: 100,
        updated: new Date(Date.now()).toLocaleString()
    },
    {
        id: 4,
        created_by: "test1",
        body: "this is an example text baby",
        likes: 20,
        updated: new Date(Date.now()).toLocaleString()
    },
    {
        id: 5,
        created_by: "test2",
        body: "this is an example text baby2",
        likes: 10,
        updated: new Date(Date.now()).toLocaleString()
    },
    {
        id: 6,
        created_by: "test1",
        body: "this is a reply text baby. this is a reply text baby. this is a reply text baby, this is done to see if there's wrap around and if I need to fix it with new line bullshit or not.\nthis is supposed to be a new line, unless something is fucky wucky",
        likes: 100,
        updated: new Date(Date.now()).toLocaleString()
    }]


const Threads = () => {
    /*
        if (isLoading) return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );*/

    return (
        <>
            <PostsList items={data} />
            <CommentBox />

        </>
    );
};

export default Threads;