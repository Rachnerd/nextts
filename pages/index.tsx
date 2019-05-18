import * as React from "react";

class Home extends React.Component {
  render() {
    return (
      <div>
        <p>Welcome to Next.js! </p>
        <a href={"./search-client"}>Let the client search</a>
        <br />
        <a href={"./search-server"}>Let the server search</a>
      </div>
    );
  }
}

export default Home;
