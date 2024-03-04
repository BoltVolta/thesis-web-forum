import React from "react";

import CircularProgress from '@mui/material/CircularProgress';
import PostsList from "../components/PostsList";
import "./Threads.css";

const Threads = () => {

    if (isLoading) return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );

    return (
        <div>
            <PostsList items={data} />
            <div>
                <CommentBox />
            </div>
        </div>
    );
};

export default Threads;