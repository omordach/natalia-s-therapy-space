## 2024-03-22 - [Image Optimization]
**Learning:** Found several large images (up to 700KB each, totaling ~2.4MB) in a below-the-fold component (`About.tsx`) being loaded synchronously on initial page load.
**Action:** Always check `src/assets` or equivalent directories for large binary files and ensure they are lazy-loaded if they appear below the fold.
