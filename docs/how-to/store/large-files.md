---
title: Very large files
description: Learn how to store very large files.
---

# Very large files

If you plan to store very large files (over 1TB), here are some additional considerations:

### Recommended file format: CAR

Filecoin can store any file format, but for very large files we recommend using the [CAR (Content Addressable ARchive) format](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md). CAR files have a header block containing the root CIDs of the graphs in the file. This supports more granular retrieval queries.

[TODO: Example of real data indexed and pointers to the subset that can grab that specific data, to help ppl think about splitting data up better for their use cases and specific file formats.]

### Maximizing storage

The [simple recommendation](<(/how-to/store-prepare-data)>) is that files must be smaller than a sector. Colloquially, we refer to sectors as 1MB, 32GB, etc. To fully maximize storage usage, chunks can be fractionally larger. This is due to a combination of quirks:

- **Binary size:** Filecoin uses base 2 (binary) sizes. A "1MB sector" is actually 1MiB, or 1,048,576 bytes not 1,000,000 bytes.
- **Padding:** For every 256 bits, subtract 2 bits (used by the Proofs processes). The remainder, 254 bits, is the usable storage space.

**Example:**
A 1MiB sector is 1,048,576 bytes. Next, we multiply that by 254/256. Result: a 1MiB sector can hold 1,040,384 bytes of stored data.

| Sector Size | Simplified Max Filesize     | Absolute Max Filesize |
| ----------- | --------------------------- | --------------------- |
| 2KiB        | 2KB (2,000 bytes)           | 2,032 bytes           |
| 8MiB        | 8MB (8,000,000 bytes)       | 8,323,072 bytes       |
| 512MiB      | 512MB (512,000,000 bytes)   | 532,676,608 bytes     |
| 32GiB       | 32GB (32,000,000,000 bytes) | 34,091,302,912 bytes  |
