
# Deep Analysis V2 eval harness

This folder is the home for benchmark fixtures and scoring scripts for the new deep-analysis runtime.

The suites are:

- `reconstruct/` for clone and export tasks.
- `audit/` for critique and recommendation tasks.
- `behavior/` for state-machine and QA style tasks.

Each case should eventually include:

- source fixture path
- target format
- expected artifact summary
- expected acceptance checks
- notes about scoring
