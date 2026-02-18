#!/usr/bin/env bash
# Lightweight smoke checks used by CI after deploys.
# Exits non-zero on failure so CI can mark the deploy as failed.
# Make executable: chmod +x ./scripts/smoke-check.sh
#
# Usage:
#   ./scripts/smoke-check.sh "https://owner.github.io/repo/" \
#     [expected_text] [retries] [sleep_seconds]
#
# Optional args:
#   expected_text  - string to look for in the page (default: "Kisakye Paul")
#   retries        - number of attempts (default: 5)
#   sleep_seconds  - seconds between attempts (default: 2)

set -euo pipefail

URL="${1:-}"
EXPECTED_TEXT="${2:-Kisakye Paul}"
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

echo "Running smoke checks against: $URL"
echo "Expecting text: \"$EXPECTED_TEXT\""
echo "Retries: $RETRIES, Sleep: ${SLEEP}s"

attempt=1
while [ "$attempt" -le "$RETRIES" ]; do
  echo "Attempt ${attempt}/${RETRIES} — fetching ${URL}"
  # follow redirects, limit time, save body for inspection
  HTTP_STATUS=$(curl -sSL -o "$TMP_BODY" -w "%{http_code}" --max-time 15 "$URL" || echo "000")
  echo "HTTP status: $HTTP_STATUS"

  if [ "$HTTP_STATUS" = "200" ]; then
    # Basic content sanity check
    if grep -q -F "$EXPECTED_TEXT" "$TMP_BODY"; then
      echo "OK: ${URL} returned 200 and contains expected text."
      rm -f "$TMP_BODY"
      exit 0
    else
      echo "Warning: ${URL} returned 200 but expected text not found."
      echo "First 200 chars of body for debugging:"
      head -c 200 "$TMP_BODY" | sed -n '1,200p'
      # Consider this a failure — break and report
      rm -f "$TMP_BODY"
      exit 1
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

  # Unexpected status codes: retry a few times
  echo "Unexpected HTTP status ${HTTP_STATUS}. Sleeping ${SLEEP}s before retry..."
  sleep "$SLEEP"
  attempt=$((attempt + 1))
done

# If we reach here, all attempts failed — print diagnostics
echo "Smoke check failed for ${URL} after ${RETRIES} attempts."
echo "Last fetched body (first 1000 chars):"
head -c 1000 "$TMP_BODY" || true
rm -f "$TMP_BODY"
exit 1
