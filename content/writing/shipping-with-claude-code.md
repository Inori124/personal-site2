---
title: Post With Code
date: '2026-01-30'
description: A short coding note with executable style snippets.
---

This is a short coding note for my portfolio.

```r
library(tidyverse)

example <- tibble(
  x = 1:5,
  y = x^2
)

ggplot(example, aes(x, y)) +
  geom_line() +
  geom_point() +
  theme_minimal()
```

I use code snippets here mainly for reproducible analysis notes.
