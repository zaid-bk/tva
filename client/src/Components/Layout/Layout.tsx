import * as React from "react";
import Header from "../Header";

interface Props {
  children: JSX.Element[] | JSX.Element | React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div id="main">
      <Header />
        <main>{children}</main>
    </div>
  );
};

export default Layout;
