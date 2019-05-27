import * as React from "react";
import { Link } from "../routes";

class Home extends React.Component {
  render() {
    return (
      <div>
        <p>Welcome to Next.js! </p>
        <Link route="page">
          <a>Page</a>
        </Link>
      </div>
    );
  }
}

export default Home;
