This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Notes

0. Setup a next.js project (never really used next js, not convinced about all those script tags though)
1. Think of existing flows and sketch idea on paper
2. Fetch api data (hardcoded now, check what's best in terms of server component vs client component) Ideally we would like to maybe get a dedicated endpoint where we can get the stream of the geoposition or do the polling from the FE with ssr so we just get the gps info updated if the endpoint allows that. Something that will allow the fe to not re-render everytime the gps position changes basically, and doesn't stress the endpoint.
3. Thought a lot a bout what to show, thinking about what I love about the train apps I use (I get car sick to train is preferred to bus) and what are the pain points. I really want to see ALL the stops and ETA of stops, plus basic info of vehicle.
4. Getting some assets from Amber site (styles/colors, icons etc ..)
5. Working on building a list of stops in an easy way, html wise.
6. having problems with scss and turbopack (hot reload doesn't quite work)
7. I decided to avoid css in js as I'd like to work with class based css, so classic approach, simply adding a class based on props. Just because this way we could always extract the css and serve it from a cdn if we wanted to have a static site using this css.
   8.Thinking about testing and error handling.
8. Testing recommended using e2e for async components (just because is next.js)
