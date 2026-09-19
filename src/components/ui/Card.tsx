import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

function Card({
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "rounded-lg border border-(--border) bg-(--surface)",
        "p-5 shadow-sm sm:p-6",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;