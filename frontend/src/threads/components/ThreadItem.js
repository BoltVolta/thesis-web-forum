import React, { useContext, useState, useRef, useEffect } from "react";
import { useMutation } from 'react-query'
import { AuthContext } from '../../shared/context/auth-context';
import { editPost } from "../api/Threads";
import { Input, Button, Modal, Box, Typography, Backdrop } from "@mui/material";
import "./ThreadItem.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserInfoItem from "./UserInfoItem";
import { create } from "@mui/material/styles/createTransitions";

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

    const { id, name } = useParams();

    const bodyRef = useRef();
    const likesRef = useRef();
    const updatedRef = useRef();
    const createdRef = useRef();

    const navigate = useNavigate();

    const [updatedDate, setUpdatedDate] = useState();
    const [createdDate, setCreatedDate] = useState();

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

    const postEditHandler = (event) => {
        event.preventDefault();
        editPostMutation.mutate({
            body: bodyRef.current.value,
            updated: updatedRef.current.value,
            token: auth.token
        })
        navigate(`/${id}/${name}`, { replace: true });
    }

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
        const date = new Date(props.updated)
        date.setDate(date.getDate());
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'numeric', year: 'numeric'
        }).replace(/ /g, ' ');
        if (props.updated) {
            setCreatedDate(formattedDate);
        }
    }, [])

    if (props.created === props.updated) return (
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

                    <Button sx={{ display: "grid", margin: "auto", position: "relative" }} edit onClick={postEditHandler}>Edit</Button>
                </Box>
            </Modal >

            <div>
                <div className="message-inner">
                    <UserInfoItem items={props.created_by} />
                    <div className="message-cell message-cell--main">
                        <header className="message-arrtibution message-attribution--split"><span ref={createdRef}>{createdDate}</span></header>
                        <div className="message-main js-quickEditTarget">
                            <div className="message-content">
                                <div className="message-userContent lbContainer js-lbContainer">
                                    <article className="message-body">
                                        <div className="bbWrapper"><span ref={bodyRef}>{props.body}</span>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                        <footer className="message-footer">
                            <div className="message-actionBar actionBar">
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
        </>
    );

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

                    <Button sx={{ display: "grid", margin: "auto", position: "relative" }} edit onClick={postEditHandler}>Edit</Button>
                </Box>
            </Modal >

            <div>
                <div className="message-inner">
                    <UserInfoItem items={props.created_by} />
                    <div className="message-cell message-cell--main">
                        <header className="message-arrtibution message-attribution--split"><span ref={createdRef}>{createdDate}</span></header>
                        <div className="message-main js-quickEditTarget">
                            <div className="message-content">
                                <div className="message-userContent lbContainer js-lbContainer">
                                    <article className="message-body">
                                        <div className="bbWrapper"><span ref={bodyRef}>{props.body}</span>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                        <footer className="message-footer">
                            <div className="message-actionBar actionBar">
                                <div className="actionBar-set actionBar-set--internal">Last edited: <span ref={updatedRef}>{updatedDate}</span></div>
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
            </div >
        </>
    );
};

export default ThreadItem;