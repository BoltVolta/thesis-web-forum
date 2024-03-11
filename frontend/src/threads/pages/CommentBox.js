import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { createPost } from "../api/Threads";
import "./CommentBox.css";
function CommentBox(props) {
	const auth = useContext(AuthContext);

	const validateComment = (values) => {
		const errors = {};

		if (!values.body) {
			errors.body = "Please enter a valid message.";
		}
		return errors;
	};

	const formikPost = useFormik({
		initialValues: {
			body: "",
		},
		validate: validateComment,
		onSubmit: createPost,
	});



	return (
		<div data-testid="commentBox" className="background" style={{ paddingBottom: '5px' }}>
			<Box
				component="form"
				onSubmit={formikPost.handleSubmit}
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
					id="body"
					name="post"
					label="Write your reply..."
					multiline={true}
					rows={10}
					variant="outlined"
					inputProps={{ maxLength: 2000 }}
					onChange={formikPost.handleChange}
					value={formikPost.values.body}
					sx={{
						"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
						{
							borderColor: "black",
						},
						backgroundColor: "#e9e9e9",
					}}
				/>
				{formikPost.errors.body ? (
					<Box
						display="block"
						style={{ color: "red", textAlign: "inherit" }}
					>
						{formikPost.errors.body}
					</Box>
				) : null}
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