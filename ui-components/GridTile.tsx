import { ReactNode } from "react";

interface GridTileProps {
  children: ReactNode;
  rowSize: number;
  className?: string;
}

export const GridTile = ({
  children,
  rowSize,
  className
}: GridTileProps) => {
  return (
    <div className={className}>
      {children}
      {/*language=CSS*/}
      <style jsx>{`
        div {
          padding: 1em;
          flex-basis: ${100 / rowSize}%;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};
