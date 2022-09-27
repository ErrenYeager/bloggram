import React from "react";
import Post from "./Post";
import logo from "./logo.png";

class HomePage extends React.Component {
  renderList = () => {
    return this.props.posts.map((element) => {
      return (
        <Post
          key={element.id}
          pId={element.id}
          title={element.title}
          body={element.body}
        />
      );
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="logo-box">
          <img className="logo-img" src={logo} alt="logo" />
          <h1 className="app-name">Bloggram</h1>
        </div>
        <div className="posts-list">{this.renderList()}</div>
      </React.Fragment>
    );
  }
}

export default HomePage;
