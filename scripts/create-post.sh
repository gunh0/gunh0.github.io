#!/bin/bash

# 새 포스트 생성 스크립트

if [ -z "$1" ]; then
  echo "사용법: ./scripts/create-post.sh \"Post Title\" [tags]"
  echo "예시: ./scripts/create-post.sh \"My New Post\" \"javascript,react\""
  exit 1
fi

TITLE="$1"
TAGS="${2:-}"
DATE=$(date +%Y-%m-%d)
YEAR=$(date +%Y)
MONTH_DAY=$(date +%m-%d)
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')

POST_DIR="posts/$YEAR/$MONTH_DAY-$SLUG"
POST_FILE="$POST_DIR/$DATE-$SLUG.md"

# 디렉토리 생성
mkdir -p "$POST_DIR"

# 태그 배열 생성
if [ -n "$TAGS" ]; then
  TAG_ARRAY="[$(echo "$TAGS" | sed 's/,/, /g' | sed 's/\([^,]*\)/"\1"/g')]"
else
  TAG_ARRAY="[]"
fi

# 마크다운 파일 생성
cat > "$POST_FILE" << EOF
---
title: $TITLE
date: $DATE 12:00:00 +09:00
tags: $TAG_ARRAY
description: 
---

Write your content here...

## Introduction

## Main Content

## Conclusion
EOF

echo "✅ 포스트 생성 완료!"
echo ""
echo "📁 위치: $POST_DIR"
echo "📄 파일: $POST_FILE"
echo "🔗 URL: /posts/$YEAR/$MONTH_DAY-$SLUG"
echo ""
echo "💡 다음 단계:"
echo "  1. $POST_FILE 파일 편집"
echo "  2. 이미지가 필요하면 $POST_DIR 에 추가"
echo "  3. npm run dev 로 미리보기"
