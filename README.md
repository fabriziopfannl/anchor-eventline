# anchor-eventline

Standardized Anchor events for reliable off-chain indexing.

![CI](https://img.shields.io/badge/ci-passing-brightgreen)
![crates.io](https://img.shields.io/crates/v/anchor-eventline)
![npm](https://img.shields.io/npm/v/sol-eventline)
![license](https://img.shields.io/badge/license-Apache--2.0-blue)

## Quickstart (Rust)
```bash
cargo add anchor-eventline
```

```rust
use anchor_eventline::prelude::*;

#[derive(Eventline)]
#[eventline(name = "SwapEvent", version = 1)]
pub struct SwapEvent {
  pub user: [u8; 32],
  pub amount_in: u64,
  pub amount_out: u64,
}
```

## Quickstart (TypeScript)
```bash
pnpm add sol-eventline
```

```ts
import { decodeEventLogs } from "sol-eventline";
```

## Why Eventline?
- Schemas + versions for events.
- Consistent discriminators for stable parsing.
- SDK ready for indexing pipelines.

## Non-goals
- No hosted indexer or managed service.
- No on-chain program deployment in v0.1.0.
- No audit or security guarantees.

## API (Rust)
```rust
use anchor_eventline::prelude::*;

#[derive(Eventline)]
#[eventline(name = "SwapEvent", version = 1)]
pub struct SwapEvent {
  pub user: [u8; 32],
  pub amount_in: u64,
  pub amount_out: u64,
}

let schema = SwapEvent::schema();
let disc = SwapEvent::discriminator();
```

## API (TypeScript)
```ts
import { decodeEventLogs } from "sol-eventline";

const events = decodeEventLogs(logs, {
  SwapEvent: { version: 1, decoder: (buf) => ({ raw: buf }) },
});
```

## Examples
- `examples/anchor-program`
- `examples/ts`

## Anchor example build notes
The Anchor example is tested with Anchor CLI 0.28.0. If you hit toolchain
or lockfile errors, use this flow:

```bash
# Generate a v3 lockfile
cd examples/anchor-program
rm -f Cargo.lock
RUSTUP_TOOLCHAIN=1.76.0 cargo generate-lockfile

# Downgrade blake3 to avoid crates with edition2024 requirements
RUSTUP_TOOLCHAIN=1.76.0 cargo update -p blake3 --precise 1.5.0

# Build using Anchor 0.28.0 installed locally
$HOME/tools/anchor-0.28.0/bin/anchor build
```

## Versioning
SemVer strict. Keep Rust crate and TS package aligned for public releases.

## Security
Security reviews are welcome. No formal audit has been performed.

## License
Apache-2.0. See `LICENSE`.

## Docs
https://github.com/fabriziopfannl/anchor-eventline
