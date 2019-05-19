import { ReactNode } from "react";
import { customScrollBarStyles } from "./shared/custom-scroll-bar.styles";

interface GridProps {
  children: ReactNode;
  className?: string;
}

export const Grid = ({ children, className }: GridProps) => (
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
