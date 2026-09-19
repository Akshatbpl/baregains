import type { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement>;

function Section({ className = "", ...props }: SectionProps) {
  return (
    <section
      className={`space-y-6 ${className}`}
      {...props}
    />
  );
}

export default Section;