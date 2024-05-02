import React, { useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import { Card, Button, Modal, Box, Typography, Backdrop, Input } from "@mui/material";
import { AuthContext } from '../../shared/context/auth-context';
import { deleteReport } from "../api/reports";
import { getUserById } from "../../users/api/users";
import { getPostById } from "../../threads/api/Threads";

const modalBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const center = {
    right: '50%',
    left: '40%'
}

const ReportItem = props => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [createdDate, setCreatedDate] = useState(null);
    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();

    const showConfirmationHandler = () => setShowConfirmationModal(true);
    const cancelConfirmationHandler = () => setShowConfirmationModal(false);

    const { isLoading, error } = useQuery({
        queryKey: ['userId', { userId: props.user_id }],
        queryFn: getUserById,
        enabled: !!props.user_id,
        onSuccess: setUserId
    });

    const deleteReportMutation = useMutation({
        mutationFn: deleteReport,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const deleteConfirmedHandler = () => {
        setShowConfirmationModal(false);
        console.log("Do we get here?");
        deleteReportMutation.mutate({
            id: props.id,
            token: auth.token
        })
        console.log("past deleteReportMutation");
    }

    if (error) return "An error has occurred: " + error.message;

    useEffect(() => {
        const date = new Date(props.created)
        date.setDate(date.getDate());
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'numeric', year: 'numeric'
        }).replace(/ /g, ' ');
        if (props.created) {
            setCreatedDate(formattedDate);
        }

    }, [])

    useEffect(() => {
        let usernames = userId.map(function (element) {
            if (typeof element.username !== "undefined")
                return `${element.username}`;
        });
        setUsername(usernames);
    }, [userId]);

    if (isLoading) {
        return (
            <>
                <Modal
                    open={showConfirmationModal}
                    onClose={cancelConfirmationHandler}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Box sx={modalBox}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" color="common.black">
                            Are you sure?
                        </Typography>
                        <Typography id="modal-modal-description" color="common.black">
                            Once it's gone, it's gone!
                        </Typography>
                        <Button sx={center} onClick={deleteConfirmedHandler}>Delete</Button>
                    </Box>
                </Modal >

                <li className="report-item">
                    <Card >
                        <div className="node node--id1 node--depth2 node--forum node--unread alwaysShow">
                            <div className="node-body">
                                <span className="node-icon" aria-hidden="true">
                                    <i className="fa--xf fal fa-comments" aria-hidden="true">{props.id}</i>
                                </span>
                                <div className="node-main js-nodeMain">
                                    <h3 className="node-title">
                                        <a data-xf-click="overlay" onClick={() => { navigate(`/admin/${props.post_id}`) }} >{props.reason}</a>
                                    </h3>
                                    <div className="node-description node-description--tooltip js-nodeDescTooltip">
                                        <span id="datetime"> Reported By: loading... &nbsp; Created: loading...</span>
                                    </div>
                                </div>
                                <div className="report-item_actions">
                                    {(auth.admin === 1) && (
                                        <div className="button__delete">
                                            <Button onClick={showConfirmationHandler}>Delete</Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                </li>
            </>
        )
    }
    return (
        <>
            <Modal
                open={showConfirmationModal}
                onClose={cancelConfirmationHandler}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Box sx={modalBox}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color="common.black">
                        Are you sure?
                    </Typography>
                    <Typography id="modal-modal-description" color="common.black">
                        Once it's gone, it's gone!
                    </Typography>
                    <Button sx={center} onClick={deleteConfirmedHandler}>Delete</Button>
                </Box>
            </Modal >

            <li className="report-item">
                <Card >
                    <div className="node node--id1 node--depth2 node--forum node--unread alwaysShow">
                        <div className="node-body">
                            <span className="node-icon" aria-hidden="true">
                                <i className="fa--xf fal fa-comments" aria-hidden="true">{props.id}</i>
                            </span>
                            <div className="node-main js-nodeMain">
                                <h3 className="node-title">
                                    <a data-xf-click="overlay" onClick={() => { navigate(`/admin/${props.post_id}`) }} >{props.reason}</a>
                                </h3>
                                <div className="node-description node-description--tooltip js-nodeDescTooltip">
                                    <span id="datetime"> Reported By: {username} &nbsp; Created: {createdDate}</span>
                                </div>
                            </div>
                            <div className="report-item_actions">
                                {(auth.admin === 1) && (
                                    <div className="button__delete">
                                        <Button onClick={showConfirmationHandler}>Delete</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </li>
        </>
    )
};

export default ReportItem;