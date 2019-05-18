import { ReactNode } from "react";

export const GridTile = ({
  children,
  amountPerRow,
  className
}: {
  children: ReactNode;
  amountPerRow: number;
  className?: string;
}) => {
  return (
    <div className={className}>
      {children}
      {/*language=CSS*/}
      <style jsx>{`
        div {
          padding: 1em;
          flex-basis: ${100 / amountPerRow}%;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};
