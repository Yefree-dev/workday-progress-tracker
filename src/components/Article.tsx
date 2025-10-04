import type { ComponentProps } from "react";
import PinnedImg from "./PinnedImg";

interface ArticleProps {
  title: string;
  date: string;
  metaInfo: string;
  src: string;
  alt: string;
  className?: string;
}

const Article = ({
  title,
  date,
  metaInfo,
  src,
  alt,
  className,
  ...rest
}: ArticleProps & ComponentProps<"article">) => {
  return (
    <article className={`pinned_box ${className}`} {...rest}>
      <div className="pinned_header">
        <div>
          <PinnedImg src={src} alt={alt} />
          <h3>{title}</h3>
        </div>
        <p>{date}</p>
      </div>
      <div className="pinned_body">
        <p>{metaInfo}</p>
      </div>
    </article>
  );
};
export default Article;
