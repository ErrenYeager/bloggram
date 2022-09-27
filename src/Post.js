import React from "react";
import { Link } from "react-router-dom";

class Post extends React.Component {
  render() {
    return (
      <Link to={`${this.props.pId}`} className="single-post">
        <h3 className="post-title">{this.props.title}</h3>
        <p className="post-desc">{this.props.body}</p>
      </Link>
    );
  }
}

export default Post;
