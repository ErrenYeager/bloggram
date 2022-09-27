import React from "react";
import axios from "axios";
import HomePage from "./HomePage";
import { BrowserRouter, Route } from "react-router-dom";
import SelectedPost from "./SelectedPost";

class App extends React.Component {
  state = { selectedPost: null, posts: [], comments: [], users: [] };

  componentDidMount = async () => {
    const downloadedPosts = await axios({
      url: "https://jsonplaceholder.typicode.com/posts",
    });
    this.setState({ posts: downloadedPosts.data });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Route
            path="/"
            exact
            render={() => <HomePage posts={this.state.posts} />}
          />
          <Route path="/:id" exact component={SelectedPost} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
