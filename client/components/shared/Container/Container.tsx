import React from "react";

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">{children}</div>
  );
};

export default Container;
