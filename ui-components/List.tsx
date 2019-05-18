import { ReactNode } from "react";
import { customScrollBarStyles } from "./shared/custom-scroll-bar.styles";

export const List = ({
  children,
  className
}: {
  children: ReactNode;
  className: string;
}) => (
  <div className={className}>
    {children}

    {/*language=CSS*/}
    <style jsx>{`
      div {
        overflow-y: auto;
        border: 1px solid black;
      }
    `}</style>
    <style jsx>{customScrollBarStyles}</style>
  </div>
);
