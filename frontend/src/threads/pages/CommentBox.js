import React, { useContext, useRef, useState } from "react";
import { useMutation } from "react-query";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AuthContext } from '../../shared/context/auth-context';
import { createPost } from "../api/Threads";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./CommentBox.css";

const CommentBox = () => {
	const { id, name } = useParams();
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const [text, setText] = useState("");
	const textRef = useRef();
	const likes = 0;

	const createPostMutation = useMutation({
		mutationFn: createPost
	})

	const replySubmitHandler = (event) => {
		event.preventDefault();
		createPostMutation.mutate({
			topic_id: id,
			body: textRef.current.value,
			created_by: auth.userId,
			likes: likes,
			token: auth.token
		})
		setText("");
		navigate(`/${id}/${name}/`, { replace: true });
	}

	return (
		<div data-testid="commentBox" className="background" style={{ paddingBottom: '5px' }}>
			<Box
				component="form"
				onSubmit={replySubmitHandler}
				textAlign="center"
				alignContent="center"
				justifyContent="center"
				display="-ms-inline-grid"
				flexGrow="1"
				sx={{
					"& > :not(style)": {
						mt: 1,
						ml: "auto",
						mr: "auto",
						width: "90%",
						height: "100%",
						maxWidth: "800px"
					},
				}}
				noValidate
				autoComplete="off"
			>
				<Box
					display="block"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					sx={{
						"& > :not(style)": {
							mt: 3,
							width: "100%",
						},
					}}
				>
				</Box>
				<TextField
					id="reply"
					name="reply"
					label="Write your reply..."
					multiline={true}
					rows={10}
					variant="outlined"
					inputProps={{ maxLength: 2000 }}
					onChange={(e) => { setText(e.target.value) }}
					value={text}
					inputRef={textRef}
					sx={{
						"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
						{
							borderColor: "black",
						},
						backgroundColor: "#e9e9e9",
					}}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2, display: "block" }}
					className="buttons"
				>
					Post reply
				</Button>
			</Box>
		</div>
	);

}

export default CommentBox;