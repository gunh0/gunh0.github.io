#!/bin/bash

# 포스트를 연도별 구조로 마이그레이션하는 스크립트

set -e

echo "🔄 포스트 디렉토리 구조 마이그레이션 시작..."
echo ""

# 백업 생성
echo "📦 백업 생성 중..."
cp -r posts posts_backup_$(date +%Y%m%d_%H%M%S)
echo "✅ 백업 완료: posts_backup_$(date +%Y%m%d_%H%M%S)"
echo ""

# 임시 디렉토리 생성
TEMP_DIR="posts_temp"
mkdir -p "$TEMP_DIR"

echo "📁 포스트 이동 중..."
for dir in posts/*/; do
  if [ "$dir" = "posts/*/" ]; then
    continue
  fi
  
  folder=$(basename "$dir")
  
  # 숫자로 시작하는 폴더는 이미 연도 폴더
  if [[ "$folder" =~ ^[0-9]{4}$ ]]; then
    echo "⏭️  건너뛰기: $folder (이미 연도 폴더)"
    continue
  fi
  
  mdfile=$(ls "$dir"*.md 2>/dev/null | head -1)
  
  if [ -f "$mdfile" ]; then
    # 파일명에서 날짜 추출
    year=$(basename "$mdfile" | grep -oE '^[0-9]{4}' | head -1)
    month_day=$(basename "$mdfile" | grep -oE '^[0-9]{4}-([0-9]{2}-[0-9]{2})' | cut -d'-' -f2-3)
    
    if [ -n "$year" ] && [ -n "$month_day" ]; then
      # 연도 폴더 생성
      mkdir -p "$TEMP_DIR/$year"
      
      # 새 폴더명 (월-일-제목)
      new_folder="$month_day-$folder"
      
      echo "  📝 $folder -> $year/$new_folder"
      
      # 이동
      mv "$dir" "$TEMP_DIR/$year/$new_folder"
    else
      echo "  ⚠️  날짜를 찾을 수 없음: $folder"
    fi
  else
    echo "  ⚠️  마크다운 파일 없음: $folder"
  fi
done

echo ""
echo "🔄 디렉토리 재구성 중..."

# 기존 posts 디렉토리 제거 (백업은 이미 생성됨)
rm -rf posts

# 임시 디렉토리를 posts로 이름 변경
mv "$TEMP_DIR" posts

echo ""
echo "✅ 마이그레이션 완료!"
echo ""
echo "📊 결과:"
for year_dir in posts/*/; do
  if [ -d "$year_dir" ]; then
    year=$(basename "$year_dir")
    count=$(find "$year_dir" -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')
    echo "  $year: $count 개 포스트"
  fi
done

echo ""
echo "💡 다음 단계:"
echo "  1. npm run build 로 빌드 테스트"
echo "  2. 문제 없으면 백업 삭제: rm -rf posts_backup_*"
echo "  3. 문제 있으면 복구: rm -rf posts && mv posts_backup_* posts"
