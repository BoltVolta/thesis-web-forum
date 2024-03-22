import React, { useState } from "react";
import { useQuery } from "react-query";
import { getTopics } from "../api/topics";
import CircularProgress from '@mui/material/CircularProgress';
import TopicsList from "../components/TopicsList";
//import TablePagination from "@mui/material/TablePagination/";

const Topics = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: 'topicsData',
        queryFn: getTopics
    });

    if (isLoading) return (
        <div className="center">
            <CircularProgress />;
        </div>
    );

    if (error) return "An error has occurred: " + error.message;

    /*
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const paginatedData = data.slice(startIndex, endIndex);

    <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={"Topics per page"}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, rowsPerPage));
                    setPage(0);
                }}
                sx={{ '& .MuiSelect-select': { color: 'black' } }}
                id="pagination"
            />*/
    return (
        <div>

            <TopicsList items={data} />
        </div>
    )
};

export default Topics;