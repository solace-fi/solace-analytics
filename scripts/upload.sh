#yarn dev
yarn build
aws s3 rm s3://analytics.solace.fi --include "*" --recursive
aws s3 cp --recursive out/ s3://analytics.solace.fi/
python3 scripts/upload_helper.py
#aws cloudfront create-invalidation --distribution-id EOBRN4IGBGD7E --paths "/*"
