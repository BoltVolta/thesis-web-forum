import React, { useState } from "react";

const Topics = () => {
    const [thread, setThread] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ thread });
        setThread("");
    };

    return (<>
        <main className='topics'>
            <h2 className='topicsTitle'>Create a Thread</h2>
            <form className='topicsForm' onSubmit={handleSubmit}>
                <div className='topics__container'>
                    <label htmlFor='thread'>Title / Description</label>
                    <input
                        type='text'
                        name='thread'
                        required
                        value={thread}
                        onChange={(e) => setThread(e.target.value)}
                    />
                </div>
                <button className='homeBtn'>CREATE THREAD</button>
            </form>
            <div className='thread__container'>
                {threadList.map((thread) => (
                    <div className='thread__item' key={thread.id}>
                        <p>{thread.title}</p>
                        <div className='react__container'>
                            <Likes numberOfLikes={thread.likes.length} threadId={thread.id} />
                            <Comments
                                numberOfComments={thread.replies.length}
                                threadId={thread.id}
                                title={thread.title}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    </>);
};

export default Topics;