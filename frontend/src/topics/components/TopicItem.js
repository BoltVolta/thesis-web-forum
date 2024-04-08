import React, { useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import { Card, Button, Modal, Box, Typography, Backdrop, Input } from "@mui/material";
import { AuthContext } from '../../shared/context/auth-context';
import { deleteTopic, createTopic } from "../api/topics";
import { getUserById } from "../../users/api/users";
import './TopicItem.css';

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

const TopicItem = props => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [createdDate, setCreatedDate] = useState(null);
    const [username, setUsername] = useState();

    const showConfirmationHandler = () => setShowConfirmationModal(true);
    const cancelConfirmationHandler = () => setShowConfirmationModal(false);

    var linkName = props.name.replace(/ /g, '+');

    const { isLoading, error, data, isSuccess } = useQuery({
        queryKey: ['userId', { userId: props.created_by }],
        queryFn: getUserById,
        staleTime: 5000
    });

    const deleteTopicMutation = useMutation({
        mutationFn: deleteTopic,
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
        deleteTopicMutation.mutate({
            id: props.id,
            token: auth.token
        })
        console.log("past deleteTopicMutation");
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
        if (data) {
            const dataCopy = [...data];
            for (var i = 0, iLen = dataCopy.length; i < iLen; i++) {
                if (typeof dataCopy[i].username != "undefined")
                    setUsername(dataCopy[i].username);
            }
        }
    }, [data, username]);

    if (isLoading || !username) {
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
                        <Button sx={center} delete onClick={deleteConfirmedHandler}>Delete</Button>
                    </Box>
                </Modal >

                <li className="topic-item">
                    <Card >
                        <div className="node node--id1 node--depth2 node--forum node--unread alwaysShow">
                            <div className="node-body">
                                <span className="node-icon" aria-hidden="true">
                                    <i className="fa--xf fal fa-comments" aria-hidden="true">{props.id}</i>
                                </span>
                                <div className="node-main js-nodeMain">
                                    <h3 className="node-title">
                                        <a data-xf-click="overlay" onClick={() => { navigate(`/${props.id}/${linkName}`) }} >{props.name}</a>
                                    </h3>
                                    <div className="node-description node-description--tooltip js-nodeDescTooltip">
                                        <span id="datetime"> Created: loading... &nbsp; Created By: loading... </span>
                                    </div>
                                </div>
                                <div className="topic-item_actions">
                                    {(auth.userId === props.created_by) && (
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


    if (auth.admin === 1) {
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
                        <Button sx={center} delete onClick={deleteConfirmedHandler}>Delete</Button>
                    </Box>
                </Modal >

                <li className="topic-item">
                    <Card >
                        <div className="node node--id1 node--depth2 node--forum node--unread alwaysShow">
                            <div className="node-body">
                                <span className="node-icon" aria-hidden="true">
                                    <i className="fa--xf fal fa-comments" aria-hidden="true">{props.id}</i>
                                </span>
                                <div className="node-main js-nodeMain">
                                    <h3 className="node-title">
                                        <a data-xf-click="overlay" onClick={() => { navigate(`/${props.id}/${linkName}`) }} >{props.name}</a>
                                    </h3>
                                    <div className="node-description node-description--tooltip js-nodeDescTooltip">
                                        <span id="datetime"> Created: {createdDate} &nbsp; Created By: {data[0].username} </span>
                                    </div>
                                </div>
                                <div className="topic-item_actions">
                                    <div className="button__delete">
                                        <Button onClick={showConfirmationHandler}>Delete</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </li>
            </>
        )
    } else {
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
                        <Button sx={center} delete onClick={deleteConfirmedHandler}>Delete</Button>
                    </Box>
                </Modal >

                <li className="topic-item">
                    <Card >
                        <div className="node node--id1 node--depth2 node--forum node--unread alwaysShow">
                            <div className="node-body">
                                <span className="node-icon" aria-hidden="true">
                                    <i className="fa--xf fal fa-comments" aria-hidden="true">{props.id}</i>
                                </span>
                                <div className="node-main js-nodeMain">
                                    <h3 className="node-title">
                                        <a data-xf-click="overlay" onClick={() => { navigate(`/${props.id}/${linkName}`) }} >{props.name}</a>
                                    </h3>
                                    <div className="node-description node-description--tooltip js-nodeDescTooltip">
                                        <span id="datetime"> Created: {createdDate} &nbsp; Created By: {username} </span>
                                    </div>
                                </div>
                                <div className="topic-item_actions">
                                    {(auth.userId === props.created_by) && (
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
};

export default TopicItem;