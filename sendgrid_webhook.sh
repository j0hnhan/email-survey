function localtunnel {
  lt -s jh456er4ewr --port 8080
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done