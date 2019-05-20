import { ReactNode } from "react";
import { customScrollBarStyles } from "./shared/custom-scroll-bar.styles";

interface ListProps {
  children: ReactNode;
  className?: string;
}

export const List = ({ children, className }: ListProps) => (
  <div className={"list " + className}>
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
