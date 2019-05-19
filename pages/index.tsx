import * as React from "react";

class Home extends React.Component {
  render() {
    return (
      <div>
        <p>Welcome to Next.js! </p>
        <a href={"./search/server"}>Search server side</a>
        <br />
        <a href={"./search/client"}>Search client side</a>
      </div>
    );
  }
}

export default Home;
