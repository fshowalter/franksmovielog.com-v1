import { Layout } from "gatsby-plugin-image";

export default {
  entity: {
    nodes: [
      {
        name: "Child's Play",
        slug: "childs-play",
        titleCount: 8,
        reviewCount: 7,
        avatar: null,
      },
      {
        name: "Friday the 13th",
        slug: "friday-the-13th",
        titleCount: 12,
        reviewCount: 7,
        avatar: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as Layout,
              placeholder: {
                fallback:
                  "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='174'%20height='174'%20viewBox='0%200%20174%20174'%20preserveAspectRatio='none'%3e%3cpath%20d='M0%2087v87h175V0H0v87m103-37l-1%205-1%203-1%201h-1v1l-1%201-1%203-1%203-5-5c-14-13-26-14-38-3-5%204-5%205-1%205h5l1-1c0-3%202-2%202%200%201%201%202%202%203%201v4l1-2h1c2%201%201%204-3%205l-3%203c-1%202%200%204%202%203l1%201c-1%203%202%202%205%200%203-3%205-4%203-1-5%205-2%2017%205%2022l4%205c0%202%204%206%208%207%204%200%206%203%203%203v4c1%203%202%203%204%203h6c8%200%2016-4%2017-10%201-7-4-22-13-34-4-6-5-7-3-9v-4c-3%201-2%200%200-3l2-5v-2l1%202%202%202%202%202c2%203%206%202%205-2l-4-2c-3%200-4-1-4-5-1-4-3-6-2-1M76%2078c-9%205-9%2012%201%2010%204%200%204%200%207%203l3%204%202-2c3-4%204-9%201-10-1-1-3-2-3-4-1-2-8-3-11-1'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
              },
              images: {
                fallback: {
                  src: "/static/59f06504e2fb76b618d37e0ff8e954a1/141a0/friday-the-13th.jpg",
                  srcSet:
                    "/static/59f06504e2fb76b618d37e0ff8e954a1/02079/friday-the-13th.jpg 130w,\n/static/59f06504e2fb76b618d37e0ff8e954a1/b488b/friday-the-13th.jpg 162w,\n/static/59f06504e2fb76b618d37e0ff8e954a1/141a0/friday-the-13th.jpg 174w,\n/static/59f06504e2fb76b618d37e0ff8e954a1/c8b07/friday-the-13th.jpg 260w,\n/static/59f06504e2fb76b618d37e0ff8e954a1/f85c2/friday-the-13th.jpg 324w,\n/static/59f06504e2fb76b618d37e0ff8e954a1/5aeb4/friday-the-13th.jpg 348w",
                  sizes:
                    "(max-width: 487) 174px,  (max-width: 1279px) 162px, (max-width: 1291px) 174px, 130px",
                },
                sources: [
                  {
                    srcSet:
                      "/static/59f06504e2fb76b618d37e0ff8e954a1/7bfee/friday-the-13th.avif 130w,\n/static/59f06504e2fb76b618d37e0ff8e954a1/6c904/friday-the-13th.avif 162w,\n/static/59f06504e2fb76b618d37e0ff8e954a1/eba7c/friday-the-13th.avif 174w,\n/static/59f06504e2fb76b618d37e0ff8e954a1/fcfdf/friday-the-13th.avif 260w,\n/static/59f06504e2fb76b618d37e0ff8e954a1/ef9e4/friday-the-13th.avif 324w,\n/static/59f06504e2fb76b618d37e0ff8e954a1/51863/friday-the-13th.avif 348w",
                    type: "image/avif",
                    sizes:
                      "(max-width: 487) 174px,  (max-width: 1279px) 162px, (max-width: 1291px) 174px, 130px",
                  },
                ],
              },
              width: 174,
              height: 174,
            },
          },
        },
      },
      {
        name: "Hammer Films",
        slug: "hammer-films",
        titleCount: 94,
        reviewCount: 7,
        avatar: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as Layout,
              placeholder: {
                fallback:
                  "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='174'%20height='174'%20viewBox='0%200%20174%20174'%20preserveAspectRatio='none'%3e%3cpath%20d='M0%2087v87h175V0H0v87m19-2v13h2l4-1%201-5c0-5%201-6%204-6s3%200%203%205c0%204%200%204%202%204l4-1%201-11V71h-3c-4%200-4%200-4%205%200%204%200%204-3%204-4%200-4%200-4-4%200-5%200-5-3-5h-4v14m26-3c-5%2012-5%2012-1%2011%203%200%204-1%205-3s8-3%208%200l4%201c4%200%204-1-1-11-4-9-4-9-7-9-4%200-4%200-8%2011m20-1v9h4c3%200%203%200%203-4v-4l3%204%202%204%203-4%203-4v4c0%203%201%204%204%204h3V72l-4-1c-2%200-3%200-5%205l-4%205-2-5c-3-5-3-5-7-5h-3v10m26%200v9h3c3%200%203%200%203-5v-4l3%204c3%205%204%205%206%200%202-4%203-4%203%201-1%203%200%204%201%204%205%202%205%201%205-9V71h-3c-3%200-4%201-5%203l-3%205-2%202-2-5c-3-4-4-5-6-5h-3v10m25%200l1%2010%209%201%208%202v-3c0-3%200-3-6-3-7-1-9-4-2-4%204%200%204%200%204-2%200-3-1-3-4-3-6-1-5-3%202-3%206%200%206%200%206-2%200-3%200-3-9-3h-9v10m19%202l1%2011%204%201c2%200%202%200%202-4%200-5%201-5%204%201%202%203%203%205%205%205%204%201%205%201%202-5-2-4-2-5%200-7%203-3%203-8%200-12-3-2-4-2-10-2h-8v12'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
              },
              images: {
                fallback: {
                  src: "/static/e919b03855219e9e019a1dac518d405d/141a0/hammer-films.jpg",
                  srcSet:
                    "/static/e919b03855219e9e019a1dac518d405d/02079/hammer-films.jpg 130w,\n/static/e919b03855219e9e019a1dac518d405d/b488b/hammer-films.jpg 162w,\n/static/e919b03855219e9e019a1dac518d405d/141a0/hammer-films.jpg 174w,\n/static/e919b03855219e9e019a1dac518d405d/c8b07/hammer-films.jpg 260w,\n/static/e919b03855219e9e019a1dac518d405d/f85c2/hammer-films.jpg 324w,\n/static/e919b03855219e9e019a1dac518d405d/5aeb4/hammer-films.jpg 348w",
                  sizes:
                    "(max-width: 487) 174px,  (max-width: 1279px) 162px, (max-width: 1291px) 174px, 130px",
                },
                sources: [
                  {
                    srcSet:
                      "/static/e919b03855219e9e019a1dac518d405d/7bfee/hammer-films.avif 130w,\n/static/e919b03855219e9e019a1dac518d405d/6c904/hammer-films.avif 162w,\n/static/e919b03855219e9e019a1dac518d405d/eba7c/hammer-films.avif 174w,\n/static/e919b03855219e9e019a1dac518d405d/fcfdf/hammer-films.avif 260w,\n/static/e919b03855219e9e019a1dac518d405d/ef9e4/hammer-films.avif 324w,\n/static/e919b03855219e9e019a1dac518d405d/51863/hammer-films.avif 348w",
                    type: "image/avif",
                    sizes:
                      "(max-width: 487) 174px,  (max-width: 1279px) 162px, (max-width: 1291px) 174px, 130px",
                  },
                ],
              },
              width: 174,
              height: 174,
            },
          },
        },
      },
      {
        name: "Hatchet",
        slug: "hatchet",
        titleCount: 4,
        reviewCount: 4,
        avatar: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as Layout,
              placeholder: {
                fallback:
                  "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='174'%20height='174'%20viewBox='0%200%20174%20174'%20preserveAspectRatio='none'%3e%3cpath%20d='M0%2087v87h175V0H0v87m85-37c-2%201-2%201-1%202%202%201%201%202-2%203-2%201-2%2012-1%2015l1%205c-1%203-1%205%201%205v-1l-1-1h2l1-1%201-1c1%200%202-1%202-4v-5c1-1%201-2-1-3s-2-3%200-3h2l1%201%201-2c0-2%200-2-1-1s-1%201-2-2v-4l-2-1c-1-1%201-1%203-1%206%201%208%203%208%207v2c2%200%200%204-1%206l-1%204c1%201%201%201%201-1s0-2%201-1c1%202%201%202%203%200s2-2%203%205c1%209%203%2010%203%202v-5c1-1-5-14-8-16-4-5-8-6-13-4m-7%203l-4%2010-5%2010v2l1%203v3l-1-3-2-3-1%205c-2%208%200%2012%204%207%202-4%203-4%202%203%200%204-1%206-2%207l-2%202-6%2011-6%2012%201-1%205-9c3-3%204-4%204-2l2%202%201%202c0%202%200%202-1%201s-2-2-3%200c-2%202-1%203%201%203h2v3l1%202c0%203%202-3%202-9%200-5%202-24%204-28l1-2c2%200%202-1%200-4-2-8%201-23%206-27%201-1%201-1-1-1l-3%201m46%2026v8h-2c-3%200-4-1-5-5l-1-3v3l5%2013%208%2015c1%205%204%206%203%202l1-2h1c-1-1%201-4%203-4v-2l-1-3-1-2-2-1c1-2-4-10-6-10-2-1-3-10-2-17l-1-1v9m-15%2018l-1%201c-2%200-2%200-1%209%201%206%201%207-1%2010-1%204-1%204%201%206%203%202%204%203%203%201%200-2%200-2%205-2l3-2%204-1c3-1%203-1%203%203l-2%205-2%202%203-1%203-1c2%201%200-14-3-19l-2-5-2%203-1%203v-4c0-3%200-3-1-1s-1%202-4-3-5-6-5-4m-33%2038c0%203%200%203-3%203l-6%201h-3l3%201%203%201-4%201-3%201h3l6-2%205-1c1%201%200%202-2%202-5%202-5%204-1%203%202-1%202-1%201%202v2l2%201%201%202c1%200%202%200%201-2l-1-2v-2l-1-2c-1-1-1-1%202-1l5-1h7c5-1%206-4%200-4-3%200-4%200-3%201l-1%202c-1%200-2-1-1-2%200-2%200-2-3-2s-4-1-5-3l-2-2v3'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
              },
              images: {
                fallback: {
                  src: "/static/30dfc7b15c4f5dc5f33f99155ffc6852/141a0/hatchet.jpg",
                  srcSet:
                    "/static/30dfc7b15c4f5dc5f33f99155ffc6852/02079/hatchet.jpg 130w,\n/static/30dfc7b15c4f5dc5f33f99155ffc6852/b488b/hatchet.jpg 162w,\n/static/30dfc7b15c4f5dc5f33f99155ffc6852/141a0/hatchet.jpg 174w,\n/static/30dfc7b15c4f5dc5f33f99155ffc6852/c8b07/hatchet.jpg 260w,\n/static/30dfc7b15c4f5dc5f33f99155ffc6852/f85c2/hatchet.jpg 324w,\n/static/30dfc7b15c4f5dc5f33f99155ffc6852/5aeb4/hatchet.jpg 348w",
                  sizes:
                    "(max-width: 487) 174px,  (max-width: 1279px) 162px, (max-width: 1291px) 174px, 130px",
                },
                sources: [
                  {
                    srcSet:
                      "/static/30dfc7b15c4f5dc5f33f99155ffc6852/7bfee/hatchet.avif 130w,\n/static/30dfc7b15c4f5dc5f33f99155ffc6852/6c904/hatchet.avif 162w,\n/static/30dfc7b15c4f5dc5f33f99155ffc6852/eba7c/hatchet.avif 174w,\n/static/30dfc7b15c4f5dc5f33f99155ffc6852/fcfdf/hatchet.avif 260w,\n/static/30dfc7b15c4f5dc5f33f99155ffc6852/ef9e4/hatchet.avif 324w,\n/static/30dfc7b15c4f5dc5f33f99155ffc6852/51863/hatchet.avif 348w",
                    type: "image/avif",
                    sizes:
                      "(max-width: 487) 174px,  (max-width: 1279px) 162px, (max-width: 1291px) 174px, 130px",
                  },
                ],
              },
              width: 174,
              height: 174,
            },
          },
        },
      },
      {
        name: "James Bond",
        slug: "james-bond",
        titleCount: 26,
        reviewCount: 3,
        avatar: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as Layout,
              placeholder: {
                fallback:
                  "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='174'%20height='174'%20viewBox='0%200%20174%20174'%20preserveAspectRatio='none'%3e%3cpath%20d='M0%2087v87h175V0H0v87m30-20c-7%205-13%2017-13%2027%200%2022%2023%2019%2030-3%206-18-3-32-17-24m35%200c-11%206-18%2026-13%2036%209%2016%2031-1%2031-23%200-13-8-18-18-13m22%202c-3%207-3%208%200%208%203%201%204%200%205-3s1-3%208-3l7%201c0%201-4%207-13%2017-6%208-10%2015-10%2018l5%201h6l2-6%2010-14c7-9%2011-16%2011-20v-3H89l-2%204m34-1l-2%204c0%202%201%202%2011%202l12-1%206-1c5%200%206%200%208-3l1-3-18-1h-18v3m-86%204c-4%205-11%2023-11%2029%200%203%203%204%205%201%206-5%2013-25%2012-30-1-4-2-4-6%200m35-1c-4%205-12%2024-12%2030%200%203%203%204%205%202%205-5%2013-26%2012-31-1-4-2-4-5-1m47%208l2%205c1%201%201%201%201-1%200-3%200-3%204-3s4%200%201%205c-2%202-3%203-9%203-10%201-11%203-2%203s11-1%2015-7c1-3%204-5%206-6%205-2%204-2-7-2h-11v3'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
              },
              images: {
                fallback: {
                  src: "/static/184378d1716cf9f742fd60f6e988a463/141a0/james-bond.jpg",
                  srcSet:
                    "/static/184378d1716cf9f742fd60f6e988a463/02079/james-bond.jpg 130w,\n/static/184378d1716cf9f742fd60f6e988a463/b488b/james-bond.jpg 162w,\n/static/184378d1716cf9f742fd60f6e988a463/141a0/james-bond.jpg 174w,\n/static/184378d1716cf9f742fd60f6e988a463/c8b07/james-bond.jpg 260w,\n/static/184378d1716cf9f742fd60f6e988a463/f85c2/james-bond.jpg 324w,\n/static/184378d1716cf9f742fd60f6e988a463/5aeb4/james-bond.jpg 348w",
                  sizes:
                    "(max-width: 487) 174px,  (max-width: 1279px) 162px, (max-width: 1291px) 174px, 130px",
                },
                sources: [
                  {
                    srcSet:
                      "/static/184378d1716cf9f742fd60f6e988a463/7bfee/james-bond.avif 130w,\n/static/184378d1716cf9f742fd60f6e988a463/6c904/james-bond.avif 162w,\n/static/184378d1716cf9f742fd60f6e988a463/eba7c/james-bond.avif 174w,\n/static/184378d1716cf9f742fd60f6e988a463/fcfdf/james-bond.avif 260w,\n/static/184378d1716cf9f742fd60f6e988a463/ef9e4/james-bond.avif 324w,\n/static/184378d1716cf9f742fd60f6e988a463/51863/james-bond.avif 348w",
                    type: "image/avif",
                    sizes:
                      "(max-width: 487) 174px,  (max-width: 1279px) 162px, (max-width: 1291px) 174px, 130px",
                  },
                ],
              },
              width: 174,
              height: 174,
            },
          },
        },
      },
      {
        name: "Phantasm",
        slug: "phantasm",
        titleCount: 5,
        reviewCount: 1,
        avatar: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as Layout,
              placeholder: {
                fallback:
                  "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='174'%20height='174'%20viewBox='0%200%20174%20174'%20preserveAspectRatio='none'%3e%3cpath%20d='M0%2087v87h175V0H0v87M57%207l-3%202c-2%200-3%201-3%203l-3%206c-8%2012-9%2036-2%2038l1%201c-1%202%203%205%207%206%203%200%203%200%203%204l-2%208c-2%205-5%2015-4%2016l-2%208c-1%209%200%2023%203%2030l2%204v-4a513%20513%200%20006-41c2-5%202-7%201-8-2-4%204-8%207-4%201%201%201%202-1%204-1%203-2%206-3%2023%200%2011%201%2013%204%203a413%20413%200%200110-25c1%201%202%203%204%203%202%201%203%203%202%204l1%201%201%202v4l1-1c1-1%202-2%203-1l1-4%201-9v-1c-3%201-3-1-1-3%201-2%201-2-2-2-3%201-8-1-8-2l2-6c3-4%203-5%202-7-2-3-1-14%200-13l2-1%202%201c1%201%201%201%201-1%200-1%200-2%201-1V34l-3-7v-2l-1-2c-2%200-3%200-2-2h-1c-1%201-1%201-3-1-6-9-14-14-21-14l-3%201m72%2062c-2%203-2%203-4%202s-3%200-1%202v1l-1%203-1%204v-1c3-4-1-5-6-3-3%201-3%201-2%2013l2%2016v6c0%202%200%202%208%202l4-1%203-3%203-2%201-5c5-10%203-24-4-29-2-2-2-2-1-4%202-3%201-4-1-1m-24%206c1%204%200%206-3%207l-4%202-2%204c-5%205-3%2019%203%2024%203%202%207%202%208%201l1-1%201-3c-2-7-2-20-1-21s2-3%201-8v-6l-1%205-1%206v-6l-1-5-1%201m59%2024l-6%203-4%201-9%201c-5%201-6%201-7%204l-2%204%204%201c3%201%204%201%205-1h4l4-2c4%200%208-1%2010-3%201-3%207-4%207-2h2c3-3%203-6-1-7l-2-1-5%202m-33%2016l-4%203-2%202h-3c0-3-2-3-4-2v3c1%202%200%203-3%203s-3%200-3%204v4l-4-1c-5%200-10%203-8%205%200%202%203%203%204%201h13c3-1%206%200%206%203%200%202%201%203%202%203%203%200%208-2%208-4-1-2%201-2%204%201l2%203-1-3c0-3%200-3%203-3%202%200%204-1%204-3l3-1%201-1c-1-2%203-6%205-5%203%200%207-2%206-4s-2-2-5-2c-4%201-4%201-4-2v-4l1-1c-1%200-5%202-6%204-2%202-12-3-11-5%200-2%200-1-4%202'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
              },
              images: {
                fallback: {
                  src: "/static/f4a6a241894b3da58f84547403d38592/141a0/phantasm.jpg",
                  srcSet:
                    "/static/f4a6a241894b3da58f84547403d38592/02079/phantasm.jpg 130w,\n/static/f4a6a241894b3da58f84547403d38592/b488b/phantasm.jpg 162w,\n/static/f4a6a241894b3da58f84547403d38592/141a0/phantasm.jpg 174w,\n/static/f4a6a241894b3da58f84547403d38592/c8b07/phantasm.jpg 260w,\n/static/f4a6a241894b3da58f84547403d38592/f85c2/phantasm.jpg 324w,\n/static/f4a6a241894b3da58f84547403d38592/5aeb4/phantasm.jpg 348w",
                  sizes:
                    "(max-width: 487) 174px,  (max-width: 1279px) 162px, (max-width: 1291px) 174px, 130px",
                },
                sources: [
                  {
                    srcSet:
                      "/static/f4a6a241894b3da58f84547403d38592/7bfee/phantasm.avif 130w,\n/static/f4a6a241894b3da58f84547403d38592/6c904/phantasm.avif 162w,\n/static/f4a6a241894b3da58f84547403d38592/eba7c/phantasm.avif 174w,\n/static/f4a6a241894b3da58f84547403d38592/fcfdf/phantasm.avif 260w,\n/static/f4a6a241894b3da58f84547403d38592/ef9e4/phantasm.avif 324w,\n/static/f4a6a241894b3da58f84547403d38592/51863/phantasm.avif 348w",
                    type: "image/avif",
                    sizes:
                      "(max-width: 487) 174px,  (max-width: 1279px) 162px, (max-width: 1291px) 174px, 130px",
                  },
                ],
              },
              width: 174,
              height: 174,
            },
          },
        },
      },
      {
        name: "Universal Monsters",
        slug: "universal-monsters",
        titleCount: 29,
        reviewCount: 3,
        avatar: {
          childImageSharp: {
            gatsbyImageData: {
              layout: "constrained" as Layout,
              placeholder: {
                fallback:
                  "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='174'%20height='174'%20viewBox='0%200%20174%20174'%20preserveAspectRatio='none'%3e%3cpath%20d='M0%2049l1%2019v24c2%201%209%201%209-1h7v-7c0-9%203-20%207-29l3-7-3-1c-5%200-7-1-9-5l-3-3-1-1-2-2-1-1-2-2-2-2-2-1H0v19m136-15c2%203%202%207%200%207l-1-1-3-3-1%202-1%202-1-5c0-2%200-2-2-1l-6%201-5%202-2%201-3%201-5%202-4%201-3%202-4%202-2%201-1-1%201-2%201-1c0-3-6%200-6%203%200%202%200%202-1%201%200-2-1-2-1-1v3c2%203%200%204-1%201-2-2-2-1-1%202l2%202h10l-2%202c-2%200-2%200-2%202v2l-1%203c0%203-1%204-3%202h-2c-2%202-3%200-2-3%201-4%201-5-3-3H64l5%201c3%200%202%202%200%203l-2%201-2%201h-2c-1%202-8%204-9%203v-2l8-2h-2l-2-1c2-2-3-1-4%201h-3c-2-2-3-1-1%201%201%202%201%202-1%202h-4l-2%201-3%201c-1%201-3%202-3%200l-1-2-2-3c1-1-2-3-5-3h-3l2%201%204%202%203%204c1%201%200%202-1%205-2%205-2%206%201%206%204%200%204%200%204%206-1%2011-7%2010-7-1%200-3%200-5-1-4l-2%201c-2-1-7%202-8%205-3%2010-1%2022%207%2033l3%207-3-1h-1l-2%201h-3l-17%204c-4%200-5%201-5%203l1%204v1l-1%2018v17h51l50-1c-1-1%2014-4%2015-4h1l4-1c4%200%204%200%204-2-1-2%200-2%202%200h3l4%202c3%201%203%201%201%203l-4%201-2%201%2023%201h23v-21c0-21-1-28-3-23-1%202-2%203-4%203s-3-4-2-6c2-2%200-4-3-4-2%200-3%200-2%201%201%203-4%204-8%202l-3-3c2-1%201-4-1-4v-2l4-2c2%200%202%200%202-5v-6l1-1%201-3%201-5c2-1%202-2%201-4l-1-3v-3l-2-1c0-2-4-7-6-6l-1-1%201-1%201-1-1-1-1-3c0-3%200-5-2-6-3-2-6-8-4-10%202-1%202-2%201-2l-2%201h-2c-1-2-1-4%202-4l1-1c0-2-5-6-5-5l-1-1c1-3%205-2%206%201l2%203%203%204c3%204%203%204%202-2-1-4-3-6-7-10l-7-5m-36%2079c-1%206%200%209%204%208%203-1%204-4%204-11%200-3%200-3-4-3h-4v6M0%20117c0%205%200%205%203%205l4%201h4l3-3%201-1%201-1c0-1%201-2%204-2h3l-8-1-12-2H0v4m91%2011h-5c-4%200-11%205-11%209l-1%201v1l2%203v1l1%201c-1%201%201%203%203%202l2%201h12c5-1%208-2%209-4l3-2v-8c-1-2-14-7-15-5m-54%207c-2%202%2014%2015%2018%2015l4%203c3%201%205%203%206%202l6%202%206%202c4-1%207%200%206%201%200%202%203%206%204%205l-1-2c-2-3%200-5%203-5a75%2075%200%200042-15c0-2-4%200-10%202-13%207-35%209-41%204-2-1-4-2-5-1l-2-1c1-1%200-2-1-2h-3l-13-3-3-1-1-1-4-1c-7-4-11-5-11-4m93%2011c-3%201-4%204-1%205v3l-1%202c6%201%2019%202%2022%200%203-1%204-4%202-4-4%200-8-2-10-4s-8-3-12-2'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
              },
              images: {
                fallback: {
                  src: "/static/25972c16ba9db58a7b3a4acb20adf39a/141a0/universal-monsters.jpg",
                  srcSet:
                    "/static/25972c16ba9db58a7b3a4acb20adf39a/02079/universal-monsters.jpg 130w,\n/static/25972c16ba9db58a7b3a4acb20adf39a/b488b/universal-monsters.jpg 162w,\n/static/25972c16ba9db58a7b3a4acb20adf39a/141a0/universal-monsters.jpg 174w,\n/static/25972c16ba9db58a7b3a4acb20adf39a/c8b07/universal-monsters.jpg 260w,\n/static/25972c16ba9db58a7b3a4acb20adf39a/f85c2/universal-monsters.jpg 324w,\n/static/25972c16ba9db58a7b3a4acb20adf39a/5aeb4/universal-monsters.jpg 348w",
                  sizes:
                    "(max-width: 487) 174px,  (max-width: 1279px) 162px, (max-width: 1291px) 174px, 130px",
                },
                sources: [
                  {
                    srcSet:
                      "/static/25972c16ba9db58a7b3a4acb20adf39a/7bfee/universal-monsters.avif 130w,\n/static/25972c16ba9db58a7b3a4acb20adf39a/6c904/universal-monsters.avif 162w,\n/static/25972c16ba9db58a7b3a4acb20adf39a/eba7c/universal-monsters.avif 174w,\n/static/25972c16ba9db58a7b3a4acb20adf39a/fcfdf/universal-monsters.avif 260w,\n/static/25972c16ba9db58a7b3a4acb20adf39a/ef9e4/universal-monsters.avif 324w,\n/static/25972c16ba9db58a7b3a4acb20adf39a/51863/universal-monsters.avif 348w",
                    type: "image/avif",
                    sizes:
                      "(max-width: 487) 174px,  (max-width: 1279px) 162px, (max-width: 1291px) 174px, 130px",
                  },
                ],
              },
              width: 174,
              height: 174,
            },
          },
        },
      },
    ],
  },
};
