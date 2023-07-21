---
'@platypusrex/react-use-form': major
---

Many years later and many years in a production app, finally releasing a major version. The focus of this PR was to decouple the package from TSDX which has all but been abandoned and migrate to swc. Also moving to pnpm for dep management, and also migrating from standard-version to changesets for release automation. All core and dev dependencies have been updated in an effort to resolve security vulnerabilites with transitive deps.
