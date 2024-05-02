import React from "react";

import ReportItem from './ReportItem';

const ReportsList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <h2>No Topics found.</h2>
            </div>
        );
    }

    return <ul className="reports-list">
        {props.items.map(report =>
            <ReportItem
                key={report.id}
                id={report.id}
                post_id={report.post_id}
                reason={report.reason}
                user_id={report.user_id}
                created={report.created}
            />
        )}
    </ul>
};

export default ReportsList;