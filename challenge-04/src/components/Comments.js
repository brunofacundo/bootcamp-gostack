import React from 'react';

import './Comments.css';

function Comments({ comments }) {
    return (
        <div className="post-comments">
            <div className="divider" />
            {comments.map(comment => (
                <div key={comment.id} className="comment">
                    <img className="avatar" src={comment.author.avatar} />
                    <p>
                        <span>{comment.author.name}</span>
                        {comment.content}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Comments;
