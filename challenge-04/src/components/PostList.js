import React, { Component } from 'react';

import './PostList.css';
import data from '../assets/data';
import Post from './Post';

class PostList extends Component {
    state = {
        posts: data
    };

    render() {
        const { posts } = this.state;

        return (
            <div className="postList">
                {posts.map(post => (
                    <Post key={post.id} {...post} />
                ))}
            </div>
        );
    }
}

export default PostList;
