import React, { useContext, useState, useRef, useEffect } from "react";
import { useMutation } from 'react-query'
import { AuthContext } from '../../shared/context/auth-context';
import { editPost, addTheLike } from "../api/Threads";
import { Input, Button, Modal, Box, Typography, Backdrop, IconButton, TextField } from "@mui/material";
import "./ThreadItem.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserInfoItem from "./UserInfoItem";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { createReport } from '../../reports/api/reports';

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
    const reasonRef = useRef();

    const navigate = useNavigate();

    const [updatedDate, setUpdatedDate] = useState();
    const [createdDate, setCreatedDate] = useState();
    const [createdBy, setCreatedBy] = useState();
    const [body, setBody] = useState("");

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [isLiked, setLikedMode] = useState(true);

    const showConfirmationHandler = () => setShowConfirmationModal(true);
    const showEditHandler = () => setShowEditModal(true);
    const showReportHandler = () => setShowReportModal(true);
    const cancelConfirmationHandler = () => setShowConfirmationModal(false);
    const cancelEditHandler = () => setShowEditModal(false);
    const cancelReportHandler = () => setShowReportModal(false);


    const editPostMutation = useMutation({
        mutationFn: editPost,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error)
        }
    });

    const postEditHandler = (event) => {
        event.preventDefault();
        const newUpdate = new Date();
        editPostMutation.mutate({
            id: props.id,
            body: bodyRef.current.value,
            updated: newUpdate,
            token: auth.token
        })
        navigate(`/${id}/${name}`, { replace: true });
    };

    const reportPostMutation = useMutation({
        mutationFn: createReport,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error)
        }
    });

    const reportPostHandler = (event) => {
        event.preventDefault();
        editPostMutation.mutate({
            post_id: props.id,
            reason: reasonRef.current.value,
            user_id: auth.userId,
            token: auth.token
        })
        navigate(`/${id}/${name}`, { replace: true });
    };


    const likePostMutation = useMutation({
        mutationFn: addTheLike
    });

    const addLikePostHandler = (event) => {
        event.preventDefault();
        setLikedMode((prevMode) => !prevMode);
        likePostMutation.mutate({
            id: props.id,
            vote: 1,
            userId: auth.userId,
            token: auth.token
        })
    };
    const removeLikePostHandler = (event) => {
        event.preventDefault();
        setLikedMode((prevMode) => !prevMode);
        likePostMutation.mutate({
            id: props.id,
            vote: -1,
            userId: auth.userId,
            token: auth.token
        })
    };

    useEffect(() => {
        const date = new Date(props.created)
        date.setDate(date.getDate());
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'numeric', year: 'numeric'
        }).replace(/ /g, ' ');
        if (props.created && props.body) {
            setCreatedDate(formattedDate);
            setBody(props.body);
        }
    }, [props.created, props.body]);


    useEffect(() => {
        const date = new Date(props.updated)
        date.setDate(date.getDate());
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'numeric', year: 'numeric'
        }).replace(/ /g, ' ');
        if (props.updated) {
            setUpdatedDate(formattedDate);
        }
    }, [props.updated]);

    useEffect(() => {
        if (props.created_by > 0) {
            setCreatedBy(props.created_by);
        }
    }, [props.created_by]);

    if (createdDate === updatedDate) return (
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
                    <Button onClick={showConfirmationHandler}>Delete</Button>
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
                    <TextField
                        id="body"
                        multiline={true}
                        rows={1000}
                        variant="outlined"
                        inputProps={{ maxLength: 2000 }}
                        onChange={(e) => { setBody(e.target.value) }}
                        value={body}
                        inputRef={bodyRef}
                        type="text" label="body" sx={{ display: "grid", margin: "auto", position: "relative" }} />

                    <Button sx={{ display: "grid", margin: "auto", position: "relative" }} onClick={postEditHandler}>Edit</Button>
                </Box>
            </Modal >

            <Modal
                open={showReportModal}
                onClose={cancelReportHandler}
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
                        Submit report
                    </Typography>
                    <Input id="reason" ref={reasonRef} type="text" label="body" sx={{ display: "grid", margin: "auto", position: "relative" }} />

                    <Button sx={{ display: "grid", margin: "auto", position: "relative" }} onClick={reportPostHandler}>Submit</Button>
                </Box>
            </Modal >

            <div>
                <div className="message-inner">
                    <UserInfoItem items={createdBy} />
                    <div className="message-cell message-cell--main">
                        <header className="message-arrtibution message-attribution--split"><span>{createdDate}</span></header>
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
                                    <span className="actionBar-action" >{props.likes}</span>
                                    {auth.token && (isLiked ? <>
                                        < IconButton
                                            data-testid="thumbUpIcon"
                                            onClick={addLikePostHandler}
                                            sx={{ marginTop: '-15px', marginBottom: '-10px' }}
                                        >
                                            <ThumbUpOffAltIcon />
                                        </IconButton>
                                    </> : <>
                                        <IconButton
                                            data-testid="thumbDownIcon"
                                            onClick={removeLikePostHandler}
                                            sx={{ marginTop: '-15px', marginBottom: '-10px' }}
                                        >
                                            <ThumbUpAltIcon />
                                        </IconButton>
                                    </>)}
                                    {auth.isLoggedIn && (
                                        <a onClick={showEditHandler} data-xf-click="overlay">Edit</a>
                                    )}
                                    <a href="/posts/report" className="actionBar-action actionBar-action--report"
                                        data-xf-click="overlay">Report</a>
                                </div>
                            </div>
                        </footer>
                    </div >
                </div >
            </div >
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
                    <Button onClick={showConfirmationHandler}>Delete</Button>
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

                    <Button sx={{ display: "grid", margin: "auto", position: "relative" }} onClick={postEditHandler}>Edit</Button>
                </Box>
            </Modal >

            <Modal
                open={showReportModal}
                onClose={cancelReportHandler}
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
                        Submit report
                    </Typography>
                    <Input id="reason" ref={reasonRef} type="text" label="body" sx={{ display: "grid", margin: "auto", position: "relative" }} />

                    <Button sx={{ display: "grid", margin: "auto", position: "relative" }} onClick={reportPostHandler}>Submit</Button>
                </Box>
            </Modal >
            <div>
                <div className="message-inner">
                    <UserInfoItem items={props.created_by} />
                    <div className="message-cell message-cell--main">
                        <header className="message-arrtibution message-attribution--split"><span>{createdDate}</span></header>
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
                                <div className="actionBar-set actionBar-set--internal">Last edited: <span>{updatedDate}</span></div>
                                <div className="actionBar-set actionBar-set--external">
                                    <span className="actionBar-action" >{props.likes}</span>
                                    {auth.token && (isLiked ? <>
                                        < IconButton
                                            data-testid="thumbUpIcon"
                                            onClick={addLikePostHandler}
                                            sx={{ marginTop: '-15px', marginBottom: '-10px' }}
                                        >
                                            <ThumbUpOffAltIcon />
                                        </IconButton>
                                    </> : <>
                                        <IconButton
                                            data-testid="thumbDownIcon"
                                            onClick={removeLikePostHandler}
                                            sx={{ marginTop: '-15px', marginBottom: '-7px' }}
                                        >
                                            <ThumbUpAltIcon />
                                        </IconButton>
                                    </>)}
                                    {auth.isLoggedIn && (
                                        <a onClick={showEditHandler} data-xf-click="overlay">Edit</a>
                                    )}
                                    <a href="/posts/report" className="actionBar-action actionBar-action--report"
                                        data-xf-click="overlay" onClick={showReportHandler}>Report</a>
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