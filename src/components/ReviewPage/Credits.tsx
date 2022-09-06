import { GatsbyImage } from "gatsby-plugin-image";
import toSentenceArray from "../../utils/to-sentence-array";
import WatchlistLinks from "../WatchlistLinks";
import {
  backToTopArrowCss,
  backToTopContainerCss,
  backToTopInnerCss,
  containerCss,
  hideDesktopCss,
  listCss,
  posterCss,
  termCss,
  titleCss,
  watchlistCss,
} from "./Credits.module.scss";
import type { Movie } from "./ReviewPage";

export default function Credits({
  movie,
  className,
}: {
  movie: Movie;
  className: string;
}) {
  return (
    <aside id="credits" className={[className, containerCss].join(" ")}>
      {movie.poster && (
        <GatsbyImage
          className={posterCss}
          image={movie.poster.childImageSharp.gatsbyImageData}
          alt={`A poster from ${movie.title} (${movie.year})`}
          loading="eager"
        />
      )}
      <div className={listCss}>
        <div className={hideDesktopCss}>
          <div className={titleCss}>{movie.title}</div>
        </div>
        <dl>
          <div className={hideDesktopCss}>
            <dt className={termCss}>Year</dt>
            <dd>{movie.year}</dd>
            {movie.originalTitle && (
              <>
                <dt className={termCss}>Original Title</dt>
                <dd>{movie.originalTitle}</dd>
              </>
            )}
            <dt className={termCss}>Financing</dt>
            <dd>{toSentenceArray(movie.countries)}</dd>
            <dt className={termCss}>Running Time</dt>
            <dd>{movie.runtimeMinutes} min</dd>
          </div>
          <dt className={termCss}>Directed by</dt>
          <dd>{toSentenceArray(movie.directorNames)}</dd>
          <dt className={termCss}>Starring</dt>
          <dd>{toSentenceArray(movie.principalCastNames)}</dd>
        </dl>
      </div>
      <div className={watchlistCss}>
        <WatchlistLinks movie={movie} />
      </div>
      <a
        href="#top"
        className={[backToTopContainerCss, hideDesktopCss].join(" ")}
      >
        <div className={backToTopInnerCss}>
          <svg viewBox="0 0 24 24" className={backToTopArrowCss}>
            <path d="M7.997 10l3.515-3.79a.672.672 0 0 1 .89-.076l.086.075L16 10 13 10.001V18h-2v-7.999L7.997 10z"></path>
          </svg>
        </div>
      </a>
    </aside>
  );
}
