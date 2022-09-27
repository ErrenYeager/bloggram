import React from "react";
import axios from "axios";
import avatar from "./R.png";

class SelectedPost extends React.Component {
  state = { showProfile: false, post: {}, author: {}, relatedComments: [] };

  componentDidMount = async () => {
    const postId = parseInt(window.location.pathname.substring(1));
    const comments = await axios({
      url: `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    });
    const apiPost = await axios({
      url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
    });
    const user = await axios({
      url: `https://jsonplaceholder.typicode.com/users/${apiPost.data.userId}`,
    });
    console.log(apiPost.data.userId);
    this.setState({
      author: user.data,
      relatedComments: comments.data,
      post: apiPost.data,
    });
  };

  renderProfile = () => {
    if (!this.state.showProfile) {
      return null;
    }
    return (
      <div className="profile">
        <img src={avatar} className="profile-avatar" alt="profile avatar" />
        <p className="prof-detail">
          <span className="prof-header">Username: </span>
          {this.state.author.username}
        </p>
        <p className="prof-detail">
          <span className="prof-header">Name: </span>
          {this.state.author.name}
        </p>
        <p className="prof-detail">
          <span className="prof-header">Email: </span>
          {this.state.author.email}
        </p>
        <p className="prof-detail">
          <span className="prof-header">City: </span>
          {this.state.author.address.city}
        </p>
        <p className="prof-detail">
          <span className="prof-header">Website: </span>
          {this.state.author.website}
        </p>
      </div>
    );
  };

  goToStart = () => {
    window.history.pushState({}, "", "/");
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  toggleProfilelabel = () => {
    if (this.state.showProfile) {
      return "Hide prifile details";
    } else {
      return "Show profile details ";
    }
  };

  renderComments = () => {
    if (!this.state.relatedComments) {
      return;
    }
    return this.state.relatedComments.map((comment) => {
      return (
        <li className="comment" key={comment.id}>
          <p className="post-title">{comment.name}</p>
          <p className="post-desc">{comment.body}</p>
          <p className="post-desc">
            <span className="post-desc">Email: </span>
            {comment.email}
          </p>
        </li>
      );
    });
  };

  render() {
    console.log(this.state.author);
    console.log(this.state.relatedComments);
    return (
      <React.Fragment>
        <button onClick={() => this.goToStart()} className="back-button">
          ← Back
        </button>
        {this.renderProfile()}
        <p
          className="toggle-profile"
          onClick={() =>
            this.setState({ showProfile: !this.state.showProfile })
          }
        >
          {this.toggleProfilelabel()}
        </p>
        <div className="selected">
          <h3 className="post-title">{this.state.post.title}</h3>
          <p className="post-desc">{this.state.post.body}</p>
        </div>
        <ul className="comments">{this.renderComments()}</ul>
      </React.Fragment>
    );
  }
}

export default SelectedPost;
