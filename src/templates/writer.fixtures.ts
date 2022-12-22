export const data = {
  distinct: {
    releaseYears: [
      "1976",
      "1980",
      "1982",
      "1983",
      "1984",
      "1985",
      "1986",
      "1987",
      "1989",
      "1990",
      "1992",
      "1993",
      "1994",
      "1995",
      "1996",
      "1997",
      "1998",
      "1999",
      "2001",
      "2003",
      "2004",
      "2007",
      "2009",
      "2011",
      "2012",
      "2013",
      "2014",
      "2016",
      "2017",
      "2018",
      "2019",
    ],
  },
  writer: {
    name: "Stephen King",
    entityType: "writer" as Queries.WatchlistEntityType,
    avatar: {
      childImageSharp: {
        gatsbyImageData: {
          layout: "fixed" as const,
          placeholder: {
            fallback:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD5UlEQVQ4yz1UWSh3XxS9ichQSBkiylhEeCBz5qTEgwc+nshUeCDlQZRZEcos8zzP8zzPkrEUJXyRlCdv62vtf7//w+nee/Y966y99tpb6e7uxujoKHp7ezEyMiJP7g0ODmJpaQnz8/NYWFjA3t4eDg4OZG92dhbT09MS4zfjKysrWFtbgzI5OYmpqSkMDw+D7wTiAe5lZWUhNjYWiYmJSEhIQEVFBSYmJrC4uCggXHxfX1/Hzs4ONjc3oZDV+Pj4/8H9/X25NS4uDhoaGjAzM4O1tTWMjY1haWkJX19flJaWyv9kSDAyIyCzUMhGdSM3mLKXl5eAGRgYCIiLiwscHR1hZ2cHW1tb2NjYoLq6Gru7uwK2vb0tcpCMwtQIRlYMRkdHw97eHlZWVjA1NUVERIQc9vPzg5GRkQA7ODjAx8dH/l9dXcXW1paAEVQ0nJmZEXYtLS1wdXWVw97e3nB2dkZ6ejp+f39xfn6OnJwc2Xdzc4OhoSGampoEiIBky7SVsbEx0XBjYwO1tbXQ0tKSlDw9PYVlZmYmPj8/8fb2hpeXFxQXF0tcU1NTLjs6OhIdCSgazs3NSVUpcEdHB/T19UU/XV1dSZmX/fz84O/fv/j6+kJra6sUSF1dXRxA/VQ6kqlUWZV2X18fgoKCpAg6Ojry3tnZifb2dlRVVaGxsRF1dXVSLG1tbQGnhtSfYHxXmpub0dPTI2bmgba2NuTl5SE0NBQPDw9gnB5MTU2Vp4eHB5ycnBASEiL2IREWdnl5GcxW4e20CsEqKyuRm5uLoqIihIWF4enpCa+vr3KAwENDQ6ivr0d2drZ85+fni9EJRB3F2GRGhlzUkFUMDw9HcHAwrq6u8Pj4KClRDkpzcnIiF5eXl6Orq0v0Z9sR8PT0FApFHxgYkEUG9Birx/3b21tcXFzg+vpa2NIJNTU1EqNl2K4sCAF56eHh4X+dwpQ4IPj88+eP3E6A4+NjsQV1oiyMUxoWgxnRcmSmqjCto/BnFUsakwPA3d0dBQUFUjUuHqStysrKxNyFhYWSLs+RHc+p2k/p7++XAB1/d3cnwcjISGktTpmGhgaJMzVWkjYiS2pPMvyfzMhUfMjbWcn393cpwv39vViHVWZhAgMDxcDJyclISkqCv78/0tLSpLpcBFN1i1T54+MDz8/PODs7E1HJhNqlpKQgKioKMTExCAgIkHbT09ODmpqadBO9SkZkTZaqSitkxx5lJZk2hwD7lloydZqZE4ftxt42NzeXdxMTEynO5eWljD/VGFS+v78lXS52BkcZxzvTyMjIQHx8vHQGB61qcbxZWFigpKQENzc3kqpKgn8nRTsQeLPpHQAAAABJRU5ErkJggg==",
          },
          images: {
            fallback: {
              src: "/static/b8efcd83f9ce7a0598e4452e55ab31a3/448fd/stephen-king.jpg",
              srcSet:
                "/static/b8efcd83f9ce7a0598e4452e55ab31a3/448fd/stephen-king.jpg 200w,\n/static/b8efcd83f9ce7a0598e4452e55ab31a3/382f3/stephen-king.jpg 400w",
              sizes: "200px",
            },
            sources: [
              {
                srcSet:
                  "/static/b8efcd83f9ce7a0598e4452e55ab31a3/c7382/stephen-king.avif 200w,\n/static/b8efcd83f9ce7a0598e4452e55ab31a3/20a4d/stephen-king.avif 400w",
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
        imdbId: "tt0074285",
        title: "Carrie",
        year: 1976,
        grade: "B-",
        gradeValue: 8,
        slug: "carrie-1976",
        sortTitle: "Carrie (1976)",
        releaseDate: "1976-11-03",
        poster: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as const,
              placeholder: {
                fallback:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHyUlEQVRIxyWWeVCU9xnH3z3fvY93992LY1lYWFiEJajcgkEUkMilASPBxImt2piIoFivACJqzGmaNCK4IGpAuQQ8YtQ02jR1kpqrM9FJk6ZtJtNpesz0r/7Tzqez6x/PPPO7PvN9nmfmeX7Cxx/f5cD+A/T2HqL/UD9HBo4wMHCMQ/0vcqj/KL19x+jtO0JP7wA9Pf3s29/L3r0HOLBvH3v3dLO7q4tdXZ107Hiee/fuIYyPj6NS6bCY7RiNEnqTi8wUF42lTlYXOVlX5mDtMpn6YjvlOVaq84xU5ujQqrUIggqlIKAQBARBYH5hHmFychKHw4vbE6Ao109lvp/2qkR2NvrYUpdMZ3MSXWuT2NHgZctqNz9vdvLsaomysJ1lYSt6nQmN1oheFFm4fBlh4sJFPC6Z0oifLXUJdNR76Wzy0t3kZVezl221XrbVedhW46SpyMZztRZ21JnZvspEd52R2oiRiF+HSqFkbm4eYXxikkSPzKZVSWyrdbOxQqah2Mf2Gheda2R6WmQqI24eL7FRnm2jpdjM4yVm1uSb2FRupqXQzPpiEwatkpnZeYTz70wQCqaztb2VDZv3079nN6cOd9Ox5yBbd+2mubGJ1ppKskLZBJLS8cpJeF1+nHIKrpg5E0kNZCLZ7ExPzyCMjp2nMDeTE3u3sr7nJHs7u/jDsVa+mO5mYPQUB/v76N+xkZxwNgbRhiBoyDeaGEgw4jOYUQpaPJILp+RgamoG4ezZcwSD6dR3HCSja5SWinK+OrKVf1w7Svsvxyl59Qp1+18nLZCBRWdHEAz0pZl5UO+nxishCCa8Dl8cODk1jXDu3FkS/UEy6ztQ1vbQXpTN9NOr+D66j4PDYwgHfodr1xih1HSsooxGsDCcqeW/60zUSYY40CN5HgInpxHGzozgSgoiL1qOOW0ZW/Kd9C5PZ+qpQt4/tQPji5/h3jXKorQstNoAAYuL14MWPskyUmLWx4FWWwKy5OBiDDgaHcYVzMVb3sba8hIGV/uY3PkYO7O0/OmVCt6+cofIC2OkBHIpMAZ4ymmiw22iT9ZRYdGx3a4n156IxeZgcjqmcGQIQ0qEtj1v8s+ZY/zlXC9/uzXO3UMb+fLEE/DNXfreHMGQGOGiw8MtWUOXpOPTDJFmSeSoQ8tP0tLRSTKXZmcRoqeHkANhoj293HxtH7NvnOA/333Lv774Ld9ejfLvT24wNDiIMXExPVIy9xI1fOgS+dgucssuctykoilSis3lfQgcHD5NTkaAkz97mu6W1aSH3Ozr2c2Dzz7nh+++568f3uCD0TeQU4vodPn5MaTiB4/Iny1avrbp+ERSsdJXgkFKZH7uEkI0Ooo7wUVGVhJBj4nDbdWcOtpFx4Enuf3RTR7cvMGvBo/jDRZxOODjNz41XxtF/mjU8Gu9ljMONU8G8hFtXhbmLyEMD42QEHCxYX0F/W3NbFicwd23jrLw0l7unT/L/S++YvoXx8kOLuLlZJkJScM3Fg33zVruWLT02dT8NC2AziozPz+HMDwySpLbwfXoST5aWGB5diYTT7Tx46YN/O/NIX746A6vnDhEQUaYk36JD51K/p4s8r1Xy/0ENb0uDY8lB7FJbi7FQx4ZQZK9bHpmJ4MvHee5lhbaF9fyWuNGxrd28s5AP2sai8lKXcRzmZm8lOLh1WASx5MT6Ev30ZqaQkEojGS1MBPrNtEzY6iVSox6PSa9iD/RSdVSF48ucVK0yEqy10wk6CTBZSacIbMkz0VDhZvaUjfLlnhIT7Ej6gwoFQpmY8CRGFChQBBEGotsvLXFywtNDlbmWLnd62JbrcTULonXn3FyepuToa0y17vtvP2UnXWlLsrDFgRBGe/cM3NzCCNjY/HmaNAZcFiNpHrNvNjmZKDdzdCzMqM7XdzslRh93snwdpnDbR466yWOtMkkykYEQY2o0aAQFMxcmkOIjp5BKcSAevSiEVE0EUmTCCVL6A1W2qtd1BRIPLnSQXWBE4fVhKDQI2p1mA0PvVajRalQMn0pVpQzZ+ILvU4fV2nQGYmkWikJ26nMk8hPt1OQJVGYZWNpho2CkI2ysJWikAWz0YBarUWj0cSH1MVYg40VJSZXp9UhakSUShUGrRqLXoPdJOK0GuLerFNh1qkxaFVYDBp0agG1SoVapUajfgi8MDmFMBwdiY9BnahDpVKTkhJg6ZICysrKycrMRrLLBIMZPJKXT25uHo88spikJD8lpWUk+BLjAmJvFQoFExcnEYaiURSCEp34MB+JCUlkZITIDGUSzgpT+Wgl61tbaW5upqGhgVAoRIo/ED9zSE40ai0qpRpBUDB+4SLCqdPReA5FrcjSpQWsWLGCNY+toay0jBUrqqiqWkljYxOFhYUsW1ZORcVyaqpryIvk0VDfQPWqamSnHH8/fuECwuDQcHwjNyeXSCSPgoJCampqqK1dTVNjE5WPrqCmppa1a9exefNmmpqayMnJpbiomKqqqriPReFwODk/MYHw1tsncbvctLS0kh3Ojic3loJYCA5Jxp+cgs+XgEt24/X4MJksKBWq+D2T0RRXGhNjNJiIfRqEz778PdOzs9y49T6Xr15jamaW+YUrXL5yLe7nFi6zcDm2vsqVq+9y7d3rXL9xk3ffe48Pbt/m088/j9sHd27z1YP7/B+082jenuYLAgAAAABJRU5ErkJggg==",
              },
              images: {
                fallback: {
                  src: "/static/fbe665f3e162cdf69697bd362bd5644b/10b75/carrie-1976.jpg",
                  srcSet:
                    "/static/fbe665f3e162cdf69697bd362bd5644b/0cf61/carrie-1976.jpg 50w,\n/static/fbe665f3e162cdf69697bd362bd5644b/4cfec/carrie-1976.jpg 100w,\n/static/fbe665f3e162cdf69697bd362bd5644b/10b75/carrie-1976.jpg 200w,\n/static/fbe665f3e162cdf69697bd362bd5644b/d5b68/carrie-1976.jpg 400w",
                  sizes: "(min-width: 200px) 200px, 100vw",
                },
                sources: [
                  {
                    srcSet:
                      "/static/fbe665f3e162cdf69697bd362bd5644b/998c5/carrie-1976.avif 50w,\n/static/fbe665f3e162cdf69697bd362bd5644b/520c2/carrie-1976.avif 100w,\n/static/fbe665f3e162cdf69697bd362bd5644b/af163/carrie-1976.avif 200w,\n/static/fbe665f3e162cdf69697bd362bd5644b/81c8e/carrie-1976.avif 400w",
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
        imdbId: "tt0081505",
        title: "The Shining",
        year: 1980,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Shining (1980)",
        releaseDate: "1980-05-23",
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
        imdbId: "tt0083767",
        title: "Creepshow",
        year: 1982,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Creepshow (1982)",
        releaseDate: "1982-05-20",
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
        imdbId: "tt0085382",
        title: "Cujo",
        year: 1983,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Cujo (1983)",
        releaseDate: "1983-08-10",
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
        imdbId: "tt0085407",
        title: "The Dead Zone",
        year: 1983,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Dead Zone (1983)",
        releaseDate: "1983-10-21",
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
        imdbId: "tt0085333",
        title: "Christine",
        year: 1983,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Christine (1983)",
        releaseDate: "1983-12-09",
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
        imdbId: "tt0087050",
        title: "Children of the Corn",
        year: 1984,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Children of the Corn (1984)",
        releaseDate: "1984-03-09",
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
        imdbId: "tt0087262",
        title: "Firestarter",
        year: 1984,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Firestarter (1984)",
        releaseDate: "1984-05-11",
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
        imdbId: "tt0218937",
        title: "The Devil's Gift",
        year: 1984,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Devil's Gift (1984)",
        releaseDate: "1984-10-01",
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
        imdbId: "tt0088889",
        title: "Cat's Eye",
        year: 1985,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Cat's Eye (1985)",
        releaseDate: "1985-04-12",
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
        imdbId: "tt0090021",
        title: "Silver Bullet",
        year: 1985,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Silver Bullet (1985)",
        releaseDate: "1985-10-11",
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
        imdbId: "tt0091499",
        title: "Maximum Overdrive",
        year: 1986,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Maximum Overdrive (1986)",
        releaseDate: "1986-07-25",
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
        imdbId: "tt0092005",
        title: "Stand by Me",
        year: 1986,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Stand by Me (1986)",
        releaseDate: "1986-08-06",
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
        imdbId: "tt0093894",
        title: "The Running Man",
        year: 1987,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Running Man (1987)",
        releaseDate: "1987-02-17",
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
        imdbId: "tt0092796",
        title: "Creepshow 2",
        year: 1987,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Creepshow 2 (1987)",
        releaseDate: "1987-05-01",
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
        imdbId: "tt0098084",
        title: "Pet Sematary",
        year: 1989,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Pet Sematary (1989)",
        releaseDate: "1989-04-21",
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
        imdbId: "tt0100740",
        title: "Tales from the Darkside: The Movie",
        year: 1990,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Tales from the Darkside: The Movie (1990)",
        releaseDate: "1990-05-04",
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
        imdbId: "tt0099697",
        title: "Graveyard Shift",
        year: 1990,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Graveyard Shift (1990)",
        releaseDate: "1990-10-26",
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
        imdbId: "tt0100157",
        title: "Misery",
        year: 1990,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Misery (1990)",
        releaseDate: "1990-11-29",
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
        imdbId: "tt0104692",
        title: "The Lawnmower Man",
        year: 1992,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Lawnmower Man (1992)",
        releaseDate: "1992-03-06",
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
        imdbId: "tt0105428",
        title: "Sleepwalkers",
        year: 1992,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Sleepwalkers (1992)",
        releaseDate: "1992-04-10",
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
        imdbId: "tt0106557",
        title: "Children of the Corn II: The Final Sacrifice",
        year: 1992,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Children of the Corn II: The Final Sacrifice (1992)",
        releaseDate: "1992-05-01",
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
        imdbId: "tt0106664",
        title: "The Dark Half",
        year: 1993,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Dark Half (1993)",
        releaseDate: "1993-04-23",
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
        imdbId: "tt0107665",
        title: "Needful Things",
        year: 1993,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Needful Things (1993)",
        releaseDate: "1993-08-27",
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
        imdbId: "tt0111161",
        title: "The Shawshank Redemption",
        year: 1994,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Shawshank Redemption (1994)",
        releaseDate: "1994-09-10",
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
        imdbId: "tt0113762",
        title: "The Mangler",
        year: 1995,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Mangler (1995)",
        releaseDate: "1995-03-03",
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
        imdbId: "tt0109642",
        title: "Dolores Claiborne",
        year: 1995,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Dolores Claiborne (1995)",
        releaseDate: "1995-03-24",
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
        imdbId: "tt0109415",
        title: "Children of the Corn III: Urban Harvest",
        year: 1995,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Children of the Corn III: Urban Harvest (1995)",
        releaseDate: "1995-06-07",
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
        imdbId: "tt0117894",
        title: "Thinner",
        year: 1996,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Thinner (1996)",
        releaseDate: "1996-10-25",
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
        imdbId: "tt0119784",
        title: "The Night Flier",
        year: 1997,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Night Flier (1997)",
        releaseDate: "1997-04-30",
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
        imdbId: "tt0118636",
        title: "Apt Pupil",
        year: 1998,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Apt Pupil (1998)",
        releaseDate: "1998-09-09",
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
        imdbId: "tt0120689",
        title: "The Green Mile",
        year: 1999,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Green Mile (1999)",
        releaseDate: "1999-12-06",
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
        imdbId: "tt0252501",
        title: "Hearts in Atlantis",
        year: 2001,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Hearts in Atlantis (2001)",
        releaseDate: "2001-09-07",
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
        imdbId: "tt0285531",
        title: "Dreamcatcher",
        year: 2003,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Dreamcatcher (2003)",
        releaseDate: "2003-03-06",
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
        imdbId: "tt0363988",
        title: "Secret Window",
        year: 2004,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Secret Window (2004)",
        releaseDate: "2004-03-07",
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
        imdbId: "tt0355954",
        title: "Riding the Bullet",
        year: 2004,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Riding the Bullet (2004)",
        releaseDate: "2004-10-15",
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
        imdbId: "tt0450385",
        title: "1408",
        year: 2007,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "1408 (2007)",
        releaseDate: "2007-06-12",
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
        imdbId: "tt0884328",
        title: "The Mist",
        year: 2007,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Mist (2007)",
        releaseDate: "2007-11-12",
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
        imdbId: "tt0963965",
        title: "Dolan's Cadillac",
        year: 2009,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Dolan's Cadillac (2009)",
        releaseDate: "2009-07-01",
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
        imdbId: "tt1409829",
        title: "Everything's Eventual",
        year: 2009,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Everything's Eventual (2009)",
        releaseDate: "2009-10-23",
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
        imdbId: "tt1745672",
        title: "Children of the Corn: Genesis",
        year: 2011,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Children of the Corn: Genesis (2011)",
        releaseDate: "2011-03-18",
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
        imdbId: "tt2199723",
        title: "Willa",
        year: 2012,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Willa (2012)",
        releaseDate: "2012-01-01",
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
        imdbId: "tt1939659",
        title: "Carrie",
        year: 2013,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Carrie (2013)",
        releaseDate: "2013-10-07",
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
        imdbId: "tt3812686",
        title: "The Boogeyman",
        year: 2014,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Boogeyman (2014)",
        releaseDate: "2014-09-07",
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
        imdbId: "tt2180994",
        title: "A Good Marriage",
        year: 2014,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Good Marriage (2014)",
        releaseDate: "2014-10-03",
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
        imdbId: "tt2481496",
        title: "Mercy",
        year: 2014,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Mercy (2014)",
        releaseDate: "2014-10-07",
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
        imdbId: "tt0775440",
        title: "Cell",
        year: 2016,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Cell (2016)",
        releaseDate: "2016-05-19",
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
        imdbId: "tt1648190",
        title: "The Dark Tower",
        year: 2017,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Dark Tower (2017)",
        releaseDate: "2017-07-31",
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
        imdbId: "tt1396484",
        title: "It",
        year: 2017,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "It (2017)",
        releaseDate: "2017-09-05",
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
        imdbId: "tt3748172",
        title: "Gerald's Game",
        year: 2017,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Gerald's Game (2017)",
        releaseDate: "2017-09-19",
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
        imdbId: "tt6214928",
        title: "1922",
        year: 2017,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "1922 (2017)",
        releaseDate: "2017-09-23",
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
        imdbId: "tt6952166",
        title: "The Doctor's Case",
        year: 2018,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Doctor's Case (2018)",
        releaseDate: "2018-01-01",
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
        imdbId: "tt7286958",
        title: "Mute",
        year: 2018,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Mute (2018)",
        releaseDate: "2018-08-31",
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
        imdbId: "tt0837563",
        title: "Pet Sematary",
        year: 2019,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Pet Sematary (2019)",
        releaseDate: "2019-03-16",
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
        imdbId: "tt7349950",
        title: "It Chapter Two",
        year: 2019,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "It Chapter Two (2019)",
        releaseDate: "2019-08-26",
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
        imdbId: "tt4687108",
        title: "In the Tall Grass",
        year: 2019,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "In the Tall Grass (2019)",
        releaseDate: "2019-09-20",
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
        imdbId: "tt5606664",
        title: "Doctor Sleep",
        year: 2019,
        grade: null,
        gradeValue: null,
        slug: null,
        sortTitle: "Doctor Sleep (2019)",
        releaseDate: "2019-10-30",
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
