import { ReactNode } from "react";

export const ListItem = ({ children }: { children: ReactNode }) => (
  <div>
    {children}

    {/*language=CSS*/}
    <style jsx>{`
      div {
        padding: 1em;
        border-bottom: 1px solid black;
      }
      div:last-child {
        border-bottom: none;
      }
    `}</style>
  </div>
);
