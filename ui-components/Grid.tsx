import { ReactNode } from "react";
import { customScrollBarStyles } from "./shared/custom-scroll-bar.styles";

export const Grid = ({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={className}>
    {children}
    {/*language=CSS*/}
    <style jsx>{`
      div {
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
        border: 1px solid black;
      }
    `}</style>
    <style jsx>{customScrollBarStyles}</style>
  </div>
);
