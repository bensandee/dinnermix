# Changelog

## [0.2.1](https://github.com/bensandee/dinnermix/compare/dinnermix-v0.2.0-alpha.3...dinnermix-v0.2.1) (2024-10-22)


### Features

* add ability to delete recipe ([f083265](https://github.com/bensandee/dinnermix/commit/f083265d7331af897acc445b04077759ce0128fc))
* finish recipe import ([2c0b27f](https://github.com/bensandee/dinnermix/commit/2c0b27fb0a3d4300c1eb0c53746e6198b7964e11))


### Bug Fixes

* lint warning ([669afe2](https://github.com/bensandee/dinnermix/commit/669afe2618f97c9ff1928c40e8c1df2d126c562c))
* remove pm2 dependency ([95bff68](https://github.com/bensandee/dinnermix/commit/95bff68ebbcfa93db9b302c56a92e153e8dae59b))
* update release-please config ([13accd6](https://github.com/bensandee/dinnermix/commit/13accd6c16467efab91f1605bd2eab5cfd8e3438))
* use Link instead of anchor tag ([adf1438](https://github.com/bensandee/dinnermix/commit/adf1438348c84c502f6b6c85d1782db392a58938))


### Miscellaneous Chores

* release 0.2.1 ([f22ccdb](https://github.com/bensandee/dinnermix/commit/f22ccdb5de6fb5c7a528e8d64258d3665cca799b))

## [0.2.0-alpha.3](https://github.com/bensandee/dinnermix/compare/dinnermix-v0.2.0-alpha.2...dinnermix-v0.2.0-alpha.3) (2024-05-21)


### Bug Fixes

* add missing migration schema for drizzle ([93964d0](https://github.com/bensandee/dinnermix/commit/93964d063712930ba0da3d7df84cc6ca7eeb259a))
* remove duplicate configuration repositories ([65febec](https://github.com/bensandee/dinnermix/commit/65febec68ec68d8840ef52e3e2468cb4ae08f8d6))
* update release-please versioning scheme ([86c38a1](https://github.com/bensandee/dinnermix/commit/86c38a1504240358af7ef31439708af2b76d4f0a))

## [0.2.0-alpha.2](https://github.com/bensandee/dinnermix/compare/dinnermix-v0.2.0-alpha.1...dinnermix-v0.2.0-alpha.2) (2024-05-21)


### Bug Fixes

* add pm2 script commands + dep ([4d455b9](https://github.com/bensandee/dinnermix/commit/4d455b915933ffcdfa2f8143da55e1605b7f723a))

## [0.2.0-alpha.1](https://github.com/bensandee/dinnermix/compare/dinnermix-v0.2.0-alpha...dinnermix-v0.2.0-alpha.1) (2024-05-21)


### Features

* add cancel button to add recipe ([17cb3a5](https://github.com/bensandee/dinnermix/commit/17cb3a587717d01e8a42535237bfcde3c9552f21))
* initial insert from csv support ([08f8c4f](https://github.com/bensandee/dinnermix/commit/08f8c4fb55d96bd892ce454dcd2e9ea4c6e78943))
* prepare for deployment ([7508f3d](https://github.com/bensandee/dinnermix/commit/7508f3d6634b25521fe91cd1fee4c75a0c0a99a2))


### Bug Fixes

* create user account when encountering a new email ([75e6aeb](https://github.com/bensandee/dinnermix/commit/75e6aeb38627782f9d4e440a037291e93e09ffd0))
* enable jest path mapping ([42e5153](https://github.com/bensandee/dinnermix/commit/42e5153f1d7a10248e46adf2a10d9f06f67bb8d5))
* prepCount field doesn't exist ([9fcc970](https://github.com/bensandee/dinnermix/commit/9fcc97090d18979ad482e163e112a78041091326))
* properly create user record when not found ([1dc37a0](https://github.com/bensandee/dinnermix/commit/1dc37a0a28f57b2e12b46dac9839cf00d5ef7534))
* sql insert schemas should be strict to catch changing types ([5a0db54](https://github.com/bensandee/dinnermix/commit/5a0db549e46bcb8dbc61737b9643938ea35bfa11))
* unify db connection env usages ([a08be54](https://github.com/bensandee/dinnermix/commit/a08be549dab0a256392acaab68457486a212be7b))
* update drizzle-kit to 0.21.1 ([0f59c60](https://github.com/bensandee/dinnermix/commit/0f59c60aecc63dcfb7769cc3ba43250ec516f9a2))
* use daisyui styles for buttons, etc ([800f788](https://github.com/bensandee/dinnermix/commit/800f788827077ef2e80ffb9481574a0e313f5bb5))

## [0.2.0-alpha](https://github.com/bensandee/dinnermix/compare/dinnermix-v0.1.0...dinnermix-v0.2.0-alpha) (2024-03-18)


### Features

* add daisyui and simplify the stylings ([3499e9a](https://github.com/bensandee/dinnermix/commit/3499e9a7ebde273370127f233ad85b0434bd671e))
* add mongoose connection helpers and stubs for recipe schema ([c014a4a](https://github.com/bensandee/dinnermix/commit/c014a4acc5c9e3d65f0fbe23a32ace73e9b56108))
* add recipe rest apis and mongoose model cleanups ([718f87b](https://github.com/bensandee/dinnermix/commit/718f87befd7e4f43cfc54b65303c9bddaf1d4784))
* initial migration to use app router ([e602a52](https://github.com/bensandee/dinnermix/commit/e602a523b00d25d36dda61a74601bad73117d58c))
* move db access to separate components ([aa0102c](https://github.com/bensandee/dinnermix/commit/aa0102c16da33dee905b8f0d65ddd81cf9115c81))
* use zod as react-hook-form resolver ([89a0c3c](https://github.com/bensandee/dinnermix/commit/89a0c3c53762ee6d26eacb99c374668ab21dbb9d))


### Bug Fixes

* bump drizzle versions ([a129e7f](https://github.com/bensandee/dinnermix/commit/a129e7f3c2da9d4e77df8f2a2290c7e61153215f))
* checkpoint attachment work ([f8fb850](https://github.com/bensandee/dinnermix/commit/f8fb8509410262782ac855168323b4b317fccb8c))
* clean up session handling apis ([3f3e4e2](https://github.com/bensandee/dinnermix/commit/3f3e4e275c46e1037a1f8ff55d83d634999778e1))
* clean up some handling of session checking ([0fc3751](https://github.com/bensandee/dinnermix/commit/0fc37517c840acba4457bd8eaec3ae6d9f8a3690))
* compile errors after migration to app routing ([2e088af](https://github.com/bensandee/dinnermix/commit/2e088af86e5e0174ff7a6ae4034ee174c8fdae68))
* complete reversion to pages. proof of concept for SSR + profile lookups ([5462c7d](https://github.com/bensandee/dinnermix/commit/5462c7dd8ab58f5be7148ab00f8db58ffe893936))
* github build action failure ([6a5d5c3](https://github.com/bensandee/dinnermix/commit/6a5d5c3b8a9387b4caff452801365c2fce515166))
* initial api layouts and dep upgrades ([536f160](https://github.com/bensandee/dinnermix/commit/536f160744e2e57781392e5069a7cd188434ed90))
* migrate db to mysql + drizzle ([09145ca](https://github.com/bensandee/dinnermix/commit/09145ca438b75105ac65fe40eb72eeb851ec7b82))
* migrate profile to app router ([f862bae](https://github.com/bensandee/dinnermix/commit/f862bae54d63dbca3312608576ec1b5475cdff95))
* migrate recipe page (slug) to app router ([ca9890f](https://github.com/bensandee/dinnermix/commit/ca9890fbded7d9246fe3f80225404de6f67ad1f5))
* migrate to postgresql ([77a1b85](https://github.com/bensandee/dinnermix/commit/77a1b8522b33cec4a4d4f2bc112a0268a2dcb961))
* planetscale for drizzle ([7fd3910](https://github.com/bensandee/dinnermix/commit/7fd391032e282eec360f80f5db176299ca760835))
* remove green color for profile ([f70ebab](https://github.com/bensandee/dinnermix/commit/f70ebabb92f0738ab9f6df3dfac0ecd8b2287573))
* slugify can slugify anything ([5dfd42d](https://github.com/bensandee/dinnermix/commit/5dfd42d0a0247681437b18377da6a556e671ecb2))
* wire up add form and start using reusable components ([0453bb0](https://github.com/bensandee/dinnermix/commit/0453bb001cd2920a12bd52ac75c5646ff2c609e4))
