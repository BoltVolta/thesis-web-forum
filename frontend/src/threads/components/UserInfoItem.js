import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query'
import { getUserById } from "../../users/api/users";
import { useNavigate, useParams } from "react-router-dom";
import "./ThreadItem.css";

const UserInfoItem = props => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const { id, name } = useParams();

    const { isLoading, error, data, isSuccess } = useQuery({
        queryKey: ['userId', { userId: props.items }],
        queryFn: getUserById,
        enabled: !!props.items

    });
    useEffect(() => {
        if (data) {
            let usernames = data.map(function (element) {
                if (typeof element.username !== "undefined")
                    return `${element.username}`;
            });
            setUsername(usernames);
        }
    }, [data])


    if (isLoading || !username) return (
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
                    <h4 className="message-name"><a className="username " dir="auto">loading...</a>
                    </h4>
                </div>
                <span className="message-userArrow"></span>
            </section>
        </div>);
    if (error) return "An error has occurred: " + error.message;


    return (
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
                    <h4 className="message-name"><a className="username " dir="auto">{username}</a>
                    </h4>
                </div>
                <span className="message-userArrow"></span>
            </section>
        </div>
    );


}

export default UserInfoItem;