import * as React from "react";

type HttpCatStatus = 200 | 404 | 500;

interface HttpCatProps {
  status: HttpCatStatus;
}

export const HttpCat = ({ status }: HttpCatProps) => (
  <>
    <img src={`https://http.cat/${status}`} />
    {/*language=CSS*/}
    <style jsx>{`
      img {
        width: 100%;
        max-height: 100%;
      }
    `}</style>
  </>
);
