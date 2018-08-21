config :sling, Sling.Endpoint,
  http: [port: {:system, "PORT"}],
  url: [scheme: "https", host: "nameless-reaches-32969.herokuapp.com", port: 443], # substitute your app's name
  cache_static_manifest: "priv/static/manifest.json",
  secret_key_base: System.get_env("SECRET_KEY_BASE"),
  check_origin: ["http://sling-chat.s3-website-us-west-2.amazonaws.com"] # substitute you frontend's domain

# ...

config :guardian, Guardian,
  secret_key: System.get_env("GUARDIAN_SECRET_KEY")

config :sling, Sling.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: System.get_env("DATABASE_URL"),
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
ssl: true