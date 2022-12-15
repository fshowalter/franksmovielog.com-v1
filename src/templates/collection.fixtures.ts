export const data = {
  distinct: {
    releaseYears: [
      "1955",
      "1956",
      "1957",
      "1958",
      "1959",
      "1960",
      "1961",
      "1962",
      "1963",
      "1964",
      "1965",
      "1966",
      "1967",
      "1968",
      "1969",
      "1970",
      "1971",
      "1972",
      "1973",
      "1974",
      "1976",
    ],
  },
  collection: {
    name: "Hammer Films",
    entityType: "collection" as Queries.WatchlistEntityType,
    avatar: {
      childImageSharp: {
        gatsbyImageData: {
          layout: "fixed" as const,
          placeholder: {
            fallback:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFElEQVQ4y+2SvUoEQRCE9xHEO8/drppxf+ZnF73cwMTIQDBVjATBMxBEDkWEC0QMBEETETTQ4DAw8BV8NXHWWxbNNDE4qKCp7m+giolA9WtFU/gPsLRmTpxmSCb6DjOsVYucJ5Pg9Eih0lSGOqPKWy9GSXCHYraQ7yDfR3EAM0AxQHEC+yLVJvIL2Gcpz+Eu4W7hD2HQwDnVnfgnKa/gHsSPpbyGuxf/KP5Nqhu4Map3WTyCOYN9leoUpkOqGrbUI7FrSEewG8hWka4j89R96BWkjnqZC9vId1Ecww5h9lDM1nCdZ4kaVDFVl+wExZ+x1VxI3iNnyG44EKp+OP4qTMJdUxVDT81Qm7pVZ/yz7enf/ufwB15WlS6gxriOAAAAAElFTkSuQmCC",
          },
          images: {
            fallback: {
              src: "/static/e919b03855219e9e019a1dac518d405d/448fd/hammer-films.jpg",
              srcSet:
                "/static/e919b03855219e9e019a1dac518d405d/448fd/hammer-films.jpg 200w,\n/static/e919b03855219e9e019a1dac518d405d/382f3/hammer-films.jpg 400w",
              sizes: "200px",
            },
            sources: [
              {
                srcSet:
                  "/static/e919b03855219e9e019a1dac518d405d/c7382/hammer-films.avif 200w,\n/static/e919b03855219e9e019a1dac518d405d/20a4d/hammer-films.avif 400w",
                type: "image/avif",
                sizes: "200px",
              },
            ],
          },
          width: 200,
          height: 200,
        },
      },
    },
    watchlistMovies: [
      {
        imdbId: "tt0049646",
        title: "The Quatermass Xperiment",
        year: 1955,
        grade: "B-",
        gradeValue: 8,
        slug: "the-quatermass-xperiment-1955",
        sortTitle: "Quatermass Xperiment (1955)",
        releaseDate: "1955-08-26",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,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",
              },
              images: {
                fallback: {
                  src: "/static/47c83780d1dd4e539542607028981d8b/10b75/the-quatermass-xperiment-1955.jpg",
                  srcSet:
                    "/static/47c83780d1dd4e539542607028981d8b/0cf61/the-quatermass-xperiment-1955.jpg 50w,\n/static/47c83780d1dd4e539542607028981d8b/4cfec/the-quatermass-xperiment-1955.jpg 100w,\n/static/47c83780d1dd4e539542607028981d8b/10b75/the-quatermass-xperiment-1955.jpg 200w,\n/static/47c83780d1dd4e539542607028981d8b/d5b68/the-quatermass-xperiment-1955.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/47c83780d1dd4e539542607028981d8b/998c5/the-quatermass-xperiment-1955.avif 50w,\n/static/47c83780d1dd4e539542607028981d8b/520c2/the-quatermass-xperiment-1955.avif 100w,\n/static/47c83780d1dd4e539542607028981d8b/af163/the-quatermass-xperiment-1955.avif 200w,\n/static/47c83780d1dd4e539542607028981d8b/81c8e/the-quatermass-xperiment-1955.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0049967",
        title: "X the Unknown",
        year: 1956,
        grade: "C+",
        gradeValue: 7,
        slug: "x-the-unknown-1956",
        sortTitle: "X the Unknown (1956)",
        releaseDate: "1956-11-05",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,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",
              },
              images: {
                fallback: {
                  src: "/static/2d007f4e350b4962d6ac15b596f8cdd3/10b75/x-the-unknown-1956.jpg",
                  srcSet:
                    "/static/2d007f4e350b4962d6ac15b596f8cdd3/0cf61/x-the-unknown-1956.jpg 50w,\n/static/2d007f4e350b4962d6ac15b596f8cdd3/4cfec/x-the-unknown-1956.jpg 100w,\n/static/2d007f4e350b4962d6ac15b596f8cdd3/10b75/x-the-unknown-1956.jpg 200w,\n/static/2d007f4e350b4962d6ac15b596f8cdd3/d5b68/x-the-unknown-1956.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/2d007f4e350b4962d6ac15b596f8cdd3/998c5/x-the-unknown-1956.avif 50w,\n/static/2d007f4e350b4962d6ac15b596f8cdd3/520c2/x-the-unknown-1956.avif 100w,\n/static/2d007f4e350b4962d6ac15b596f8cdd3/af163/x-the-unknown-1956.avif 200w,\n/static/2d007f4e350b4962d6ac15b596f8cdd3/81c8e/x-the-unknown-1956.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0050280",
        title: "The Curse of Frankenstein",
        year: 1957,
        grade: "A",
        gradeValue: 12,
        slug: "the-curse-of-frankenstein-1957",
        sortTitle: "Curse of Frankenstein (1957)",
        releaseDate: "1957-05-02",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,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",
              },
              images: {
                fallback: {
                  src: "/static/85e4595d8908ad1b13445c48acce1ea8/10b75/the-curse-of-frankenstein-1957.jpg",
                  srcSet:
                    "/static/85e4595d8908ad1b13445c48acce1ea8/0cf61/the-curse-of-frankenstein-1957.jpg 50w,\n/static/85e4595d8908ad1b13445c48acce1ea8/4cfec/the-curse-of-frankenstein-1957.jpg 100w,\n/static/85e4595d8908ad1b13445c48acce1ea8/10b75/the-curse-of-frankenstein-1957.jpg 200w,\n/static/85e4595d8908ad1b13445c48acce1ea8/d5b68/the-curse-of-frankenstein-1957.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/85e4595d8908ad1b13445c48acce1ea8/998c5/the-curse-of-frankenstein-1957.avif 50w,\n/static/85e4595d8908ad1b13445c48acce1ea8/520c2/the-curse-of-frankenstein-1957.avif 100w,\n/static/85e4595d8908ad1b13445c48acce1ea8/af163/the-curse-of-frankenstein-1957.avif 200w,\n/static/85e4595d8908ad1b13445c48acce1ea8/81c8e/the-curse-of-frankenstein-1957.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0051009",
        title: "The Steel Bayonet",
        year: 1957,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Steel Bayonet (1957)",
        releaseDate: "1957-05-09",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0050873",
        title: "Quatermass 2",
        year: 1957,
        grade: "D+",
        gradeValue: 4,
        slug: "quatermass-2-1957",
        sortTitle: "Quatermass 2 (1957)",
        releaseDate: "1957-05-10",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAACXBIWXMAAAsTAAALEwEAmpwYAAAH+0lEQVRIxyWWe1DVBRbHfyBcLvd97+9x7+938b7lBlxBFMOEQAUVBBUE1PCJ4ANIBRHIMgE1FNMwRS1JktQKE2jbHqaNNbmWVq41TVtr1tam2dhsD9fdtj92Pju4f5/vnHPmnO/5zBGionTE6c2IohO7XcFkFok32Ig3WNHpbQhRegQhljiTHavmprzUT0pEJkZnQW+yEEoNMHnaWMoX57KmKgtBEATSx2cyPDzEM0ee4ZFH2+jatZuh4Zeprl4zIiAmOo7oWDMGs5VgokK8yYrR4iDOIOIJ+/CEA4ybOJ6yihkj+igyJmZx8eIFnjvWz7P9Rzn39ttcvfo5tXUP3k0YG2NAiDYyJtFFzhQPklPBaJGJHenSYET1JjA+M5XsnEwEIVrPqDgz/mAYs1XCPTqIS/XgTvARExM/IiBqlIFR8UaSkzV0OjNxJhGLQ0MQdAhRsdgdIsFwEN+YEMKEzCx2d3ezdn0DXY/vYXlVDZWLl7NufSM9PfupqllNnM5AjMmCSRTRG22M9rsJRlIxWF3ozTKjgwFSJqTiCQYRpk6fyd+++ZKhl4f57vo3nD7zBk893cupwVO88OILrFhTj10XR4ooEpnkIWV8ApLiwu704lAD6K0urKqb7NxMvD4/QihpLJVLllK5qJT8mcXMLS1n8ZLl5E0vJDI2DXcoGa/Bwv4UkZKZfuSQE1FUMFg1xIQwVsWPwaYRCgVJDo9BEKLMrK+OZ7DHyIKikZnICNGGkcBduwiCAafJwTMhO/NzvETGe1BVldh4JzqDE6vswWxP4N6J48iakIowfYrEU50K3e1OqhaKxBoUTFYrgmCmaIZISbGEINgZDFo5MF1jcn6AQFDBbHViFT1Img+rpGCTFMalJCJ0d7ioXuzg+acldm5x0bpWYU2VSkOdi+cOKezZ5mRVjUrX/Tb6SjXuz/Uwu8hDJMmFQQxilAJ3i48yyLg9AYQ/n7XRu1fmleNOTh5ROLzXSVeHxisvOmnbJLFvt0LfAZVjvQr7tmucHXLx9h9cNK9Tqa3SWLXMSdUilSnZCnm5boTdW0Q21jnIn2KnqVZh1xaVQ7vdPN2t8twBmf6DKr37EqgpF9nVLHHquMybgxL7H3dx8ojGiUNu9nSoHOx00rRyxJtRNmS7giCY7pr4/4vQERsbh99rJClsYEKaAbfbTP1SldZ6F93tKqeedXHiKYUnt7rY1urkyOMaCys8CNE6I26nRMSn4vV4SUvPYNHipSyvWkFScgZZ2dOpq99IMJyKXdCxzmZkXbodKaAgyk6KChXKSxQWzRNZXT0RITbeRkIgiUjqBAoLi6irraOlpYWWlmamTctjY1MjO3dsJy9/BunJqWzImUT+pAhGtwubyU1NmYs3BxwM9Fo5uN2PYBE1alauprm5hfz8Ah5+aBNNjRuoXV1LUcEsGhvWs7pmFWUl82hpbqKzawcPLllEbYJIn1dhqNFF60aFppUibbXFCGa7k7q6eqprVlE6/wEqly5nzrwyGlpaKSqfzyPtbcyYU0JrezsPtbfR0bSBd1c/wBcJRgZXujg94ODV4xLb1kuc7F6FEG+yk5aeSW5GDgsmZlORkUlhZByb585lV0EBm2YXs3lshGcXlHN4wXw+nJPHTwUp/JJo5NI4O0eSJOYlS6T77ZzuXjaCu3i8Lhub8jxsDsvUGqx0Wi2s0us5YIhnq17P67KZk2Y9n0ix/NcXze/JMfwn3cCdJBOvKSIRnYgULdO3bApCWNN4d9tYbu1I4vLKIOcjds5oFg64Rfo1kaGQk1cnuXkjU+Wj+zVuTTTzW048d2aauHGvlWbZgcMoIupFHgwHEE7VpHCpPomPF/u4ONvLtTKVOzlmPs9wcCZV5b0sjXOlft5bEeBWs43bSwz8Vmjip9k2vp4pstMvoegdRAtmKsMhhA8bQrz/WIBPloc4OfUeBqYr/Nohc61S461liVyqC/LBukQ+2p7MV3tc/KvPwgdldso9Mo/NTmXTOC9KvINJiT46l+UhvFcd4uaOEF+tSOXTWX6GihVOPZzE4WURvt6n8m2/h+snVW70yXy8V+Ncl4e2UidZLomPOgtYNyeLldlJfHa0kA+Oz0N4rTqdbxsDfNmQwtU8D39pVTjb7mPwoTHcHrZwu0/k38NWfj+j4+eBeK71y2xfqDE5TmRgZRZH1xdQoqm81TCWoy33IVzsmMUPFS5+mqtyoSTEd70efnvCxu0emZv7ZW7eZ+bXNWZ+GbDyy/Nm/v6IxuwUiTGjbFSM8VKfnUTYLlOZ5uePG+9DuH5sDt8vcXGjOIGLjWHON6mcT7Rwp9bBlXqJ95Os/LxV5MdDTr5/VOEfPaNpniYjCHqm+jxII8+AoCNNltmQE0a40pPLrYUSP6wIMbivlfq8abw+WeObQx6uPOHjcrPGp80q1zZoXG72c2Wzi8+a3PhFI35ZpbE0G4fJgj3OSlF6GOGrbg+3GiSu7CjhxLGDvDPcy+trcjnbkMBfD3r50/4gFx72cbPPw8d7g5yvDfBFy2iO1ySyrWIyX/cUsGX+eEYOJE5vR7jRqPL9gTS6H6un5dGN/Li1hIEiLy+t9fNSfYAnK5K50OXhxFo/7+8OcLVf4frzMpd2uslSZTomJXCo+B4yPCrSCFd/HMHPjlnklpVzcHMFbPJwri6RL44oXO6UeKHax7XDMu+0ufjnaSO33zTAlWiuDhpIFB0kGV2kWzW6ZyRTlh7if0tSdn9MvtlrAAAAAElFTkSuQmCC",
              },
              images: {
                fallback: {
                  src: "/static/f0f9b41b27a39227f2f4a16a55b14e93/10b75/quatermass-2-1957.jpg",
                  srcSet:
                    "/static/f0f9b41b27a39227f2f4a16a55b14e93/0cf61/quatermass-2-1957.jpg 50w,\n/static/f0f9b41b27a39227f2f4a16a55b14e93/4cfec/quatermass-2-1957.jpg 100w,\n/static/f0f9b41b27a39227f2f4a16a55b14e93/10b75/quatermass-2-1957.jpg 200w,\n/static/f0f9b41b27a39227f2f4a16a55b14e93/d5b68/quatermass-2-1957.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/f0f9b41b27a39227f2f4a16a55b14e93/998c5/quatermass-2-1957.avif 50w,\n/static/f0f9b41b27a39227f2f4a16a55b14e93/520c2/quatermass-2-1957.avif 100w,\n/static/f0f9b41b27a39227f2f4a16a55b14e93/af163/quatermass-2-1957.avif 200w,\n/static/f0f9b41b27a39227f2f4a16a55b14e93/81c8e/quatermass-2-1957.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0050095",
        title: "The Abominable Snowman",
        year: 1957,
        grade: "D+",
        gradeValue: 4,
        slug: "the-abominable-snowman-1957",
        sortTitle: "Abominable Snowman (1957)",
        releaseDate: "1957-08-10",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAACXBIWXMAAC4jAAAuIwF4pT92AAAILElEQVRIxyWSeVTOiRrHf+fcc8+5c41rVxNS4pUWsoSkBY2E1KiUmJhJe1rlrVQoIopJStoRJWTSot2SjFaaYqSklZZpf5vXMNPnnswfn/N9zvc553vO85yvMNz3gd7Ot/S0v2Xgwzv6uibmZrrbmujrbKan4w3dba/paX9Nb2cjrW9e8r71Fb2dE95v9LS/oqf9JR1v6+jvakG4m57EyaAtxEbuIUi8ncgwYwJ9NnEyyICY8zsIDdrKcT9DoiNMCQs2wmGfFhGhBhzz1cXFVhNvFy0Ou+mw12I5Tx8WIlxLiGaTjiLOB/RYq7EQ0y0qmO9Qw85GA7Pt6phtX47Zdg32WmiydZMaB+3X8oP1CkQKcqiKFNBaqYLmMhHTv57Ek9IChPjoKGZNmYyC3Dcsmj+HeTKzmD55EiJFeZTk5Zg9bQqyM6Yye+pkVqgqoSA7myVKc7HcacDpEDeOH3FE7LUfDVUlHhXlISTERLFk4Ty2G2ozV2YaLvaW3E67RFbGKVzsrdmycQ2Bvo6cDRVz6YIXVxOPkxjrR2HeVcofZnM/6zoPCtM5HuBMUe5dhDvpKWRnXqQkP4mjRxy5cC6QV3VlVD+9QdXTXB4W3SQzPYIbKacJCbInOGAfvodscXO2xN3Zih1G2jjb7URvnQol93MQribFcWDft1iY6LBt8xouRweRnhrF8QAXTLdpYaC3HHVlWdavVvpy5i5TPU4cteP8GT/EXj+iMGcmstP/h+z0qTwszkdIjo9l2qT/MO3rSZibbCTjegRiTzM0VOaxSXcVhz1+JCM1hpL8VLJuRZJ4KYDo8wHEXTxM5FlXlOTlkZsli+IcmX9+mBQXg9zMKchMn4yfjz0V5Xe4nxVG1q1z3M2IJ/1qOBfCxdjtN2ajjginA8bY7d+GzR4jvD0cSI42p+SOHi8fr2egqxQhJeHyl7BvZkxjr+VmkuLDOHfGD1sbfTZoq+LmtJuEWH98PPYR5O9KoJ8jMVEhVD+9Qm3ZfsryvqXozlpaqrT4NPRoIjAWmamTUfxGFtH8ubjaW3EsYC8RYYcIDfbmVLALfocOYLJVl5VLF+Dpak9LQxR8ukJt6Qo8HFSxNFUmyFvEx8FH/9Tm3/8SmPzfr5g7Vwax2AnDzZrortNg/ZplKMjN/tLFWVO+QmaGPB2NZ5H2utLTYk/h7ZXcTVlDRqIucRErGO15iJCfl8MhCyuCrPcRtHM3R6y/54SDC5bmZvxbEJCbOZs5s2Ywc8os0pLF9DSb4WqrxLlgdcKPKXM6QA0HGxWuxaxkXFKG8PrXF3zMecB4QTmUPuOvkl+guIKCxKuIFiqwYM4MZKbLcibYhtrHlpwJVMTfTcStxKXUFq8m97omHo7qpMWtBmkZwsu6F4w1NvHHL1WMVP/K8JMKRp+3MtSeT1u9mOxUfW4mWTHc7oCvmzIH9ohw3r+QW/GqRJ9ahsUOFdavlsfXXQXpUDlCbWUlz588oyornzf3c2h9WsJYfzdIovj8wZxP/XEw6ERloT6P7ukQG66B7W5FUqOXYmu9CCvThZhuVcLph8UMfniMkJ15HcMNSng6a3M9bh0ZVywYbnNhsNmSV8/cYcSIzgZjYsI0eFG2iRB/NXabzic9bimO+0R4OCjznbEStnsX0NteilCUm0yAuwzJP6lxyGkxxXdMoN+GtqZ6oiOCGGndQlqCHjbmShT+bMAP1iIM9ecS4LkYT8fFiA+q8N22BbjbK9HZXIzQUJ1PsN82QgKsKCsMp7XhDAyfICfzFh72m0iP/5ZdJsqYGImIPL2WELEKvgeV8fdQxWbXQgx0FdlvpYy9jRJ9nSUIf/TmMNRkwGhXEEXZF7l9PZyuphSCA8L4KUQHfjci9IgmIUe0OBW0GisTRXTXyrNq2Vw0l83hqHgFNlYqeDkq8ZfkAcJEGcfa7ZC898Pfx4OE6CiqSt0oyHTn7LEdfHpviqRtBz2NpgR4a7BSTY6N2vNYu2JC53M2eBU6axRJu6wO0iKE/o5s3lUbUvP4PPExSVy57E+wnxnlOWpcPv8jVt+p42anQkLkOg67LuXgAVUCPZfgun8R3s5qeLuuRF9bxO1EZcYlBQjSnjReFG/E190KR5tVXD5njZ2NISeP6JKb4UNokB3xkZuJO7eSXcbzMdogT6DXEi6dEfEkR53GZzoUZ25F2r6BT0MFCPWVGZz01yb8lBtX48TUVSZzIzmU00dt8feyIeHC95Tn6VNRsJkXj7bxpmoP/e/cYMiJz31i/h44yd+/u9JUsYW+9vsIH96m0VShzfigD5IOG67F6KOtuYgNWjPwcphHd/1y6DGFkQswkszn/nikvcmMvI9lsP0E/S2eFN5eT0rkAtp+u4fweSAHaYcxP6fuxHaPHlsN1uDjqo/kvQWM7waJNeP97vzZLeZzjxtjnRPYIe2yYujdHj682kXdY3POHt9IXWU+AtIhutsbiYuJ52bqNe7duUFDTTGvnhdRnHeD3MxEqp/cpvtdGYX3Yim8d5Ga8nSeld0kPy+R7Kx4cu8l0tpUw+hAD8K4VMLY4O88KMyntCCfB0VFvK5/ycsX9ZSVPqQkv5Cnj8voau2gtqKW0sIH1FQ+5/nDcgpTblCSepOC1HR6W9/xp2QIgT/HaG9+TU3FM36r/5W62mpamxqpq6mivaWZljevaXheRfUv5Qz2ddPS1Ehb61v621rpbainu6Gejvo6OpsbkQ73I0iHh5jg4+gI0tGRL/rHyNAXxiYYHvyyl44OIxkeYGxk8IsnGR1CIhlmVDLMR+koo0P9DA/08X8CsigkoJlMugAAAABJRU5ErkJggg==",
              },
              images: {
                fallback: {
                  src: "/static/be3c2d6eddb920be1d5ed0d4156a5f9f/10b75/the-abominable-snowman-1957.jpg",
                  srcSet:
                    "/static/be3c2d6eddb920be1d5ed0d4156a5f9f/0cf61/the-abominable-snowman-1957.jpg 50w,\n/static/be3c2d6eddb920be1d5ed0d4156a5f9f/4cfec/the-abominable-snowman-1957.jpg 100w,\n/static/be3c2d6eddb920be1d5ed0d4156a5f9f/10b75/the-abominable-snowman-1957.jpg 200w,\n/static/be3c2d6eddb920be1d5ed0d4156a5f9f/d5b68/the-abominable-snowman-1957.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/be3c2d6eddb920be1d5ed0d4156a5f9f/998c5/the-abominable-snowman-1957.avif 50w,\n/static/be3c2d6eddb920be1d5ed0d4156a5f9f/520c2/the-abominable-snowman-1957.avif 100w,\n/static/be3c2d6eddb920be1d5ed0d4156a5f9f/af163/the-abominable-snowman-1957.avif 200w,\n/static/be3c2d6eddb920be1d5ed0d4156a5f9f/81c8e/the-abominable-snowman-1957.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0051444",
        title: "The Camp on Blood Island",
        year: 1958,
        grade: "B-",
        gradeValue: 8,
        slug: "the-camp-on-blood-island-1958",
        sortTitle: "Camp on Blood Island (1958)",
        releaseDate: "1958-04-15",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,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",
              },
              images: {
                fallback: {
                  src: "/static/f6594fdd6aa9132847848d5381e5a292/10b75/the-camp-on-blood-island-1958.jpg",
                  srcSet:
                    "/static/f6594fdd6aa9132847848d5381e5a292/0cf61/the-camp-on-blood-island-1958.jpg 50w,\n/static/f6594fdd6aa9132847848d5381e5a292/4cfec/the-camp-on-blood-island-1958.jpg 100w,\n/static/f6594fdd6aa9132847848d5381e5a292/10b75/the-camp-on-blood-island-1958.jpg 200w,\n/static/f6594fdd6aa9132847848d5381e5a292/d5b68/the-camp-on-blood-island-1958.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/f6594fdd6aa9132847848d5381e5a292/998c5/the-camp-on-blood-island-1958.avif 50w,\n/static/f6594fdd6aa9132847848d5381e5a292/520c2/the-camp-on-blood-island-1958.avif 100w,\n/static/f6594fdd6aa9132847848d5381e5a292/af163/the-camp-on-blood-island-1958.avif 200w,\n/static/f6594fdd6aa9132847848d5381e5a292/81c8e/the-camp-on-blood-island-1958.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0051554",
        title: "Horror of Dracula",
        year: 1958,
        grade: "A-",
        gradeValue: 11,
        slug: "horror-of-dracula-1958",
        sortTitle: "Horror of Dracula (1958)",
        releaseDate: "1958-05-08",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,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",
              },
              images: {
                fallback: {
                  src: "/static/fadc2641cc29a6d9841fa131bc4822fa/10b75/horror-of-dracula-1958.jpg",
                  srcSet:
                    "/static/fadc2641cc29a6d9841fa131bc4822fa/0cf61/horror-of-dracula-1958.jpg 50w,\n/static/fadc2641cc29a6d9841fa131bc4822fa/4cfec/horror-of-dracula-1958.jpg 100w,\n/static/fadc2641cc29a6d9841fa131bc4822fa/10b75/horror-of-dracula-1958.jpg 200w,\n/static/fadc2641cc29a6d9841fa131bc4822fa/d5b68/horror-of-dracula-1958.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/fadc2641cc29a6d9841fa131bc4822fa/998c5/horror-of-dracula-1958.avif 50w,\n/static/fadc2641cc29a6d9841fa131bc4822fa/520c2/horror-of-dracula-1958.avif 100w,\n/static/fadc2641cc29a6d9841fa131bc4822fa/af163/horror-of-dracula-1958.avif 200w,\n/static/fadc2641cc29a6d9841fa131bc4822fa/81c8e/horror-of-dracula-1958.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0050894",
        title: "The Revenge of Frankenstein",
        year: 1958,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Revenge of Frankenstein (1958)",
        releaseDate: "1958-06-13",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0052207",
        title: "The Snorkel",
        year: 1958,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Snorkel (1958)",
        releaseDate: "1958-06-18",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0053341",
        title: "Ten Seconds to Hell",
        year: 1959,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Ten Seconds to Hell (1959)",
        releaseDate: "1959-04-23",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0052905",
        title: "The Hound of the Baskervilles",
        year: 1959,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Hound of the Baskervilles (1959)",
        releaseDate: "1959-05-04",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0053041",
        title: "The Man Who Could Cheat Death",
        year: 1959,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Man Who Could Cheat Death (1959)",
        releaseDate: "1959-06-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0053458",
        title: "Yesterday's Enemy",
        year: 1959,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Yesterday's Enemy (1959)",
        releaseDate: "1959-07-11",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0053085",
        title: "The Mummy",
        year: 1959,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Mummy (1959)",
        releaseDate: "1959-08-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0054346",
        title: "The Stranglers of Bombay",
        year: 1959,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Stranglers of Bombay (1959)",
        releaseDate: "1959-12-04",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0054116",
        title: "Never Take Candy from A Stranger",
        year: 1960,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Never Take Candy from A Stranger (1960)",
        releaseDate: "1960-03-04",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0053900",
        title: "Hell Is a City",
        year: 1960,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Hell Is a City (1960)",
        releaseDate: "1960-04-10",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0053677",
        title: "The Brides of Dracula",
        year: 1960,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Brides of Dracula (1960)",
        releaseDate: "1960-07-07",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0054416",
        title: "The Two Faces of Dr. Jekyll",
        year: 1960,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Two Faces of Dr. Jekyll (1960)",
        releaseDate: "1960-08-18",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0054901",
        title: "Stop Me Before I Kill!",
        year: 1960,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Stop Me Before I Kill! (1960)",
        releaseDate: "1960-10-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0054358",
        title: "Sword of Sherwood Forest",
        year: 1960,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Sword of Sherwood Forest (1960)",
        releaseDate: "1960-12-26",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0055282",
        title: "Passport to China",
        year: 1960,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Passport to China (1960)",
        releaseDate: "1960-12-26",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0055516",
        title: "The Terror of the Tongs",
        year: 1961,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Terror of the Tongs (1961)",
        releaseDate: "1961-03-15",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0055505",
        title: "Scream of Fear",
        year: 1961,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Scream of Fear (1961)",
        releaseDate: "1961-03-30",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0054777",
        title: "The Curse of the Werewolf",
        year: 1961,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Curse of the Werewolf (1961)",
        releaseDate: "1961-05-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0055438",
        title: "The Shadow of the Cat",
        year: 1961,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Shadow of the Cat (1961)",
        releaseDate: "1961-05-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0054731",
        title: "Cash on Demand",
        year: 1961,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Cash on Demand (1961)",
        releaseDate: "1961-12-20",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0056350",
        title: "The Pirates of Blood River",
        year: 1962,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Pirates of Blood River (1962)",
        releaseDate: "1962-05-09",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0056277",
        title: "Night Creatures",
        year: 1962,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Night Creatures (1962)",
        releaseDate: "1962-06-07",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0056347",
        title: "The Phantom of the Opera",
        year: 1962,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Phantom of the Opera (1962)",
        releaseDate: "1962-06-07",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0056576",
        title: "The Damned",
        year: 1962,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Damned (1962)",
        releaseDate: "1962-11-16",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0057401",
        title: "Paranoiac",
        year: 1963,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Paranoiac (1963)",
        releaseDate: "1963-05-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0056219",
        title: "Maniac",
        year: 1963,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Maniac (1963)",
        releaseDate: "1963-05-20",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0056963",
        title: "The Crimson Blade",
        year: 1963,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Crimson Blade (1963)",
        releaseDate: "1963-09-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0057226",
        title: "The Kiss of the Vampire",
        year: 1963,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Kiss of the Vampire (1963)",
        releaseDate: "1963-09-11",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0057379",
        title: "The Old Dark House",
        year: 1963,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Old Dark House (1963)",
        releaseDate: "1963-10-30",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0058405",
        title: "Nightmare",
        year: 1964,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Nightmare (1964)",
        releaseDate: "1964-02-28",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0058011",
        title: "The Devil-Ship Pirates",
        year: 1964,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Devil-Ship Pirates (1964)",
        releaseDate: "1964-05-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0058073",
        title: "The Evil of Frankenstein",
        year: 1964,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Evil of Frankenstein (1964)",
        releaseDate: "1964-05-08",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0058155",
        title: "The Gorgon",
        year: 1964,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Gorgon (1964)",
        releaseDate: "1964-08-21",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0057986",
        title: "The Curse of the Mummy's Tomb",
        year: 1964,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Curse of the Mummy's Tomb (1964)",
        releaseDate: "1964-10-18",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0059106",
        title: "Die! Die! My Darling!",
        year: 1965,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Die! Die! My Darling! (1965)",
        releaseDate: "1965-03-21",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0058216",
        title: "Hysteria",
        year: 1965,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Hysteria (1965)",
        releaseDate: "1965-04-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0059693",
        title: "The Secret of Blood Island",
        year: 1965,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Secret of Blood Island (1965)",
        releaseDate: "1965-04-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0059710",
        title: "She",
        year: 1965,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "She (1965)",
        releaseDate: "1965-04-18",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0058991",
        title: "The Brigand of Kandahar",
        year: 1965,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Brigand of Kandahar (1965)",
        releaseDate: "1965-08-09",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0059496",
        title: "The Nanny",
        year: 1965,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Nanny (1965)",
        releaseDate: "1965-10-07",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0059127",
        title: "Dracula: Prince of Darkness",
        year: 1966,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Dracula: Prince of Darkness (1966)",
        releaseDate: "1966-01-09",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0060841",
        title: "The Plague of the Zombies",
        year: 1966,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Plague of the Zombies (1966)",
        releaseDate: "1966-01-09",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0059635",
        title: "Rasputin: The Mad Monk",
        year: 1966,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Rasputin: The Mad Monk (1966)",
        releaseDate: "1966-03-06",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0060893",
        title: "The Reptile",
        year: 1966,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Reptile (1966)",
        releaseDate: "1966-03-06",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0060307",
        title: "The Witches",
        year: 1966,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Witches (1966)",
        releaseDate: "1966-11-21",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0060782",
        title: "One Million Years B.C.",
        year: 1966,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "One Million Years B.C. (1966)",
        releaseDate: "1966-11-24",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0062150",
        title: "Prehistoric Women",
        year: 1967,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Prehistoric Women (1967)",
        releaseDate: "1967-01-19",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0061683",
        title: "Frankenstein Created Woman",
        year: 1967,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Frankenstein Created Woman (1967)",
        releaseDate: "1967-03-15",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0062006",
        title: "The Mummy's Shroud",
        year: 1967,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Mummy's Shroud (1967)",
        releaseDate: "1967-03-15",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0062443",
        title: "The Viking Queen",
        year: 1967,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Viking Queen (1967)",
        releaseDate: "1967-03-25",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0062787",
        title: "A Challenge for Robin Hood",
        year: 1967,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Challenge for Robin Hood (1967)",
        releaseDate: "1967-07-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0062168",
        title: "Quatermass and the Pit",
        year: 1967,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Quatermass and the Pit (1967)",
        releaseDate: "1967-09-29",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0062671",
        title: "The Anniversary",
        year: 1968,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Anniversary (1968)",
        releaseDate: "1968-02-07",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0063765",
        title: "The Vengeance of She",
        year: 1968,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Vengeance of She (1968)",
        releaseDate: "1968-04-14",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0063240",
        title: "The Lost Continent",
        year: 1968,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Lost Continent (1968)",
        releaseDate: "1968-06-19",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0062885",
        title: "The Devil Rides Out",
        year: 1968,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Devil Rides Out (1968)",
        releaseDate: "1968-07-20",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0062909",
        title: "Dracula Has Risen from the Grave",
        year: 1968,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Dracula Has Risen from the Grave (1968)",
        releaseDate: "1968-11-07",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0065738",
        title: "Frankenstein Must Be Destroyed",
        year: 1969,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Frankenstein Must Be Destroyed (1969)",
        releaseDate: "1969-05-22",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0064691",
        title: "Moon Zero Two",
        year: 1969,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Moon Zero Two (1969)",
        releaseDate: "1969-10-20",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0065073",
        title: "Taste the Blood of Dracula",
        year: 1970,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Taste the Blood of Dracula (1970)",
        releaseDate: "1970-05-07",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0064188",
        title: "Crescendo",
        year: 1970,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Crescendo (1970)",
        releaseDate: "1970-06-07",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0066518",
        title: "The Vampire Lovers",
        year: 1970,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Vampire Lovers (1970)",
        releaseDate: "1970-10-04",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0066561",
        title: "When Dinosaurs Ruled the Earth",
        year: 1970,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "When Dinosaurs Ruled the Earth (1970)",
        releaseDate: "1970-10-25",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0065851",
        title: "The Horror of Frankenstein",
        year: 1970,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Horror of Frankenstein (1970)",
        releaseDate: "1970-11-08",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0067713",
        title: "Scars of Dracula",
        year: 1970,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Scars of Dracula (1970)",
        releaseDate: "1970-11-08",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0067367",
        title: "Lust for a Vampire",
        year: 1971,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Lust for a Vampire (1971)",
        releaseDate: "1971-01-17",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0329247",
        title: "Journey to Murder",
        year: 1971,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Journey to Murder (1971)",
        releaseDate: "1971-01-30",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0065580",
        title: "Countess Dracula",
        year: 1971,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Countess Dracula (1971)",
        releaseDate: "1971-01-31",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0066955",
        title: "Creatures the World Forgot",
        year: 1971,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Creatures the World Forgot (1971)",
        releaseDate: "1971-04-18",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0067176",
        title: "Hands of the Ripper",
        year: 1971,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Hands of the Ripper (1971)",
        releaseDate: "1971-09-30",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0069427",
        title: "Twins of Evil",
        year: 1971,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Twins of Evil (1971)",
        releaseDate: "1971-10-03",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0068290",
        title: "Blood from the Mummy's Tomb",
        year: 1971,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Blood from the Mummy's Tomb (1971)",
        releaseDate: "1971-10-14",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0068502",
        title: "Dr Jekyll & Sister Hyde",
        year: 1971,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Dr Jekyll & Sister Hyde (1971)",
        releaseDate: "1971-10-17",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0067924",
        title: "Vampire Circus",
        year: 1972,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Vampire Circus (1972)",
        releaseDate: "1972-04-30",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0068505",
        title: "Dracula A.D. 1972",
        year: 1972,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Dracula A.D. 1972 (1972)",
        releaseDate: "1972-06-26",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0068577",
        title: "Fear in the Night",
        year: 1972,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Fear in the Night (1972)",
        releaseDate: "1972-07-09",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0069318",
        title: "Straight on Till Morning",
        year: 1972,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Straight on Till Morning (1972)",
        releaseDate: "1972-07-09",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0066982",
        title: "Demons of the Mind",
        year: 1972,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Demons of the Mind (1972)",
        releaseDate: "1972-11-05",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0073342",
        title: "Man at the Top",
        year: 1973,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Man at the Top (1973)",
        releaseDate: "1973-01-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0065221",
        title: "Wolfshead: The Legend of Robin Hood",
        year: 1973,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Wolfshead: The Legend of Robin Hood (1973)",
        releaseDate: "1973-04-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0070634",
        title: "The Satanic Rites of Dracula",
        year: 1973,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Satanic Rites of Dracula (1973)",
        releaseDate: "1973-11-03",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0071519",
        title: "Frankenstein and the Monster from Hell",
        year: 1974,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Frankenstein and the Monster from Hell (1974)",
        releaseDate: "1974-04-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0071276",
        title: "Captain Kronos: Vampire Hunter",
        year: 1974,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Captain Kronos: Vampire Hunter (1974)",
        releaseDate: "1974-04-07",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0070297",
        title: "The Legend of the 7 Golden Vampires",
        year: 1974,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Legend of the 7 Golden Vampires (1974)",
        releaseDate: "1974-07-11",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0074268",
        title: "Shatter",
        year: 1974,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Shatter (1974)",
        releaseDate: "1974-12-01",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
      {
        imdbId: "tt0075334",
        title: "To the Devil a Daughter",
        year: 1976,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "To the Devil a Daughter (1976)",
        releaseDate: "1976-03-04",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAIAAACjcKk8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAp0lEQVQ4y+3TvQrDIBSG4dz/BSWQLGIihabBDPEHJKjfyYUUDIRCO2g7dPGdzvLgUbCJP9RUXPHXOIRwDgCKMQAi8t4757z3BRiAc04pNc/ztm3XFlk4hCClVErt+/56hSxsrX2k7iljDBFlYQCc82EYWKrrunVdj+N4P/8zZoz1fT+OI+e8bVspZQFelkUIcUtN06S1zl07xkgppM6h7LXrr6r4//gJOCMmC2EysBcAAAAASUVORK5CYII=",
              },
              images: {
                fallback: {
                  src: "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg",
                  srcSet:
                    "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/0cf61/default.jpg 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/4cfec/default.jpg 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/10b75/default.jpg 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/d5b68/default.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/998c5/default.avif 50w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/520c2/default.avif 100w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/af163/default.avif 200w,\n/static/801b99703dc5ef5ed5dcd8bb3f5ed3b1/81c8e/default.avif 400w",
                    type: "image/avif",
                    sizes: "(min-width: 200px) 200px, 100vw",
                  },
                ],
              },
              width: 200,
              height: 300,
            },
          },
        },
      },
    ],
  },
};
