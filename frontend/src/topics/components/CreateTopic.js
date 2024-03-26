import React, { useState, useRef, useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Box, Typography, Backdrop, Input } from "@mui/material";
import { AuthContext } from '../../shared/context/auth-context';
import { createTopic } from "../api/topics";
//import TablePagination from "@mui/material/TablePagination/";
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
const CreateTopic = () => {
    const auth = useContext(AuthContext);
    const topicRef = useRef();
    const navigate = useNavigate();

    const [showCreateModal, setShowCreateModal] = useState(false);

    const showCreateHandler = () => setShowCreateModal(true);
    const cancelCreateHandler = () => setShowCreateModal(false);

    const createTopicMutation = useMutation({
        mutationFn: createTopic
    })
    const topicSubmitHandler = (event) => {
        setShowCreateModal(false);
        event.preventDefault();
        createTopicMutation.mutate({
            name: topicRef.current.value,
            token: auth.token
        })
        navigate('/');
    }
    return (
        <>
            <Modal
                open={showCreateModal}
                onClose={cancelCreateHandler}
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
                        New Topic's name
                    </Typography>
                    <Input id="topic" inputRef={topicRef} type="text" label="Topic" className="inputs" sx={{ width: "100%" }} />
                    <Button type='submit' sx={{ display: "grid", margin: "auto", position: "relative" }} delete onClick={topicSubmitHandler}>Create Topic</Button>
                </Box>
            </Modal >
            {auth.isLoggedIn && (
                <div className="button__create">
                    <Button sx={{ width: "90%", backgroundColor: "#fff" }} onClick={showCreateHandler}>Create</Button>
                </div>
            )}
        </>
    )
};

export default CreateTopic;