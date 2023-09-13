import { ReactNode } from "react";

const SingleOptionWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`col-12`}>
      <div className="row">{children}</div>
    </div>
  );
};

export default SingleOptionWrapper;
