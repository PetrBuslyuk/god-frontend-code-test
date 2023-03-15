# Dev Notes

## For code reviewers

Greetings, for those who viewing my work!

In scope of this technical task has been made following:
+ Layout from provided design.
+ Carousel component.
  + Note: We can navigate inside via Tab's,
    We can swipe list on small window dimensions and navigate through buttons, such as arrows and dots.
    I've tried to make it responsive, based on current theme.
    It can be easy suitable for future configuring and extending.
+ Search functionality based on: car `bodyType` field only (as written in documentation).
+ Implemented responsiveness of layout and components.
+ Added accessibility features.
+ Styles has been taken from VCC-UI library (at least possible, which we can take).
+ Configured testing environment and partially covered main features with tests.
+ Covered code with comments and annotations to main components

P.S.: First thought was to take already existing solution with some existing Carousel library,
but as I understood further the goal of this task was implementing self-written solution.
Definitely, already existing solution can save time and money for customer, anyway it can be updated at any time in future.
P.P.S.: Anyway I enjoyed by writing it, I hope you can you enjoy too.

God bless you, stay safe and I wish you good luck.
Peter.

# Volvo Cars (Global Online Digital)

## Front-end coding test (React)

Our team's designer has come up with a new design to show our latest and greatest recharge cars on the website.

Here is how the design look like for desktop and mobile (files are stored under `docs` folder)

### Desktop

![ProductListDesktop](./docs/ProductList-Desktop.png)

### Mobile

![ProductListDesktop](./docs/ProductList-Mobile.png)

The data required to render the design is under `public/api/cars.json` folder. You need to fetch the data from the client side and render it in the browser. The data looks like this:

```json
[
  {
    "id": "xc90-recharge",
    "modelName": "XC90 Recharge",
    "bodyType": "suv",
    "modelType": "plug-in hybrid",
    "imageUrl": "/images/xc90_recharge.jpg"
  }
]
```

The product owner is telling you that you can generate the links to the learn and shop pages of each car by concatating the `id` of the car to the learn (`/learn/`) and shop (`/shop/`) urls.

Two extra SVG icons are also provided by our designer which are stored under `docs` folder.

## Requirements

- The project is bootstraped using [Next.js](https://nextjs.org/).
- Browser support is modern ever-green browsers.
- Implement this design using React and Typescript.
- Accessibility is important.
- Code Structure and reusablity is important.

## Bonus Points:

- If you use our design system component library, [VCC-UI](https://vcc-ui.vercel.app/)
- If you add a filter bar on the top to filter cars by `bodyType`
