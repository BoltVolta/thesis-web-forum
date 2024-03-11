import React, { useContext, useState, useRef } from "react";
import { useQuery, useMutation } from 'react-query'
import { AuthContext } from '../../shared/context/auth-context';
import { getPostsByTopicId, editPost } from "../api/Threads";
import { Input, Button, Modal, Box, Typography, Backdrop, CircularProgress } from "@mui/material";

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

    /*const { isLoading, error, data, status } = useQuery({
        queryKey: ['postsById', { topic_id: props.topic_id }],
        queryFn: getPostsByTopicId
    });

    if (isLoading) return (
        <div className="center">
            <CircularProgress />;
        </div>
    );*/

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
                    <Button sx={center} delete onClick={showConfirmationHandler}>Delete</Button>
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
                    <Input id="body" ref={bodyRef} type="text" label="body" />

                    <Button sx={center} edit onClick={postSubmitHandler}>Update</Button>
                </Box>
            </Modal >

            <div>
                <div class="message-inner">
                    <div class="message-cell message-cell--user">
                        <section class="message-user">
                            <div class="message-avatar">
                                <div class="message-avatar-wrapper">
                                    <a class="avatar avatar--m">
                                        <img src="https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_700/MTk2OTY2NzAwMDk5MzE1MzQw/pet-turtle-or-tortoise.webp"
                                            srcset="https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_700/MTk2OTY2NzAwMDk5MzE1MzQw/pet-turtle-or-tortoise.webp"
                                            class="avatar" width="96" height="96" loading="lazy" />
                                    </a>
                                </div>
                            </div>
                            <div class="message-userDetails">
                                <h4 class="message-name"><a class="username " dir="auto"
                                    data-user-id="37541" data-xf-init="member-tooltip" id="js-XFUniqueId78">{props.created_by}</a>
                                </h4>
                            </div>
                            <span class="message-userArrow"></span>
                        </section>
                    </div>
                    <div class="message-cell message-cell--main">
                        <div class="message-main js-quickEditTarget">
                            <div class="message-content  js-messageContent">
                                <div class="message-userContent lbContainer js-lbContainer">
                                    <article class="message-body">
                                        <div class="bbWrapper"><span>{props.body}</span>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <footer class="message-footer">
                                <div class="message-actionBar actionBar">
                                    <div class="actionBar-set actionBar-set--internal">Last edited: <span>{props.updated}</span></div>
                                    <div class="actionBar-set actionBar-set--external">
                                        <a class="actionBar-action actionBar-action--like"
                                            data-xf-click="overlay">Like</a>
                                        {auth.isLoggedIn && (
                                            <div className="button__edit">
                                                <Button inverse onClick={showEditHandler}>Edit</Button>
                                            </div>
                                        )}
                                        <a href="/posts/report" class="actionBar-action actionBar-action--report"
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