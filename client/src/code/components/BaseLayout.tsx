import React, { Component, ReactNode } from "react";
import { createState } from "../state";

class BaseLayout extends Component {

  state = createState(this);

  render(): ReactNode {
    return (
      <>
        <div className="appContainer">

            </div>;
      </>
    );
  }
}

export default BaseLayout;
