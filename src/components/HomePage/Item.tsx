import toSentenceArray from "../../utils/to-sentence-array";
import { DateIcon } from "../DateIcon";
import { Grade } from "../Grade";
import { Link } from "../Link";
import { RenderedMarkdown } from "../RenderedMarkdown";
import { Still } from "../Still";

export default function Item({
  viewing,
  counterValue,
  eagerLoadImage,
}: {
  viewing: Queries.HomePageQuery["viewings"][0];
  counterValue: number;
  eagerLoadImage: boolean;
}) {
  return (
    <li key={viewing.sequence} value={counterValue}>
      <article>
        <Link rel="canonical" to={`/reviews/${viewing.slug}/`}>
          <Still
            title={viewing.title}
            year={viewing.year}
            image={viewing.backdrop}
            loading={eagerLoadImage ? "eager" : "lazy"}
          />
        </Link>
        <header>
          <h2>
            <Link to={`/reviews/${viewing.slug}/`} rel="canonical">
              {viewing.title} <span>{viewing.year}</span>
            </Link>
          </h2>
          <Grade grade={viewing.grade} width={140} height={28} />
          <p>
            Directed by {toSentenceArray(viewing.directorNames)}. Starring{" "}
            {toSentenceArray(viewing.principalCastNames)}.
          </p>
        </header>
        <RenderedMarkdown text={viewing.excerpt} tag="main" />
        <footer>
          <div>
            <DateIcon /> {viewing.date}
          </div>
        </footer>
      </article>
    </li>
  );
}
