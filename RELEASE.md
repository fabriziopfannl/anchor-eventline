# Release Guide

## Versioning
- Follow SemVer strictly.
- Keep Rust + TS versions in sync for public releases.

## Checklist
- [ ] Update versions in `crates/anchor-eventline/Cargo.toml` and `packages/sdk/package.json`
- [ ] Update `CHANGELOG.md`
- [ ] Run `cargo fmt`, `cargo clippy`, `cargo test`
- [ ] Run `pnpm --filter @eventline/anchor-events build`
- [ ] Tag: `git tag vX.Y.Z`
- [ ] Push tag: `git push origin vX.Y.Z`

## Maintenance
- Triage issues weekly.
- Keep examples compiling against latest Anchor and web3.js.
- Deprecate APIs with a migration note in CHANGELOG.
