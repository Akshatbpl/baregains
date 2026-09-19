import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

function Container({ className = "", ...props }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-(--content-width) px-(--space-page) ${className}`}
      {...props}
    />
  );
}

export default Container;