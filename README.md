# Tiny Stack VM

[![Tiny Stack VM](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)
[![Rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/ELVINO1806/tiny-stack-vm/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)
[![Reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/ELVINO1806/tiny-stack-vm/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)

A small interpreter for the tiny stack ISA, written from the spec alone. It runs each program with a 256-value data stack, a 64-deep call stack, and 256 words of memory. All arithmetic wraps at 32 bits, with exact signed and unsigned division, remainder, shifts, and compares. Every trap reports its own exit code, output written before a trap is kept, and the step and output limits are enforced.

## Run

```sh
node main.ts
```

It reads `/input/<id>/program.bin` and `/input/<id>/input.bin` for each instance, then writes `/output/<id>/stdout.bin` and `/output/<id>/exit.txt`.

New to make.fun? Start here: https://make.fun/r/4ajjjbdm
