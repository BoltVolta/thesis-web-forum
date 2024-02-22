import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import axios from "axios";
import { useContext } from 'react';
import { AuthContext } from '../components/auth-context';
import "./AddTip.css"

function commentBox(props) {
	const auth = useContext(AuthContext);

	const AddComment = async () => {
		const comment = { topic_id: req.body.topic_id, body: formikTip.values.body, likes: req.body.likes, created_by: auth.userId };
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_LOCAL_BACKEND_URL}/api/threads/${comment.topic_id}`,
				comment,
				{
					headers: {
						"Content-Type": "application/json",
						'Accept': 'application/json',
						Authorization: 'Bearer ' + auth.token
					},
				}
			);
			formikTip.values.body = "";
			formikTip.errors.body = "";
		} catch (err) {
			console.log(err.message)
		}
	};

	const validateComment = (values) => {
		const errors = {};

		if (!values.body) {
			errors.body = "Please enter a valid message.";
		}
		return errors;
	};

	const formikTip = useFormik({
		initialValues: {
			body: "",
			topic: topic,
		},
		validate: validateComment,
		onSubmit: AddComment,
	});

	let textColor = "";
	let backgroundColor = "";
	let textAreaOutlineColor = "";
	let attentionBackground = "";
	if (props.theme === 'light') {
		textColor = 'black'
		backgroundColor = 'white';
		textAreaOutlineColor = 'primary';
		attentionBackground = "#f2f6fc";
	}
	else {
		textColor = '#ECECEC';
		backgroundColor = '#1c1c1c';
		textAreaOutlineColor = '#bb86fc';
		attentionBackground = "#373737";
	}

	return (
		<div data-testid="commentBox" className="background" style={{ paddingBottom: '10px', paddingTop: '20px' }}>
			<Typography
				component="h5"
				variant="h3"
				textAlign="center"
				color={textColor}
				marginTop="3rem"
				gutterBottom
				sx={{ marginTop: '0' }}
			>
				Write your reply...
			</Typography>
			<Box
				component="form"
				onSubmit={formikTip.handleSubmit}
				textAlign="center"
				alignContent="center"
				justifyContent="center"
				display="-ms-inline-grid"
				flexGrow="1"
				sx={{
					"& > :not(style)": {
						mt: 3,
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
					id="description"
					name="description"
					label="New Tip Description"
					multiline={true}
					rows={10}
					variant="outlined"
					inputProps={{ maxLength: 2000 }}
					onChange={formikTip.handleChange}
					value={formikTip.values.body}
					sx={{
						"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
						{
							borderColor: textAreaOutlineColor,
						},
						backgroundColor: backgroundColor,
					}}
				/>
				{formikTip.errors.body ? (
					<Box
						display="block"
						style={{ color: "red", textAlign: "inherit" }}
					>
						{formikTip.errors.body}
					</Box>
				) : null}
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2, display: "block" }}
					className="buttons"
				>
					New Comment
				</Button>
			</Box>
		</div>
	);
}

export default CommentBox;