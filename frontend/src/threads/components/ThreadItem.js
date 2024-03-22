import React, { useContext, useState, useRef } from "react";
import { useQuery, useMutation } from 'react-query'
import { AuthContext } from '../../shared/context/auth-context';
import { editPost } from "../api/Threads";
import { Input, Button, Modal, Box, Typography, Backdrop, CircularProgress, TextField } from "@mui/material";

import "./ThreadItem.css";

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

const ThreadItem = props => {
    const auth = useContext(AuthContext);

    const bodyRef = useRef();
    const created_byRef = useRef();
    const likesRef = useRef();
    const updatedRef = useRef();

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const showConfirmationHandler = () => setShowConfirmationModal(true);
    const showEditHandler = () => setShowEditModal(true);
    const cancelConfirmationHandler = () => setShowConfirmationModal(false);
    const cancelEditHandler = () => setShowEditModal(false);

    const editPostMutation = useMutation({
        mutationFn: editPost,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const postSubmitHandler = (event) => {
        event.preventDefault();
        editPostMutation.mutate({
            created_by: created_byRef.current.value,
            body: bodyRef.current.value,
            likes: likesRef.current.value,
            updated: updatedRef.current.value,
            token: auth.token
        })
        history.replace('/');
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
                    <Button delete onClick={showConfirmationHandler}>Delete</Button>
                </Box>
            </Modal >
            <Modal
                open={showEditModal}
                onClose={cancelEditHandler}
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
                        Edit Your Post
                    </Typography>
                    <Input id="body" ref={bodyRef} type="text" label="body" sx={{ display: "grid", margin: "auto", position: "relative" }} />

                    <Button sx={{ display: "grid", margin: "auto", position: "relative" }} edit onClick={postSubmitHandler}>Update</Button>
                </Box>
            </Modal >

            <div>
                <div className="message-inner">
                    <div className="message-cell message-cell--user">
                        <section className="message-user">
                            <div className="message-avatar">
                                <div className="message-avatar-wrapper">
                                    <a className="avatar avatar--m">
                                        <img src="https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_700/MTk2OTY2NzAwMDk5MzE1MzQw/pet-turtle-or-tortoise.webp"
                                            srcSet="https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_700/MTk2OTY2NzAwMDk5MzE1MzQw/pet-turtle-or-tortoise.webp"
                                            className="avatar" width="96" height="96" loading="lazy" />
                                    </a>
                                </div>
                            </div>
                            <div className="message-userDetails">
                                <h4 className="message-name"><a className="username " dir="auto" ref={created_byRef}>{props.created_by}</a>
                                </h4>
                            </div>
                            <span className="message-userArrow"></span>
                        </section>
                    </div>
                    <div className="message-cell message-cell--main">
                        <div className="message-main js-quickEditTarget">
                            <div className="message-content  js-messageContent">
                                <div className="message-userContent lbContainer js-lbContainer">
                                    <article className="message-body">
                                        <div className="bbWrapper"><span ref={bodyRef}>{props.body}</span>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <footer className="message-footer">
                                <div className="message-actionBar actionBar">
                                    <div className="actionBar-set actionBar-set--internal">Last edited: <span ref={updatedRef}>{props.updated}</span></div>
                                    <div className="actionBar-set actionBar-set--external">
                                        <a className="actionBar-action actionBar-action--like"
                                            data-xf-click="overlay" ref={likesRef}>Like</a>
                                        {auth.isLoggedIn && (
                                            <a onClick={showEditHandler} data-xf-click="overlay">Edit</a>
                                        )}
                                        <a href="/posts/report" className="actionBar-action actionBar-action--report"
                                            data-xf-click="overlay">Report</a>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThreadItem;