import React from 'react';

import './Post.css';
import Comments from './Comments';

function Post({ author, date, content, comments }) {
    return (
        <div className="post">
            <div className="post-header">
                <img className="avatar" src={author.avatar} />
                <div className="details">
                    <span>{author.name}</span>
                    <span>{date}</span>
                </div>
            </div>

            <p className="post-content">{content}</p>

            <Comments comments={comments} />
        </div>
    );
}

export default Post;
