#!/bin/bash

cat <<EOF > $1.md
---
title: ''
description: ''
breadcrumb: ''
---

# {{ \$frontmatter.title }}

{{ \$frontmatter.description }}

EOF
