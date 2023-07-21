# Changelog

## 1.0.0

### Major Changes

- e576cf2: Many years later and many years in a production app, finally releasing a major version. The focus of this PR was to decouple the package from TSDX which has all but been abandoned and migrate to swc. Also moving to pnpm for dep management, and also migrating from standard-version to changesets for release automation. All core and dev dependencies have been updated in an effort to resolve security vulnerabilites with transitive deps.

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.6.2](https://github.com/platypusrex/react-hook-form/compare/v0.6.1...v0.6.2) (2022-11-24)

### [0.6.1](https://github.com/platypusrex/react-hook-form/compare/v0.6.0...v0.6.1) (2022-01-30)

## [0.6.0](https://github.com/platypusrex/react-hook-form/compare/v0.5.0...v0.6.0) (2022-01-17)

### Bug Fixes

- example form hook use after hooks options were refactored ([434a98c](https://github.com/platypusrex/react-hook-form/commit/434a98c9c62090cf762484c55806c68a6d5d5789))
- move yup to dependency (not peer) and update readme ([3327d75](https://github.com/platypusrex/react-hook-form/commit/3327d75226cb9a4d1b2f7b01c6acdf9c719fc669))
- unit tests errors after hook option API change ([8a1b0d4](https://github.com/platypusrex/react-hook-form/commit/8a1b0d4789f1e0ec74e0b174bbcc25a17653e5c7))

## 0.5.0 (2022-01-16)

### Features

- pass values to on submit callback, fix address form custom validations, bump version ([36fd920](https://github.com/platypusrex/react-hook-form/commit/36fd9205f62cf30a7372a661603948f8613c4a38))
- updates deps and migrates hook to v1 of yup.js ([76aa564](https://github.com/platypusrex/react-hook-form/commit/76aa5641a05346a675a91dfc365b47616956addd))

### Bug Fixes

- adds node-version for CI github action ([39b92b3](https://github.com/platypusrex/react-hook-form/commit/39b92b302d7f84e626a1cb4d743e45bb3b5f4c20))
- all the things ([0ca8b4d](https://github.com/platypusrex/react-hook-form/commit/0ca8b4d189100def856a1216d65727643cbf8e31))
- async validation debouncing issues ([3f990b7](https://github.com/platypusrex/react-hook-form/commit/3f990b7b7ef16bd0c1a4313ab98261935d06e3cb))
- debounce issues ([d9116a5](https://github.com/platypusrex/react-hook-form/commit/d9116a531bfcaee34f9aa3ebdc264fc6444c2508))
- export hook types, bump version ([c91597d](https://github.com/platypusrex/react-hook-form/commit/c91597df0185f66de994a5ac3a8b0744eb70eae4))
- node eng version ([5f81e42](https://github.com/platypusrex/react-hook-form/commit/5f81e4267d603dd6e4b02e30eb4a04aec1453c1f))
- proper version bump ([c49b9f2](https://github.com/platypusrex/react-hook-form/commit/c49b9f2a134d4db810c21e45b563018ca3848457))
- resolving issues from last merge to improve hook perf ([6cacb60](https://github.com/platypusrex/react-hook-form/commit/6cacb6074a49f78956af20f25daa61e995bc8a45))
- support dynamic validationSchema ([223f340](https://github.com/platypusrex/react-hook-form/commit/223f3401e4e07f59cb7355d20496b1709986aae6))
- support dynamic validationSchema ([7342aff](https://github.com/platypusrex/react-hook-form/commit/7342aff9bba66027a9b23af96b4d8f2b7f03ea61))
- support dynamic validationSchema ([d610b48](https://github.com/platypusrex/react-hook-form/commit/d610b48d525a158d89d9a3f5303ad28191e5a5eb))
