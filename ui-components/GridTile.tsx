import { ReactNode } from "react";

interface GridTileProps {
  children: ReactNode;
  rowSize: number;
  className?: string;
}

export const GridTile = ({ children, rowSize, className }: GridTileProps) => {
  return (
    <div className={"grid-tile " + className}>
      {children}
      {/*language=SCSS*/}
      <style jsx>{`
        .grid-tile {
          padding: 1em;
          flex-basis: ${100 / rowSize + "%"};
          box-sizing: border-box;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};
