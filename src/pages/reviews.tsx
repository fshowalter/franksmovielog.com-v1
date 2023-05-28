import { graphql } from "gatsby";
import { useReducer } from "react";
import Select from "react-select";
import { Box } from "../components/Box";
import { DebouncedInput } from "../components/DebouncedInput";
import { Grade } from "../components/Grade";
import { GradeInput } from "../components/GradeInput";
import { HeadBuilder } from "../components/HeadBuilder";
import { LabelText } from "../components/LabelText";
import { Link } from "../components/Link";
import { ListItemPoster } from "../components/ListItemPoster";
import { ListItemTitle } from "../components/ListItemTitle";
import {
  GroupedList,
  GroupedListItem,
  ListWithFiltersLayout,
} from "../components/ListWithFiltersLayout";
import { PageTitle } from "../components/PageTitle";
import { SelectField } from "../components/SelectField";
import { Spacer } from "../components/Spacer";
import { YearInput } from "../components/YearInput";
import {
  backgroundColors,
  borderColors,
  foregroundColors,
} from "../styles/colors.css";
import type { Sort } from "./reviews.reducer";
import {
  Action,
  ActionType,
  State,
  initState,
  reducer,
} from "./reviews.reducer";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="Reviews"
      description="A sortable and filterable list of every movie I've reviewed since 2012."
      image={null}
      article={false}
    />
  );
}

function Header({ data }: { data: Queries.ReviewsPageQuery }) {
  return (
    <>
      <PageTitle textAlign="center">Reviews</PageTitle>
      <Box as="q" display="block" textAlign="center" color="subtle">
        We have such sights to show you.
      </Box>
      <Spacer axis="vertical" size={16} />

      <Box color="subtle">
        <Spacer axis="vertical" size={16} />
        <p>
          Since 2012, I&apos;ve published{" "}
          <Box as="span" color="emphasis">
            {data.review.nodes.length.toLocaleString()}
          </Box>{" "}
          reviews.
        </p>
        <Spacer axis="vertical" size={16} />
        <p>
          <Box as="span" fontWeight="semiBold">
            Looking for something new?
          </Box>
          <br /> Peruse my list of{" "}
          <Link to="/reviews/underseen/">underseen gems</Link>.
        </p>
        <Spacer axis="vertical" size={16} />
        <p>
          <Box as="span" fontWeight="semiBold">
            Feeling contrarian?
          </Box>
          <br />
          Behold my list of{" "}
          <Link to="/reviews/overrated/">overrated disappointments</Link>.
        </p>
      </Box>
    </>
  );
}

function Filters({
  dispatch,
  state,
  data,
}: {
  dispatch: React.Dispatch<Action>;
  state: State;
  data: Queries.ReviewsPageQuery;
}) {
  return (
    <>
      <DebouncedInput
        label="Title"
        placeholder="Enter all or part of a title"
        onInputChange={(value) =>
          dispatch({ type: ActionType.FILTER_TITLE, value })
        }
      />
      <YearInput
        label="Release Year"
        years={data.review.releaseYears}
        onYearChange={(values) =>
          dispatch({ type: ActionType.FILTER_RELEASE_YEAR, values })
        }
      />
      <YearInput
        label="Review Year"
        years={data.review.reviewYears}
        onYearChange={(values) =>
          dispatch({ type: ActionType.FILTER_REVIEW_YEAR, values })
        }
      />
      <GradeInput
        label="Grade"
        onGradeChange={(values) =>
          dispatch({
            type: ActionType.FILTER_GRADE,
            values,
          })
        }
      />
      <Box display="flex" flexDirection="column" textAlign="left">
        <LabelText text="Genres" as="label" htmlFor="genres" />
        <Select
          inputId="genres"
          theme={(theme) => ({
            ...theme,
            borderRadius: 4,
            colors: {
              ...theme.colors,
              neutral0: backgroundColors.subtle,
              neutral20: borderColors.default,
              neutral50: foregroundColors.subtle,
              danger: foregroundColors.accent,
              primary25: backgroundColors.stripe,
            },
          })}
          classNamePrefix="reactSelect"
          isSearchable={false}
          onChange={(e) =>
            dispatch({
              type: ActionType.FILTER_GENRES,
              values: e.map((selection) => selection.value),
            })
          }
          isMulti={true}
          options={data.review.genres.map((genre) => {
            return { value: genre, label: genre };
          })}
        />
      </Box>
      <SelectField
        value={state.sortValue}
        label="Order By"
        onChange={(e) =>
          dispatch({
            type: ActionType.SORT,
            value: e.target.value as Sort,
          })
        }
      >
        <option value="title-asc">Title (A &rarr; Z)</option>
        <option value="title-desc">Title (Z &rarr; A)</option>
        <option value="grade-desc">Grade (Best First)</option>
        <option value="grade-asc">Grade (Worst First)</option>
        <option value="release-date-desc">Release Date (Newest First)</option>
        <option value="release-date-asc">Release Date (Oldest First)</option>
        <option value="review-date-desc">Review Date (Newest First)</option>
        <option value="review-date-asc">Review Date (Oldest First)</option>
      </SelectField>
    </>
  );
}

function List({ state }: { state: State }) {
  return (
    <GroupedList data-testid="poster-list" items={state.groupedItems}>
      {(item) => <ListItem item={item} key={item.imdbId} />}
    </GroupedList>
  );
}

function ListItem({
  item,
}: {
  item: Queries.ReviewsPageItemFragment;
}): JSX.Element {
  return (
    <GroupedListItem>
      <ListItemPoster
        slug={item.slug}
        image={item.poster}
        title={item.title}
        year={item.year}
        flexShrink={0}
      />
      <Box flexGrow={1} width={{ tablet: "full" }}>
        <Box>
          <ListItemTitle title={item.title} year={item.year} slug={item.slug} />
          <Spacer axis="vertical" size={4} />
          <Grade grade={item.grade} height={18} />
          <Spacer axis="vertical" size={4} />
        </Box>
      </Box>
    </GroupedListItem>
  );
}

export default function ReviewsIndexPage({
  data,
}: {
  data: Queries.ReviewsPageQuery;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...data.review.nodes],
      sort: "title-asc",
    },
    initState
  );

  return (
    <ListWithFiltersLayout
      header={<Header data={data} />}
      filters={<Filters data={data} dispatch={dispatch} state={state} />}
      list={<List state={state} />}
      visibleItems={state.showCount}
      totalItems={state.filteredItems.length}
      onMoreClick={() => {
        dispatch({ type: ActionType.SHOW_MORE });
      }}
    />
  );
}

export const query = graphql`
  fragment ReviewsPageItem on ReviewedMoviesJson {
    year
    imdbId
    reviewDate(formatString: "YYYY-MM-DD")
    releaseDate
    reviewYear
    reviewMonth: reviewDate(formatString: "MMMM")
    title
    year
    sortTitle
    slug
    grade
    gradeValue
    genres
    poster {
      ...ListItemPoster
    }
  }
`;

export const pageQuery = graphql`
  query ReviewsPage {
    review: allReviewedMoviesJson(sort: { sortTitle: ASC }) {
      nodes {
        ...ReviewsPageItem
      }
      reviewYears: distinct(field: { reviewYear: SELECT })
      releaseYears: distinct(field: { year: SELECT })
      genres: distinct(field: { genres: SELECT })
    }
  }
`;
