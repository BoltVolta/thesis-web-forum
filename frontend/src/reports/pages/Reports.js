import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getReports } from "../api/reports";
import CircularProgress from '@mui/material/CircularProgress';
import ReportsList from "../components/ReportsList";
import { Pagination } from "@mui/material";

const pageSize = 25;

const Reports = () => {

    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(1);

    const { isLoading, error } = useQuery({
        queryKey: 'reports',
        refetchInterval: 250,
        queryFn: getReports,
        onSuccess: setReports
    });

    if (isLoading) return <CircularProgress />;

    if (error) return "An error has occurred: " + error.message;

    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const paginatedData = reports.slice(from, to);

    const handlePageChange = (event, page) => {
        setPage(page);
    };

    return (
        <div>
            <Pagination
                count={Math.ceil(reports.length / pageSize)}
                page={page}
                onChange={handlePageChange}
                sx={{ marginLeft: "4%", float: "left" }} />
            <ReportsList items={paginatedData} />
            <Pagination
                count={Math.ceil(reports.length / pageSize)}
                page={page}
                onChange={handlePageChange}
                sx={{ marginLeft: "4%", float: "left" }} />
        </div>
    )
};

export default Reports;