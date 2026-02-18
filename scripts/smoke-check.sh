#!/usr/bin/env bash
# Lightweight smoke checks used by CI after deploys.
# Exits non-zero on failure so CI can mark the deploy as failed.
# Make executable: chmod +x ./scripts/smoke-check.sh
#
# Usage:
#   ./scripts/smoke-check.sh "https://owner.github.io/repo/" [expected_text] [retries] [sleep_seconds]
#
# Example (SPA mode):
#   ./scripts/smoke-check.sh "https://PaulDeveloper73.github.io/Kisakye-Paul-Elite-Portifolio/" "" 5 2

set -euo pipefail

URL="${1:-}"
EXPECTED_TEXT="${2:-}"
RETRIES="${3:-5}"
SLEEP="${4:-2}"
TMP_BODY="$(mktemp --suffix=-smoke.html)"

if [ -z "$URL" ]; then
  echo "Usage: $0 <url> [expected_text] [retries] [sleep_seconds]"
  exit 2
fi

# Normalize URL (ensure trailing slash)
case "$URL" in
  */) ;;
  *) URL="${URL}/" ;;
esac

# Extract path portion from URL (e.g., /repo/ or /repo/pr-123/)
URL_PATH="$(printf '%s' "$URL" | awk -F/ '{ if (NF>3) { printf "/%s", $4; for(i=5;i<=NF;i++){ if($i!="") printf "/%s",$i } } else printf "/" }')"
case "$URL_PATH" in
  */) ;;
  *) URL_PATH="${URL_PATH}/" ;;
esac

echo "Running smoke checks against: $URL"
if [ -n "$EXPECTED_TEXT" ]; then
  echo "Expecting text: \"$EXPECTED_TEXT\""
else
  echo "No expected text provided; using SPA heuristics."
fi
echo "Retries: $RETRIES, Sleep: ${SLEEP}s"
echo "URL path for asset checks: '$URL_PATH'"

attempt=1
while [ "$attempt" -le "$RETRIES" ]; do
  echo "Attempt ${attempt}/${RETRIES} — fetching ${URL}"
  HTTP_STATUS=$(curl -sSL -o "$TMP_BODY" -w "%{http_code}" --max-time 15 "$URL" || echo "000")
  echo "HTTP status: $HTTP_STATUS"

  if [ "$HTTP_STATUS" = "200" ]; then
    if [ -n "$EXPECTED_TEXT" ]; then
      if grep -q -F "$EXPECTED_TEXT" "$TMP_BODY"; then
        echo "OK: ${URL} returned 200 and contains expected text."
        rm -f "$TMP_BODY"
        exit 0
      else
        echo "Expected text not found in page. Falling back to SPA checks..."
      fi
    fi

    # SPA fallback checks
    if grep -qiE '<div[^>]+id=["'\''](root|app|__next|__astro|svelte|vite-app)["'\'']' "$TMP_BODY"; then
      echo "Found root container element in index.html — likely a valid SPA index."
      if [ "$URL_PATH" != "/" ]; then
        if grep -qF "$URL_PATH" "$TMP_BODY"; then
          echo "Asset path check passed: index.html references '${URL_PATH}'."
          rm -f "$TMP_BODY"
          exit 0
        else
          echo "Asset path '${URL_PATH}' not found in index.html; this may indicate incorrect base/publish path."
          echo "Sleeping ${SLEEP}s before retry..."
          sleep "$SLEEP"
          attempt=$((attempt + 1))
          continue
        fi
      else
        echo "Root path and root container present — accepting as success."
        rm -f "$TMP_BODY"
        exit 0
      fi
    else
      echo "No root container found in index.html. Page may not be a built SPA or index.html is incorrect."
      echo "First 200 chars of body for debugging:"
      head -c 200 "$TMP_BODY" | sed -n '1,200p'
      echo "Sleeping ${SLEEP}s before retry..."
      sleep "$SLEEP"
      attempt=$((attempt + 1))
      continue
    fi
  fi

  if [ "$HTTP_STATUS" = "404" ]; then
    echo "Received 404 for ${URL} — this often means the site path or publish_dir is incorrect."
    echo "Sleeping ${SLEEP}s before retry..."
    sleep "$SLEEP"
    attempt=$((attempt + 1))
    continue
  fi

  if [ "$HTTP_STATUS" = "000" ]; then
    echo "Network or curl error while fetching ${URL}."
    echo "Sleeping ${SLEEP}s before retry..."
    sleep "$SLEEP"
    attempt=$((attempt + 1))
    continue
  fi

  echo "Unexpected HTTP status ${HTTP_STATUS}. Sleeping ${SLEEP}s before retry..."
  sleep "$SLEEP"
  attempt=$((attempt + 1))
done

echo "Smoke check failed for ${URL} after ${RETRIES} attempts."
echo "Last fetched body (first 1000 chars):"
head -c 1000 "$TMP_BODY" || true
rm -f "$TMP_BODY"
exit 1
