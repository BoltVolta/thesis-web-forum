import React, { useState, useRef } from "react";
import "./Threads.css";

const Threads = () => {

    return (
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
                                data-user-id="37541" data-xf-init="member-tooltip" id="js-XFUniqueId78">${comment.username}</a>
                            </h4>
                            <h5 class="userTitle message-userTitle" dir="auto">${comment.user_message}</h5>
                        </div>
                        <span class="message-userArrow"></span>
                    </section>
                </div>
                <div class="message-cell message-cell--main">
                    <div class="message-main js-quickEditTarget">
                        <div class="message-content  js-messageContent">
                            <div class="message-userContent lbContainer js-lbContainer">
                                <article class="message-body js-selectToQuote">
                                    <div class="bbWrapper"><span>${comment.body}</span>
                                    </div>
                                    <div class="js-selectToQuoteEnd">&nbsp;</div>
                                </article>
                            </div>
                        </div>
                        <footer class="message-footer">
                            <div class="message-actionBar actionBar">
                                <div class="message-lastEdit  ">
                                    Last edited: <time>${new Date(comment.date).toLocaleString()}</time>
                                </div>
                                <div class="actionBar-set actionBar-set--external">
                                    <a class="actionBar-action actionBar-action--like"
                                        data-xf-click="overlay">Like</a>
                                    <a href="/posts/report" class="actionBar-action actionBar-action--report"
                                        data-xf-click="overlay">Report</a>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
            <CommentBox />
        </div>
    );
};

export default Threads;