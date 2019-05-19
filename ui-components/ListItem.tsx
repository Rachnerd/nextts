import { ReactNode } from "react";

interface ListItemProps {
  children: ReactNode;
}

export const ListItem = ({ children }: ListItemProps) => (
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
