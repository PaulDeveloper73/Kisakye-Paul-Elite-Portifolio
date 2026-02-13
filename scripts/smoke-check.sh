# Make executable: chmod +x scripts/smoke-check.sh before committing.
#!/usr/bin/env bash
# Lightweight smoke checks used by CI after deploys.
# Exits non-zero on failure so CI can mark the deploy as failed.
#Run locally against a URL
#./scripts/smoke-check.sh "https://pauldeveloper73.github.io/Kisakye-Paul-Elite-Portifolio/"


set -euo pipefail

URL="${1:-}"
if [ -z "$URL" ]; then
  echo "Usage: $0 <url>"
  exit 2
fi

echo "Running smoke checks against: $URL"

check() {
  local path="$1"
  local full="${URL%/}${path}"
  echo "Checking ${full}"
  status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$full" || echo "000")
  if [ "$status" != "200" ]; then
    echo "Smoke check failed for ${full} (status: $status)"
    exit 1
  fi
}

# Root path check; add other critical endpoints as needed (login, health, API endpoints)
check "/"

echo "Smoke checks passed."
