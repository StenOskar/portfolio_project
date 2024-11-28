APP_URL="http://35.228.30.185/"

echo "Performing smoke test on $APP_URL"

STATUS_CODE=$(curl --write-out %{http_code} --silent --output /dev/null "$APP_URL")

if [[ "$STATUS_CODE" -ne 200 ]] ; then
  echo "Smoke test failed: Expected 200 OK, but got $STATUS_CODE"
  exit 1
else
  echo "Smoke test passed: Received 200 OK"
fi
