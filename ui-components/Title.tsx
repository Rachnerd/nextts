import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}
export const Title = ({ children }: TitleProps) => (
  <h2>
    {children}
    {/*language=CSS*/}
    <style jsx>{`
      h2 {
        margin-top: 0;
      }
    `}</style>
  </h2>
);
