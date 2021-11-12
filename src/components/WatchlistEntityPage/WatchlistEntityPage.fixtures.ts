import { Layout } from "gatsby-plugin-image";

export default {
  entity: {
    nodes: [
      {
        name: "John Carpenter",
        avatar: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "fixed" as Layout,
              placeholder: {
                fallback:
                  "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='200'%20viewBox='0%200%20200%20200'%20preserveAspectRatio='none'%3e%3cpath%20d='M70%203v3c10%203%2013%205%207%205-3%200-3%200-2%201s1%201-2%202l-3%202c-1-1-8%206-11%2012l-6%207c-4%202-6%206-7%2012%200%204%200%206-3%2012l-1%203-1%203c-1%200-2%202-1%204l-1%203c-1-1-2%201-3%2011-2%2012-2%2016%201%2023l1%208%202%205%203%205%202%202%204%203c6%208%208%2010%2012%2012s5%202%203-4l-2-6c0-4-2-7-4-6-1%201-2%201-3-1-3-3-3-8%200-10%203-1%203-4%203-14v-6c0-7-1-16-3-18v-2l1-4%201-3%202-3%204-4c5-1%207-2%206-3v-1h2c-1-1%201-4%203-3l1-1%201-1v1l1%201h4l5-2%202-1c1-2%202-1%202%201%201%203%205%204%205%201l1-1%201-2c0-5%202-5%205-2l3%201h1l3%202c2-1%204%201%204%204-1%202%204%206%207%206l3%201c0%202%203%203%205%203%202%201%204%2011%204%2024l3%2013%201%206-3%209c0-2-3%200-4%202l-1%202c-2%200-5%203-5%204h1v6c0%202-1%202-2%202l-2-1-4-5c-4-6-6-7-6-4%200%202-1%202-3%202-4%200-10%203-10%205v2l-1%202-1%202c-2-1-4%200-4%202s0%202%201%201%201-1%202%201h1l2-2c2-1%203-1%202-4%200-4%200-4%203-3%204%201%205%202%204%203l-2%201c-1-1-1%200-1%202%201%204-4%207-9%205h-4l4%201c10%202%2012%202%2011%203%200%201-2%202-5%202l-4%202h2l1%202%201%202%209%202c2%202-8%2011-11%2011-3-1-7%200-7%201l3%202%209%204%208%203c3-1%203%202%200%204-1%201-1%201%202%201l3%201-2%203-2%203-1%201c0%204%207-1%2010-6%202-5%204-5%205%200%200%209-4%2010-22%209-22-2-33-5-40-10l-4-3-4%202c-9%205-17%208-27%2010-13%204-20%206-22%208-2%201%2012%201%2095%201h98v-11c0-14%201-13-15-14a187%20187%200%2001-29-4l-7-2c-4-1-6-1-5%201l-1%203-2%202c0%202-6%206-8%205v-1c2-2%202-10%201-10h-1c2%200%201-7%200-7v-14h-1v-6l2-5v4c0%206%201%206%205%204%206-3%2012-12%2012-19l2-5c5-4%208-14%208-21-1-11-2-14-3-15-1-2-5-18-5-23l-2-7c-2-7-1-6%2011%206%2013%2012%2023%2025%2032%2040l6%208a167%20167%200%2000-38-51%20143%20143%200%2001-11-12c1%201%201%201%202-1%201-3%204-1%204%202l9%2011c10%2010%2022%2025%2030%2038l4%207V0h-17v8h-1l-1%202c-1%200-2-3-2-7%200-2-1-1-1%202l-1%206V0h-4c-4%200-6%201-7%202-2%202-2%202-3%200s-3-2-33-2c-29%200-32%200-31%202%201%201%200%202-2%200-1-2-3-1-5%203l-2%202%201-3c4-5%201-4-2%200l-4%203%201-2%202-3c1-2%201-2-8-2H70v3m111%2014l-2%2017a131%20131%200%2001-1%2018l2-5%201-2h1l1-31-2%203m-65%2072l-3%201-7%202c-5%202-6%202-6%205s1%205%206%208c3%202%205%202%203%200l-1-4%201-1%202-1%202-2%201%202c3%202%203%202%205%200h6l3%202%202-3c3-4%201-8-3-9h-11m-40%204l-3%201c1%200%200%202-2%203l-2%203%202-1h3v1l3%202c2%201%203%201%205-1%201-1%202-2%203-1%202%201%202-1%201-4l1-1c2-1%202-1%200-2H76'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
              },
              images: {
                fallback: {
                  src: "/static/3d015f5d5715c33ec988fb67831919f9/448fd/john-carpenter.jpg",
                  srcSet:
                    "/static/3d015f5d5715c33ec988fb67831919f9/448fd/john-carpenter.jpg 200w,\n/static/3d015f5d5715c33ec988fb67831919f9/382f3/john-carpenter.jpg 400w",
                  sizes: "200px",
                },
                sources: [
                  {
                    srcSet:
                      "/static/3d015f5d5715c33ec988fb67831919f9/c7382/john-carpenter.avif 200w,\n/static/3d015f5d5715c33ec988fb67831919f9/20a4d/john-carpenter.avif 400w",
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
            imdbId: "tt0069945",
            title: "Dark Star",
            year: 1974,
            lastReviewGrade: "C+",
            lastReviewGradeValue: 7,
            reviewedMovieSlug: "dark-star-1974",
            sortTitle: "Dark Star (1974)",
            releaseDate: "1974-04-01",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M7%20139v136l93%201h94V4H7v135M127%2026c0%202%200%203-3%202-2%200-3%200-4%202h-2c-2-4-8-2-8%203s6%207%208%203h-6c-1-2-1-2%203-2%203%200%204%200%205%202s2%202%204%202h4V24l-1%202M73%2053c-6%202-5%2014%202%2014l5-2c2-3%202-3%203-1l1%202v-2c-2-4%201-8%204-5%202%201%202%202%201%205v2c2%200%202-1%202-4s0-4%201-3h1l-1-2-1-2-1-2v2c0%202%200%202-2%201l-4%201c-2%202-2%202-3%200l-6-5-2%201m78%2019c-2%200-2%201-1%201v2h-4c-1%202-1%202-2%201h-5l-3%203%204-1%202-1%204%201c3%200%203%200%203%202%200%201%200%202%201%201%203%200%202%203-1%205s-3%203%201%202c4-2%209-2%209-1l2%201%201-8v-8h-11M48%2073h-7l2%203%205%202c3%200%204%201%202%202s-1%202%205%202h5l1-1h1v-2c2%201%207-1%2010-3l5-2%203-1H48m-9%2027c0%2021%200%2024%202%2024l1%202-2%201-1%2034v33h123v-39a191%20191%200%2000-1-41l1-6c0-5%200-5-2-4s-3%200-5-2l-3-3%201%203%203%205c-1%201%200%202%201%202l1%201-1%201c-1%200-1%204%201%204%202%202%200%203-5%203-4%200-4%200-2-2l1-2%201-3-5%201c-11%204-9%207%203%207h8v11c-1-1-2%200-3%202-1%203-3%204-3%202l1-2%201-1c-2-2-3-1-3%202l-1%204-1-1c0-3-1-2-4%200v2h4c1-1%202%200%202%203s-2%206-4%205v-3l-1-1-1%201-2-1c-2-3-3-3-3-2%200%203-3%204-4%202-2-1-2-1-3%201l-3%202c-2%200-2%200-1%201%201%202%205%202%206%200h2l3-1h2l-1%203-1%201c-2%200-2%201-1%203%201%201%201%201%201-1%201-2%201-2%202-1l-1%203c-2%202-3%206-2%206l1-1h2l1-1h-1l-1-1c1-2%205-3%205-1l2%203%201%202-1%201h-5l-4%201c-2-1-2%200-2%203s0%204-3%203c-2%200-2%200-1%201v3c1%201%201%201-2%201-4-1-5%200-2%204%201%202%202%202%203%201s4%200%203%201h-2l-1%201c2%202-4%206-6%205l-3%201c0%201-4%200-4-2-1-1-1-1-1%201s-3%202-6%200c-1-2-1-3%201-2s4-1%203-2c-1-2%200-5%201-5l2-2c0-2%203-4%203-4%202%202%206%202%205%201l-1-3-1-4%201-1c3-1%203-3%200-5l-1-1v-2h1c2%200%203%203%203%206%201%202%202%203%204%203%203%201%204-1%202-3l-2-3-1-1-2-2v-2c1%201%202%200%202-1%201-4%201-4-1-2h-2c0-2-1-2-3-2l-1-2c0-5-3%201-3%206s-1%206-2%204-2-2-6%200c-5%203-6%204-3%204s3%202%200%202c-3%201-4%200-3-2l-1-1c-1%201-2%200-3-2%200-4-2-4-1-1l-1%203c-1%202%200%207%202%209v5c-2%201-2%201-3-2l-1-3-1-7v-4l1-2c0-2-1-2-2-1l-2-1-1-2v5l-2-2-1-3-1-2c0-3-2-1-1%201v1c-1-1-3%201-5%203-4%203-5%204-6%202-4-5-8-1-6%204l2%204c1%201%201%202%202%201l1-1v-2c1-4%202-2%202%205s-1%208-2%208l-2%201-1%204c-2%203-5%202-5-2%200-2%200-2%202-2h1c-1-1%200-1%200%200l2-2v-1c-2%201-5-3-5-5%201-3%200-2-2%200h-3v-4c2-1%202-1-1-2l-3-3c0-2%203-3%204-1%202%203%201-1%200-4-2-3-2-4%201-4l2%201-1%201-1%202c0%202%202%203%202%200h4l1-2h1c2%201%202%201%202-1s-1-3-2-3c-1%201-3%200-5-2l-5-4-2-2%202-1c2-1%203%200%205%201h2c1-1%201%200%201%201l1%204%201-3v-4c1%201%202%200%203-4l-1-2-3-1c-1-1-1-1-1%202l1%203v1l-3-2-3-3c1-1%200-1-1-1l-4-2-4-1v1c2%202%201%208-1%207-2-2-3-8-2-9v-3c-2-2-3-3-2%200l-1%201-1-2c1-1%200-2-1-2l-2-1h-1c-2%201-2%201-2-1l-2-9-1-8a2869%202869%200%20017-8c-1%201-2%200-2-1l-2-5c-3-4-4-7-2-5l1-1-1-1-1-2c0-1%200-2-1-1l-1-1-1-1-1%2024m61%209l-1%203%201%207v6h7c6%200%206%200%206-2l2-5c2-2%203-7%201-8-1-1-5%204-7%208s-4%203-4%200l-2-4-2-4c0-2-1-2-1-1m-4%201l-2%204-1%206c1%203%200%203-3%200-6-6-8-7-9-6-2%202%204%2015%208%2015l5-2%205-2-1-8-2-8v1m-30%2062l-2%2010c0%205%200%205%202%205s2%200%201%202v1h2c1%201%206-4%206-5l-1-1c-3%200-4-3-5-7%200-4-1-7-3-5m-4%2041v14h6c7%200%2013-3%2015-9%205-11-2-20-15-20h-6v15m26-1a1851%201851%200%2000-3%2010l2-5h13l3%206%202%206%201-8%201-7%205%206%206%208c2%201%201-2-3-8-6-6-6-7-3-7s6-4%206-7c0-5-4-8-10-8h-4v12c0%208%200%2011-1%209a4598%204598%200%2001-9-21l-6%2014m32%201l1%2015%201-7%201-7%208%207c4%204%207%207%208%206l-7-7-8-8%207-6%207-8-8%207-8%207v-7l-1-7-1%2015m-56-1l1%2014%204-1c19-1%2018-24%200-26h-5v13m42-6c0%206%200%206%203%206%204%200%207-3%207-6%200-5-2-6-6-6h-4v6m-36%2024c-5%204-3%209%206%2014%204%202%206%203%206%205%201%207-8%2011-13%206-3-4-4-4-3-1%203%205%2013%206%2016%201%204-5%202-10-7-14-4-2-6-3-6-5-1-5%206-8%2011-4%203%202%204%201%200-2-3-2-7-3-10%200m30%2012c-7%2014-10%2023-4%2012l3-6h5l6%201c2%200%203%201%204%205a653%20653%200%2000-8-25l-6%2013m20-9v26l1-7%201-7%205%207%206%207c2%200%201-1-3-7-6-8-6-8-3-8%208%200%209-12%202-14-6-2-9-1-9%203m1%204v6h4c3%200%207-3%207-6s-3-6-7-6h-4v6'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
                  },
                  images: {
                    fallback: {
                      src: "/static/1c63fcae4eecde214073d73029c3d029/10b75/dark-star-1974.jpg",
                      srcSet:
                        "/static/1c63fcae4eecde214073d73029c3d029/0cf61/dark-star-1974.jpg 50w,\n/static/1c63fcae4eecde214073d73029c3d029/4cfec/dark-star-1974.jpg 100w,\n/static/1c63fcae4eecde214073d73029c3d029/10b75/dark-star-1974.jpg 200w,\n/static/1c63fcae4eecde214073d73029c3d029/d5b68/dark-star-1974.jpg 400w",
                      sizes: "(min-width: 200px) 200px, 100vw",
                    },
                    sources: [
                      {
                        srcSet:
                          "/static/1c63fcae4eecde214073d73029c3d029/998c5/dark-star-1974.avif 50w,\n/static/1c63fcae4eecde214073d73029c3d029/520c2/dark-star-1974.avif 100w,\n/static/1c63fcae4eecde214073d73029c3d029/af163/dark-star-1974.avif 200w,\n/static/1c63fcae4eecde214073d73029c3d029/81c8e/dark-star-1974.avif 400w",
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
            imdbId: "tt0074156",
            title: "Assault on Precinct 13",
            year: 1976,
            lastReviewGrade: "A-",
            lastReviewGradeValue: 11,
            reviewedMovieSlug: "assault-on-precinct-13-1976",
            sortTitle: "Assault on Precinct 13 (1976)",
            releaseDate: "1976-10-08",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M0%2022l1%2022a3084%203084%200%2000130-13%2011226%2011226%200%200068-7l1%2010%201-12V0H0v22m169%208c-2%200-2%200-1%207%201%204%200%204-2-2-3-4-3-5-6-4l-3%201%201%205v2a578%20578%200%20013%2015c3-1%204-4%201-10-3-7-1-6%202%202%204%206%204%207%206%207l3-1-1-21-3-1m-21%202l1%204%201%2011c0%208%201%208%202%208%204-1%205-5%204-13l-2-9-6-1m-6%202c-4%203-2%2020%203%2021%204%202%205%201%203-3l-2-10v-9c0-1-3-1-4%201m-19%201c-2%200-2%201-2%207%202%2015%202%2015%205%2015h3l-1-6c-2-18-1-17-5-16m-20%202a738%20738%200%2001-1%2022c0%201%202%201%204-1V48c0-11-1-12-3-11m5%203l2%2019%203-1c2%200%202-1%202-9-1-12-2-13-5-13-2%200-2%200-2%204m-15-2c-2%200-2%202%200%2016%200%204%204%208%207%207v-4l-3-11c0-9%200-9-4-8m-13%204v3c-1-2-2-1-3%207l-2%2010h3c3%200%203%200%203-3%200-5%201-10%202-9v4c-1%203-1%204%201%204l2%202%207%201-4-11c-4-10-4-11-7-11s-3%200-2%203m-19%200c-5%204-3%2010%205%2013%203%201%203%202%202%205%200%204%201%205%204%202%205-4%203-11-3-12-4-2-5-3-4-7%200-4-1-4-4-1m-17%202c-4%204-2%2010%205%2013%203%201%203%202%203%204%200%204%202%205%204%202%202-1%203-7%201-9l-5-3c-4-2-4-2-3-5%200-5-2-5-5-2m-12%204c1%206%201%207-1%203-1-2-1-3-2-2l-1%2010-2%208h3c3%200%203%200%203-7l2-5v5c-1%202-1%203%201%203l2%202%204%201c4%200%204%201-1-13-4-8-4-9-7-9h-3l2%204m139%209h-2l-4-1c-4%200-5%201-5%203%200%203%200%203%203%203s3%200%203%203%200%204%202%204c3%200%204%203%202%205-1%203%200%206%202%205%205-1%207-9%203-12-2-3-3-3-1-5%203-4%200-9-3-5m-18%201v11l1%2011h3c3%200%203%200%203-4l-2-11c0-7%200-8-3-8l-2%201m-11%202h-1l-3-1h-2v9c1%2013%202%2014%205%2014%202%200%202-1%202-2V62c1%203%204%202%204-1s-3-4-5-1m-25%202c-2%202-2%203-2%208%200%209%203%2014%207%2014%202%200%203-5%201-5l-1-10c0-10-1-11-5-7m-17%201c-3%200-3%201-2%203l2%203h-1c-1-1-1%200-1%204l1%208c0%203%201%205%203%204%203%200%202-5%200-10l-2-5%205%207c4%209%203%208%206%208l3-1-1-10c0-11%200-12-3-12s-3%206%200%2010l1%204-4-7-4-7-3%201m-8%201c-2%200-2%200-2%207%202%2015%202%2016%205%2015h2V76c-1-12-2-13-5-12m-16%202c-2%202-2%203-2%209%200%2010%202%2013%207%2013%202%200%202%200%201-5-2-3-3-11-2-13s0-6-1-6l-3%202m-9%201c-2%204-2%204-2%202s-1-2-3-2c-3%200-3%200-3%203l2%2012c0%206%201%208%202%208%204%200%204-1%203-10v-9h3c3%200%203-1%202-3%200-2-4-3-4-1m-23%202c-2%200-2%200%200%2011l1%2012%203-1c2%200%202%200%202-7-1-11-2-16-3-16l-3%201m5%201l2%203c1%200%202%204%200%204s-1%205%200%205l2%205c1%203%201%204%204%203%203%200%203%200%202-4l-1-5v-6c0-5-1-7-6-7-2%200-3%200-3%202m-22%207c2%2015%202%2016%205%2016s3%200%202-10c-1-12-2-13-5-13h-2v7m119%207a405203%20405203%200%2000-86%2011l-3%203-2-2c-2%200-2%200%200-2h-1a873%20873%200%2001-49%205H0v201h201v-91l-1-111V79h-4l-50%205m-30%2017c1%204%204%206%206%203h1c0%202%206%201%206-1h1c1%203%204%202%204%200l-1-2-1-2h1l1-1h-7c0-2-2-1-2%202l-1%204v-4c0-4-2-4-3%200%200%203%200%203-2%202-1-2-2-4%200-3l1-1-2-1c-2%200-2%201-2%204m39-2l2%203v2l-1-1h-1l2%202%202-2h1c0%202%202%203%202%201h2a378%20378%200%20012-2c0%203%200%203%203%203%202%200%203-1%203-2l1%201c1%201%201%201%201-3v-4h-5c-4%200-5%200-5%202h-1c-1-2-8-3-8%200m-132%201l-9%201v19l-1%2019v3c2%203%201%204-2%202-4-2-5-1-2%201v2c-3%200-1%203%203%203%203%201%203%203-1%202-4%200-3%200%205%204%204%201%205%203%201%202l-2%201-1%2047v46h21c21%200%2022%200%2022-2v-17h-4l-17-3c-2%200-2%200-2-20%200-14-1-17-1-12l-1-15v-22l4%201a64%2064%200%200013%201h3l-3%201h-4c-1-2-2%200-3%202a422%20422%200%2001-1%206c-2%200-2%201-2%206s0%205%201%203l1-4c-1-2%200-4%202-3%204%202%2011%201%2016-1%204-2%205-3%205-1l-2%202%201%201v1c-4-1-13%202-15%204-2%203-3%204-1%203l3%201%202%202c2%200%202%200%201%202-2%201-2%202%201%201%202%200%204%204%206%2010l3%207%201%202v1l2%203c1%203%201%203%201-2%200-4%200-5%202-6l2-2h-2c-2-1-2%200-2%201%200%203-1%201-3-4l-4-8c-2-3-1-4%201-2l2%201%201%202c1%201%201%201%202-1%201-4%202-4%204-1%201%202%201%202-1%202l-1%202v1h-1l2%205h1l6%203c3%200%203%200%202-1-1-2-1-2%203-5%202%200%203-1%203-3l-2%201c-2%203-7%204-6%202s-1-6-2-6l-1%201v1h-1v-3l1-1%202%201%203%201%203-1-1-1-1-2c1-3%200-3-1-3-2%200-2%200-1%201v2c0%202-1%202-2%201h-3c-2%200-2%200-1-2h-2l1-2h1l1%201c1-1%200-6-3-12l-2-8v-13H32h1l1-2-1-9c0-11%200-10-7-7l-6%201c-1%200%201-2%206-3%206-3%207-4%207-11%200-5%200-6%203-6%203-1%203-4-1-5-2%200-2-1-2-5v-5H23m24%209l-1%206c1%202%200%203-1%203l-3%201c-1%201%200%206%201%206v2h1c1-1%201-1%201%202%200%204-2%206-4%204h-1a1%201%200%20001%201l1%201-1%201c-1%201%200%204%201%204%204%200%206-2%205-5v-4l1-1%201-2%202-2h1c1-1%200-1-1-1l-4-2-1-2v-1h2c0%201%201%202%202%201l2%201c-1%201%200%201%201%201%202%200%202%202%200%205-3%203-4%206-4%209l-1%205c-1%201%200%201%205%201%205-1%207-1%208-3%202-3%204-3%203%200l-1%202%2010%201c6%200%208%200%206-1-4%200-4-1-3-2%202-1%202-1%200-2-1-1-2-1-4%201v1l2%201-6-1v-5c0-3-1-4-2-2h-1l-1-4%201-1c1%201%201-1-1-5-1-3-4-4-6-1-2%202-3%201-1-2%200-2%202-3%202-2l1-1v-1l1-2c0-2%200-2-1-1h-2l-1-1-2-1h-3l-2-1h-1v-3c-1-1-1%200-2%202m75%203v4h6l6-1h1c1%202%204%200%204-3v-4h-7l-6%201-1%203c0%204-2%204-2-1l-1-3v4m3%207h-7c-6%200-7%200-8%202l-2%201%201-2c1-1%200-1-3-1-4%200-4%200-4%204s0%204%204%204c3%200%204%200%203-1v-2l2-1v1c-2%201%200%203%202%203s2-2%201-4c-2-2-2-3%200-3%201%200%202%201%202%204l1%204v-4l1-4%201%204c0%202%200%203%201%202%200-2%200-2%202%200h2c1%202%204%200%204-2s0-2%201%200c0%203%201%203%202-1v-4h-6m-4%2015c0%203%200%204%202%204v-6c1-1%202%200%202%203%201%204%203%203%203%200l1-3v3c0%203%200%203%203%203%202%200%203%200%203-2l1%201c1%201%201%201%201-2v-3l2%203%201%202%201-5c0-2%200-2-7-2-6%200-7%200-7%202h-1l-2-2c-3%200-3%200-3%204m50%2025l-2%202h-3c-2-2-3-2-4%201v3l1-1%202-1c3%200%203%200%202%202l-1%207-1%204c-3%200-3%202-2%204%202%202%204%203%204%201l-2-1c-1-1-1-1%201-1l2%201c0%202%2011%204%2014%202%203-1%204-1%202%201l-2%203-1%201%201%201%202%202%201%201%202-1-1-1-1-1h1v-16l-1-1c1-2%200-2-1-2l-2-1%201-1c3%200%204%200%204-2-1-3-5-6-10-6l-4-1c-1-1-1-1-2%201m-42%2028c0%202-3%203-7%201-2-1-3-1-5%201l-2%202c1%201%202%200%202-1%202-3%208%201%207%204l1%203v2c2%202%203%205%201%205v1c2%200%203%206%201%206v3l-2%204-2%203-1%203-4-2c-5-2-7-6-7-10%200-2%200-2-5%200-6%202-6%202-6%200l-2%204v6l-2%201c-1%200-2%200-1-1%200-2-3-4-5-4l-2-1c-1-2-7%200-7%203l-1%202c0%202%201%204%205%204l10%201h2c0-1%202-4%204-4%201%200%201%201-1%202l-2%202%203%201%207%201h4c0%201%2013%203%2020%203l2%201c-1%202%208%203%2013%202%206%200%2022%202%2019%203l-1%201%2020%204c1%200%202-3%202-24v-24h-3c-4%200-5%202-5%2015a62%2062%200%2001-2%2018v1l-1%204-3%204%201%201c1%201%201%201-2%201-4%200-4-4-1-7%203-2%203-3%203-18a1663%201663%200%2000-1-18l-2-1-1-1-2%201-2%201-4-1v-2c0-3%201-3%206-4l6-1c0-1-1-2-3-1l-6%201c-3-1-4%200-4%201l-1%201h-1v1c3%200%202%202%200%202-1%200-1%201%201%203l2%202h-2c-3%200-6-5-4-6%202%200%202-1%200-2h-1c0%202-1%202-3%204l-4%203h1c3-2%207%200%207%203l1%202c3%200%207%207%208%2012%200%206-1%207-3%201l-2-3%201%204c0%205-1%205-3-1l-3-5-5%204-5%204c-1%200%202%202%205%202l3-1%202-2v14c2%202%201%203-3%203-4-1-6-3-7-9l-1-5-1-4c0-4%200-5-3-3-1%202-1%203%201%204v3c0%202-2%203-2%200s-2%200-3%204c-1%206-3%206-3%201%200-6-1-5-1%201%200%204%200%204-2%202s-2-10%200-16c1-3%201-3%202-2l3%202%202%201%202-3c2-6%204-8%207-8l2-1c0-2-1-2-5-2h-5v8l-1-2c0-1%200-2-2-1v-3l-1-1-2-2-4-2c-2-2-2-2-1-4l3-2c1%200%202-1%202-3s0-3-2-3c-1%200-2%201-1%203m41%2011l-2%201c-2%200-3%203-3%204l1%207%202%208c1%200%202%202%202%206l1%206%201-3%201-10c0-9-2-22-3-19M68%20237v6l-1%206-2%203h120l-40-6a6115%206115%200%2000-77-9'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
                  },
                  images: {
                    fallback: {
                      src: "/static/bd5a2bda743f82a5d12f992944e1edeb/10b75/assault-on-precinct-13-1976.jpg",
                      srcSet:
                        "/static/bd5a2bda743f82a5d12f992944e1edeb/0cf61/assault-on-precinct-13-1976.jpg 50w,\n/static/bd5a2bda743f82a5d12f992944e1edeb/4cfec/assault-on-precinct-13-1976.jpg 100w,\n/static/bd5a2bda743f82a5d12f992944e1edeb/10b75/assault-on-precinct-13-1976.jpg 200w,\n/static/bd5a2bda743f82a5d12f992944e1edeb/d5b68/assault-on-precinct-13-1976.jpg 400w",
                      sizes: "(min-width: 200px) 200px, 100vw",
                    },
                    sources: [
                      {
                        srcSet:
                          "/static/bd5a2bda743f82a5d12f992944e1edeb/998c5/assault-on-precinct-13-1976.avif 50w,\n/static/bd5a2bda743f82a5d12f992944e1edeb/520c2/assault-on-precinct-13-1976.avif 100w,\n/static/bd5a2bda743f82a5d12f992944e1edeb/af163/assault-on-precinct-13-1976.avif 200w,\n/static/bd5a2bda743f82a5d12f992944e1edeb/81c8e/assault-on-precinct-13-1976.avif 400w",
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
            imdbId: "tt0077651",
            title: "Halloween",
            year: 1978,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Halloween (1978)",
            releaseDate: "1978-10-25",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0080749",
            title: "The Fog",
            year: 1980,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Fog (1980)",
            releaseDate: "1980-01-01",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0082340",
            title: "Escape from New York",
            year: 1981,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Escape from New York (1981)",
            releaseDate: "1981-04-01",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0084787",
            title: "The Thing",
            year: 1982,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Thing (1982)",
            releaseDate: "1982-06-25",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Christine (1983)",
            releaseDate: "1983-12-09",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0088172",
            title: "Starman",
            year: 1984,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Starman (1984)",
            releaseDate: "1984-12-14",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0090728",
            title: "Big Trouble in Little China",
            year: 1986,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Big Trouble in Little China (1986)",
            releaseDate: "1986-07-02",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0093777",
            title: "Prince of Darkness",
            year: 1987,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Prince of Darkness (1987)",
            releaseDate: "1987-10-21",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0096256",
            title: "They Live",
            year: 1988,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "They Live (1988)",
            releaseDate: "1988-11-04",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0104850",
            title: "Memoirs of an Invisible Man",
            year: 1992,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Memoirs of an Invisible Man (1992)",
            releaseDate: "1992-02-28",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0113409",
            title: "In the Mouth of Madness",
            year: 1995,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "In the Mouth of Madness (1994)",
            releaseDate: "1994-12-10",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0114852",
            title: "Village of the Damned",
            year: 1995,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Village of the Damned (1995)",
            releaseDate: "1995-04-28",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0116225",
            title: "Escape from L.A.",
            year: 1996,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Escape from L.A. (1996)",
            releaseDate: "1996-08-09",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0120877",
            title: "Vampires",
            year: 1998,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Vampires (1998)",
            releaseDate: "1998-04-15",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0228333",
            title: "Ghosts of Mars",
            year: 2001,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Ghosts of Mars (2001)",
            releaseDate: "2001-08-24",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt1369706",
            title: "The Ward",
            year: 2010,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Ward (2010)",
            releaseDate: "2010-09-13",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
    ],
    releaseYears: [
      "1974",
      "1976",
      "1978",
      "1980",
      "1981",
      "1982",
      "1983",
      "1984",
      "1986",
      "1987",
      "1988",
      "1992",
      "1995",
      "1996",
      "1998",
      "2001",
      "2010",
    ],
  },
};

export const dataNoAvatar = {
  entity: {
    nodes: [
      {
        name: "John Carpenter",
        avatar: null,
        watchlistMovies: [
          {
            imdbId: "tt0069945",
            title: "Dark Star",
            year: 1974,
            lastReviewGrade: "C+",
            lastReviewGradeValue: 7,
            reviewedMovieSlug: "dark-star-1974",
            sortTitle: "Dark Star (1974)",
            releaseDate: "1974-04-01",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M7%20139v136l93%201h94V4H7v135M127%2026c0%202%200%203-3%202-2%200-3%200-4%202h-2c-2-4-8-2-8%203s6%207%208%203h-6c-1-2-1-2%203-2%203%200%204%200%205%202s2%202%204%202h4V24l-1%202M73%2053c-6%202-5%2014%202%2014l5-2c2-3%202-3%203-1l1%202v-2c-2-4%201-8%204-5%202%201%202%202%201%205v2c2%200%202-1%202-4s0-4%201-3h1l-1-2-1-2-1-2v2c0%202%200%202-2%201l-4%201c-2%202-2%202-3%200l-6-5-2%201m78%2019c-2%200-2%201-1%201v2h-4c-1%202-1%202-2%201h-5l-3%203%204-1%202-1%204%201c3%200%203%200%203%202%200%201%200%202%201%201%203%200%202%203-1%205s-3%203%201%202c4-2%209-2%209-1l2%201%201-8v-8h-11M48%2073h-7l2%203%205%202c3%200%204%201%202%202s-1%202%205%202h5l1-1h1v-2c2%201%207-1%2010-3l5-2%203-1H48m-9%2027c0%2021%200%2024%202%2024l1%202-2%201-1%2034v33h123v-39a191%20191%200%2000-1-41l1-6c0-5%200-5-2-4s-3%200-5-2l-3-3%201%203%203%205c-1%201%200%202%201%202l1%201-1%201c-1%200-1%204%201%204%202%202%200%203-5%203-4%200-4%200-2-2l1-2%201-3-5%201c-11%204-9%207%203%207h8v11c-1-1-2%200-3%202-1%203-3%204-3%202l1-2%201-1c-2-2-3-1-3%202l-1%204-1-1c0-3-1-2-4%200v2h4c1-1%202%200%202%203s-2%206-4%205v-3l-1-1-1%201-2-1c-2-3-3-3-3-2%200%203-3%204-4%202-2-1-2-1-3%201l-3%202c-2%200-2%200-1%201%201%202%205%202%206%200h2l3-1h2l-1%203-1%201c-2%200-2%201-1%203%201%201%201%201%201-1%201-2%201-2%202-1l-1%203c-2%202-3%206-2%206l1-1h2l1-1h-1l-1-1c1-2%205-3%205-1l2%203%201%202-1%201h-5l-4%201c-2-1-2%200-2%203s0%204-3%203c-2%200-2%200-1%201v3c1%201%201%201-2%201-4-1-5%200-2%204%201%202%202%202%203%201s4%200%203%201h-2l-1%201c2%202-4%206-6%205l-3%201c0%201-4%200-4-2-1-1-1-1-1%201s-3%202-6%200c-1-2-1-3%201-2s4-1%203-2c-1-2%200-5%201-5l2-2c0-2%203-4%203-4%202%202%206%202%205%201l-1-3-1-4%201-1c3-1%203-3%200-5l-1-1v-2h1c2%200%203%203%203%206%201%202%202%203%204%203%203%201%204-1%202-3l-2-3-1-1-2-2v-2c1%201%202%200%202-1%201-4%201-4-1-2h-2c0-2-1-2-3-2l-1-2c0-5-3%201-3%206s-1%206-2%204-2-2-6%200c-5%203-6%204-3%204s3%202%200%202c-3%201-4%200-3-2l-1-1c-1%201-2%200-3-2%200-4-2-4-1-1l-1%203c-1%202%200%207%202%209v5c-2%201-2%201-3-2l-1-3-1-7v-4l1-2c0-2-1-2-2-1l-2-1-1-2v5l-2-2-1-3-1-2c0-3-2-1-1%201v1c-1-1-3%201-5%203-4%203-5%204-6%202-4-5-8-1-6%204l2%204c1%201%201%202%202%201l1-1v-2c1-4%202-2%202%205s-1%208-2%208l-2%201-1%204c-2%203-5%202-5-2%200-2%200-2%202-2h1c-1-1%200-1%200%200l2-2v-1c-2%201-5-3-5-5%201-3%200-2-2%200h-3v-4c2-1%202-1-1-2l-3-3c0-2%203-3%204-1%202%203%201-1%200-4-2-3-2-4%201-4l2%201-1%201-1%202c0%202%202%203%202%200h4l1-2h1c2%201%202%201%202-1s-1-3-2-3c-1%201-3%200-5-2l-5-4-2-2%202-1c2-1%203%200%205%201h2c1-1%201%200%201%201l1%204%201-3v-4c1%201%202%200%203-4l-1-2-3-1c-1-1-1-1-1%202l1%203v1l-3-2-3-3c1-1%200-1-1-1l-4-2-4-1v1c2%202%201%208-1%207-2-2-3-8-2-9v-3c-2-2-3-3-2%200l-1%201-1-2c1-1%200-2-1-2l-2-1h-1c-2%201-2%201-2-1l-2-9-1-8a2869%202869%200%20017-8c-1%201-2%200-2-1l-2-5c-3-4-4-7-2-5l1-1-1-1-1-2c0-1%200-2-1-1l-1-1-1-1-1%2024m61%209l-1%203%201%207v6h7c6%200%206%200%206-2l2-5c2-2%203-7%201-8-1-1-5%204-7%208s-4%203-4%200l-2-4-2-4c0-2-1-2-1-1m-4%201l-2%204-1%206c1%203%200%203-3%200-6-6-8-7-9-6-2%202%204%2015%208%2015l5-2%205-2-1-8-2-8v1m-30%2062l-2%2010c0%205%200%205%202%205s2%200%201%202v1h2c1%201%206-4%206-5l-1-1c-3%200-4-3-5-7%200-4-1-7-3-5m-4%2041v14h6c7%200%2013-3%2015-9%205-11-2-20-15-20h-6v15m26-1a1851%201851%200%2000-3%2010l2-5h13l3%206%202%206%201-8%201-7%205%206%206%208c2%201%201-2-3-8-6-6-6-7-3-7s6-4%206-7c0-5-4-8-10-8h-4v12c0%208%200%2011-1%209a4598%204598%200%2001-9-21l-6%2014m32%201l1%2015%201-7%201-7%208%207c4%204%207%207%208%206l-7-7-8-8%207-6%207-8-8%207-8%207v-7l-1-7-1%2015m-56-1l1%2014%204-1c19-1%2018-24%200-26h-5v13m42-6c0%206%200%206%203%206%204%200%207-3%207-6%200-5-2-6-6-6h-4v6m-36%2024c-5%204-3%209%206%2014%204%202%206%203%206%205%201%207-8%2011-13%206-3-4-4-4-3-1%203%205%2013%206%2016%201%204-5%202-10-7-14-4-2-6-3-6-5-1-5%206-8%2011-4%203%202%204%201%200-2-3-2-7-3-10%200m30%2012c-7%2014-10%2023-4%2012l3-6h5l6%201c2%200%203%201%204%205a653%20653%200%2000-8-25l-6%2013m20-9v26l1-7%201-7%205%207%206%207c2%200%201-1-3-7-6-8-6-8-3-8%208%200%209-12%202-14-6-2-9-1-9%203m1%204v6h4c3%200%207-3%207-6s-3-6-7-6h-4v6'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
                  },
                  images: {
                    fallback: {
                      src: "/static/1c63fcae4eecde214073d73029c3d029/10b75/dark-star-1974.jpg",
                      srcSet:
                        "/static/1c63fcae4eecde214073d73029c3d029/0cf61/dark-star-1974.jpg 50w,\n/static/1c63fcae4eecde214073d73029c3d029/4cfec/dark-star-1974.jpg 100w,\n/static/1c63fcae4eecde214073d73029c3d029/10b75/dark-star-1974.jpg 200w,\n/static/1c63fcae4eecde214073d73029c3d029/d5b68/dark-star-1974.jpg 400w",
                      sizes: "(min-width: 200px) 200px, 100vw",
                    },
                    sources: [
                      {
                        srcSet:
                          "/static/1c63fcae4eecde214073d73029c3d029/998c5/dark-star-1974.avif 50w,\n/static/1c63fcae4eecde214073d73029c3d029/520c2/dark-star-1974.avif 100w,\n/static/1c63fcae4eecde214073d73029c3d029/af163/dark-star-1974.avif 200w,\n/static/1c63fcae4eecde214073d73029c3d029/81c8e/dark-star-1974.avif 400w",
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
            imdbId: "tt0074156",
            title: "Assault on Precinct 13",
            year: 1976,
            lastReviewGrade: "A-",
            lastReviewGradeValue: 11,
            reviewedMovieSlug: "assault-on-precinct-13-1976",
            sortTitle: "Assault on Precinct 13 (1976)",
            releaseDate: "1976-10-08",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M0%2022l1%2022a3084%203084%200%2000130-13%2011226%2011226%200%200068-7l1%2010%201-12V0H0v22m169%208c-2%200-2%200-1%207%201%204%200%204-2-2-3-4-3-5-6-4l-3%201%201%205v2a578%20578%200%20013%2015c3-1%204-4%201-10-3-7-1-6%202%202%204%206%204%207%206%207l3-1-1-21-3-1m-21%202l1%204%201%2011c0%208%201%208%202%208%204-1%205-5%204-13l-2-9-6-1m-6%202c-4%203-2%2020%203%2021%204%202%205%201%203-3l-2-10v-9c0-1-3-1-4%201m-19%201c-2%200-2%201-2%207%202%2015%202%2015%205%2015h3l-1-6c-2-18-1-17-5-16m-20%202a738%20738%200%2001-1%2022c0%201%202%201%204-1V48c0-11-1-12-3-11m5%203l2%2019%203-1c2%200%202-1%202-9-1-12-2-13-5-13-2%200-2%200-2%204m-15-2c-2%200-2%202%200%2016%200%204%204%208%207%207v-4l-3-11c0-9%200-9-4-8m-13%204v3c-1-2-2-1-3%207l-2%2010h3c3%200%203%200%203-3%200-5%201-10%202-9v4c-1%203-1%204%201%204l2%202%207%201-4-11c-4-10-4-11-7-11s-3%200-2%203m-19%200c-5%204-3%2010%205%2013%203%201%203%202%202%205%200%204%201%205%204%202%205-4%203-11-3-12-4-2-5-3-4-7%200-4-1-4-4-1m-17%202c-4%204-2%2010%205%2013%203%201%203%202%203%204%200%204%202%205%204%202%202-1%203-7%201-9l-5-3c-4-2-4-2-3-5%200-5-2-5-5-2m-12%204c1%206%201%207-1%203-1-2-1-3-2-2l-1%2010-2%208h3c3%200%203%200%203-7l2-5v5c-1%202-1%203%201%203l2%202%204%201c4%200%204%201-1-13-4-8-4-9-7-9h-3l2%204m139%209h-2l-4-1c-4%200-5%201-5%203%200%203%200%203%203%203s3%200%203%203%200%204%202%204c3%200%204%203%202%205-1%203%200%206%202%205%205-1%207-9%203-12-2-3-3-3-1-5%203-4%200-9-3-5m-18%201v11l1%2011h3c3%200%203%200%203-4l-2-11c0-7%200-8-3-8l-2%201m-11%202h-1l-3-1h-2v9c1%2013%202%2014%205%2014%202%200%202-1%202-2V62c1%203%204%202%204-1s-3-4-5-1m-25%202c-2%202-2%203-2%208%200%209%203%2014%207%2014%202%200%203-5%201-5l-1-10c0-10-1-11-5-7m-17%201c-3%200-3%201-2%203l2%203h-1c-1-1-1%200-1%204l1%208c0%203%201%205%203%204%203%200%202-5%200-10l-2-5%205%207c4%209%203%208%206%208l3-1-1-10c0-11%200-12-3-12s-3%206%200%2010l1%204-4-7-4-7-3%201m-8%201c-2%200-2%200-2%207%202%2015%202%2016%205%2015h2V76c-1-12-2-13-5-12m-16%202c-2%202-2%203-2%209%200%2010%202%2013%207%2013%202%200%202%200%201-5-2-3-3-11-2-13s0-6-1-6l-3%202m-9%201c-2%204-2%204-2%202s-1-2-3-2c-3%200-3%200-3%203l2%2012c0%206%201%208%202%208%204%200%204-1%203-10v-9h3c3%200%203-1%202-3%200-2-4-3-4-1m-23%202c-2%200-2%200%200%2011l1%2012%203-1c2%200%202%200%202-7-1-11-2-16-3-16l-3%201m5%201l2%203c1%200%202%204%200%204s-1%205%200%205l2%205c1%203%201%204%204%203%203%200%203%200%202-4l-1-5v-6c0-5-1-7-6-7-2%200-3%200-3%202m-22%207c2%2015%202%2016%205%2016s3%200%202-10c-1-12-2-13-5-13h-2v7m119%207a405203%20405203%200%2000-86%2011l-3%203-2-2c-2%200-2%200%200-2h-1a873%20873%200%2001-49%205H0v201h201v-91l-1-111V79h-4l-50%205m-30%2017c1%204%204%206%206%203h1c0%202%206%201%206-1h1c1%203%204%202%204%200l-1-2-1-2h1l1-1h-7c0-2-2-1-2%202l-1%204v-4c0-4-2-4-3%200%200%203%200%203-2%202-1-2-2-4%200-3l1-1-2-1c-2%200-2%201-2%204m39-2l2%203v2l-1-1h-1l2%202%202-2h1c0%202%202%203%202%201h2a378%20378%200%20012-2c0%203%200%203%203%203%202%200%203-1%203-2l1%201c1%201%201%201%201-3v-4h-5c-4%200-5%200-5%202h-1c-1-2-8-3-8%200m-132%201l-9%201v19l-1%2019v3c2%203%201%204-2%202-4-2-5-1-2%201v2c-3%200-1%203%203%203%203%201%203%203-1%202-4%200-3%200%205%204%204%201%205%203%201%202l-2%201-1%2047v46h21c21%200%2022%200%2022-2v-17h-4l-17-3c-2%200-2%200-2-20%200-14-1-17-1-12l-1-15v-22l4%201a64%2064%200%200013%201h3l-3%201h-4c-1-2-2%200-3%202a422%20422%200%2001-1%206c-2%200-2%201-2%206s0%205%201%203l1-4c-1-2%200-4%202-3%204%202%2011%201%2016-1%204-2%205-3%205-1l-2%202%201%201v1c-4-1-13%202-15%204-2%203-3%204-1%203l3%201%202%202c2%200%202%200%201%202-2%201-2%202%201%201%202%200%204%204%206%2010l3%207%201%202v1l2%203c1%203%201%203%201-2%200-4%200-5%202-6l2-2h-2c-2-1-2%200-2%201%200%203-1%201-3-4l-4-8c-2-3-1-4%201-2l2%201%201%202c1%201%201%201%202-1%201-4%202-4%204-1%201%202%201%202-1%202l-1%202v1h-1l2%205h1l6%203c3%200%203%200%202-1-1-2-1-2%203-5%202%200%203-1%203-3l-2%201c-2%203-7%204-6%202s-1-6-2-6l-1%201v1h-1v-3l1-1%202%201%203%201%203-1-1-1-1-2c1-3%200-3-1-3-2%200-2%200-1%201v2c0%202-1%202-2%201h-3c-2%200-2%200-1-2h-2l1-2h1l1%201c1-1%200-6-3-12l-2-8v-13H32h1l1-2-1-9c0-11%200-10-7-7l-6%201c-1%200%201-2%206-3%206-3%207-4%207-11%200-5%200-6%203-6%203-1%203-4-1-5-2%200-2-1-2-5v-5H23m24%209l-1%206c1%202%200%203-1%203l-3%201c-1%201%200%206%201%206v2h1c1-1%201-1%201%202%200%204-2%206-4%204h-1a1%201%200%20001%201l1%201-1%201c-1%201%200%204%201%204%204%200%206-2%205-5v-4l1-1%201-2%202-2h1c1-1%200-1-1-1l-4-2-1-2v-1h2c0%201%201%202%202%201l2%201c-1%201%200%201%201%201%202%200%202%202%200%205-3%203-4%206-4%209l-1%205c-1%201%200%201%205%201%205-1%207-1%208-3%202-3%204-3%203%200l-1%202%2010%201c6%200%208%200%206-1-4%200-4-1-3-2%202-1%202-1%200-2-1-1-2-1-4%201v1l2%201-6-1v-5c0-3-1-4-2-2h-1l-1-4%201-1c1%201%201-1-1-5-1-3-4-4-6-1-2%202-3%201-1-2%200-2%202-3%202-2l1-1v-1l1-2c0-2%200-2-1-1h-2l-1-1-2-1h-3l-2-1h-1v-3c-1-1-1%200-2%202m75%203v4h6l6-1h1c1%202%204%200%204-3v-4h-7l-6%201-1%203c0%204-2%204-2-1l-1-3v4m3%207h-7c-6%200-7%200-8%202l-2%201%201-2c1-1%200-1-3-1-4%200-4%200-4%204s0%204%204%204c3%200%204%200%203-1v-2l2-1v1c-2%201%200%203%202%203s2-2%201-4c-2-2-2-3%200-3%201%200%202%201%202%204l1%204v-4l1-4%201%204c0%202%200%203%201%202%200-2%200-2%202%200h2c1%202%204%200%204-2s0-2%201%200c0%203%201%203%202-1v-4h-6m-4%2015c0%203%200%204%202%204v-6c1-1%202%200%202%203%201%204%203%203%203%200l1-3v3c0%203%200%203%203%203%202%200%203%200%203-2l1%201c1%201%201%201%201-2v-3l2%203%201%202%201-5c0-2%200-2-7-2-6%200-7%200-7%202h-1l-2-2c-3%200-3%200-3%204m50%2025l-2%202h-3c-2-2-3-2-4%201v3l1-1%202-1c3%200%203%200%202%202l-1%207-1%204c-3%200-3%202-2%204%202%202%204%203%204%201l-2-1c-1-1-1-1%201-1l2%201c0%202%2011%204%2014%202%203-1%204-1%202%201l-2%203-1%201%201%201%202%202%201%201%202-1-1-1-1-1h1v-16l-1-1c1-2%200-2-1-2l-2-1%201-1c3%200%204%200%204-2-1-3-5-6-10-6l-4-1c-1-1-1-1-2%201m-42%2028c0%202-3%203-7%201-2-1-3-1-5%201l-2%202c1%201%202%200%202-1%202-3%208%201%207%204l1%203v2c2%202%203%205%201%205v1c2%200%203%206%201%206v3l-2%204-2%203-1%203-4-2c-5-2-7-6-7-10%200-2%200-2-5%200-6%202-6%202-6%200l-2%204v6l-2%201c-1%200-2%200-1-1%200-2-3-4-5-4l-2-1c-1-2-7%200-7%203l-1%202c0%202%201%204%205%204l10%201h2c0-1%202-4%204-4%201%200%201%201-1%202l-2%202%203%201%207%201h4c0%201%2013%203%2020%203l2%201c-1%202%208%203%2013%202%206%200%2022%202%2019%203l-1%201%2020%204c1%200%202-3%202-24v-24h-3c-4%200-5%202-5%2015a62%2062%200%2001-2%2018v1l-1%204-3%204%201%201c1%201%201%201-2%201-4%200-4-4-1-7%203-2%203-3%203-18a1663%201663%200%2000-1-18l-2-1-1-1-2%201-2%201-4-1v-2c0-3%201-3%206-4l6-1c0-1-1-2-3-1l-6%201c-3-1-4%200-4%201l-1%201h-1v1c3%200%202%202%200%202-1%200-1%201%201%203l2%202h-2c-3%200-6-5-4-6%202%200%202-1%200-2h-1c0%202-1%202-3%204l-4%203h1c3-2%207%200%207%203l1%202c3%200%207%207%208%2012%200%206-1%207-3%201l-2-3%201%204c0%205-1%205-3-1l-3-5-5%204-5%204c-1%200%202%202%205%202l3-1%202-2v14c2%202%201%203-3%203-4-1-6-3-7-9l-1-5-1-4c0-4%200-5-3-3-1%202-1%203%201%204v3c0%202-2%203-2%200s-2%200-3%204c-1%206-3%206-3%201%200-6-1-5-1%201%200%204%200%204-2%202s-2-10%200-16c1-3%201-3%202-2l3%202%202%201%202-3c2-6%204-8%207-8l2-1c0-2-1-2-5-2h-5v8l-1-2c0-1%200-2-2-1v-3l-1-1-2-2-4-2c-2-2-2-2-1-4l3-2c1%200%202-1%202-3s0-3-2-3c-1%200-2%201-1%203m41%2011l-2%201c-2%200-3%203-3%204l1%207%202%208c1%200%202%202%202%206l1%206%201-3%201-10c0-9-2-22-3-19M68%20237v6l-1%206-2%203h120l-40-6a6115%206115%200%2000-77-9'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
                  },
                  images: {
                    fallback: {
                      src: "/static/bd5a2bda743f82a5d12f992944e1edeb/10b75/assault-on-precinct-13-1976.jpg",
                      srcSet:
                        "/static/bd5a2bda743f82a5d12f992944e1edeb/0cf61/assault-on-precinct-13-1976.jpg 50w,\n/static/bd5a2bda743f82a5d12f992944e1edeb/4cfec/assault-on-precinct-13-1976.jpg 100w,\n/static/bd5a2bda743f82a5d12f992944e1edeb/10b75/assault-on-precinct-13-1976.jpg 200w,\n/static/bd5a2bda743f82a5d12f992944e1edeb/d5b68/assault-on-precinct-13-1976.jpg 400w",
                      sizes: "(min-width: 200px) 200px, 100vw",
                    },
                    sources: [
                      {
                        srcSet:
                          "/static/bd5a2bda743f82a5d12f992944e1edeb/998c5/assault-on-precinct-13-1976.avif 50w,\n/static/bd5a2bda743f82a5d12f992944e1edeb/520c2/assault-on-precinct-13-1976.avif 100w,\n/static/bd5a2bda743f82a5d12f992944e1edeb/af163/assault-on-precinct-13-1976.avif 200w,\n/static/bd5a2bda743f82a5d12f992944e1edeb/81c8e/assault-on-precinct-13-1976.avif 400w",
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
            imdbId: "tt0077651",
            title: "Halloween",
            year: 1978,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Halloween (1978)",
            releaseDate: "1978-10-25",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0080749",
            title: "The Fog",
            year: 1980,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Fog (1980)",
            releaseDate: "1980-01-01",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0082340",
            title: "Escape from New York",
            year: 1981,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Escape from New York (1981)",
            releaseDate: "1981-04-01",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0084787",
            title: "The Thing",
            year: 1982,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Thing (1982)",
            releaseDate: "1982-06-25",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Christine (1983)",
            releaseDate: "1983-12-09",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0088172",
            title: "Starman",
            year: 1984,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Starman (1984)",
            releaseDate: "1984-12-14",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0090728",
            title: "Big Trouble in Little China",
            year: 1986,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Big Trouble in Little China (1986)",
            releaseDate: "1986-07-02",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0093777",
            title: "Prince of Darkness",
            year: 1987,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Prince of Darkness (1987)",
            releaseDate: "1987-10-21",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0096256",
            title: "They Live",
            year: 1988,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "They Live (1988)",
            releaseDate: "1988-11-04",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0104850",
            title: "Memoirs of an Invisible Man",
            year: 1992,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Memoirs of an Invisible Man (1992)",
            releaseDate: "1992-02-28",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0113409",
            title: "In the Mouth of Madness",
            year: 1995,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "In the Mouth of Madness (1994)",
            releaseDate: "1994-12-10",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0114852",
            title: "Village of the Damned",
            year: 1995,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Village of the Damned (1995)",
            releaseDate: "1995-04-28",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0116225",
            title: "Escape from L.A.",
            year: 1996,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Escape from L.A. (1996)",
            releaseDate: "1996-08-09",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0120877",
            title: "Vampires",
            year: 1998,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Vampires (1998)",
            releaseDate: "1998-04-15",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt0228333",
            title: "Ghosts of Mars",
            year: 2001,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Ghosts of Mars (2001)",
            releaseDate: "2001-08-24",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
            imdbId: "tt1369706",
            title: "The Ward",
            year: 2010,
            lastReviewGrade: null,
            lastReviewGradeValue: null,
            reviewedMovieSlug: null,
            sortTitle: "Ward (2010)",
            releaseDate: "2010-09-13",
            poster: {
              childImageSharp: {
                gatsbyImageData: {
                  layout: "constrained" as Layout,
                  placeholder: {
                    fallback:
                      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='300'%20viewBox='0%200%20200%20300'%20preserveAspectRatio='none'%3e%3cpath%20d='M117%20121c-1%202-2%204-5%205-4%201-5%201-3-3%202-3%202-4-2-2-3%201-5%203-6%206-2%203-6%206-9%206l1-3%202-4c-4%200-8%204-10%208l-2%205%2019-7%2019-7v-3c-1-5-3-6-4-1m-30%2024l3%204H73v13l1%2015%2026%201h25v-36l-4-1h-4l3%204%204%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204%203%204h-4c-3%200-4-1-7-4-4-3-5-4-9-4h-4l4%204'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
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
    ],
    releaseYears: [
      "1974",
      "1976",
      "1978",
      "1980",
      "1981",
      "1982",
      "1983",
      "1984",
      "1986",
      "1987",
      "1988",
      "1992",
      "1995",
      "1996",
      "1998",
      "2001",
      "2010",
    ],
  },
};
