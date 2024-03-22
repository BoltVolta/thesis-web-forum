import React, { useContext, useState } from "react";
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import { Card, Button, Modal, Box, Typography, Backdrop, StyledEngineProvider, Link } from "@mui/material";
import { AuthContext } from '../../shared/context/auth-context';
import { deleteTopic } from "../api/topics";

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

    const showConfirmationHandler = () => setShowConfirmationModal(true);
    const cancelConfirmationHandler = () => setShowConfirmationModal(false);

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
                    <Button sx={center} delete onClick={deleteConfirmedHandler}>Delete</Button>
                </Box>
            </Modal >

            <li className="topic-item">
                <Card >
                    <div className="node node--id1 node--depth2 node--forum node--unread alwaysShow">
                        <div className="node-body">
                            <span className="node-icon" aria-hidden="true">
                                <i className="fa--xf fal fa-comments" aria-hidden="true"></i>
                            </span>
                            <div className="node-main js-nodeMain">
                                <h3 className="node-title">
                                    <a data-xf-click="overlay" onClick={() => { navigate(`/api/threads/byTopic/${props.id}`) }} >{props.name}</a>
                                </h3>
                                <div className="node-description node-description--tooltip js-nodeDescTooltip">Last Post:
                                    <span id="datetime"> Not implemented yet</span> Comments: <span id="commentNum">Not implemented yet</span>
                                </div>
                            </div>
                            <div className="topic-item_actions">
                                {auth.isLoggedIn && (
                                    <div className="button__delete">
                                        <Button danger onClick={showConfirmationHandler}>Delete</Button>
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

export default TopicItem;