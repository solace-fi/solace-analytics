# helps nextjs output work with aws cloudfront
# s3 cp "filename.html" "filename*"

import boto3
s3 = boto3.resource('s3')
s3client = boto3.client('s3')
# get keys
bucket = 'analytics.solace.fi'
s3objects = s3client.list_objects_v2(Bucket=bucket)['Contents']
keys = map(lambda obj: obj['Key'], s3objects)
keys = filter(lambda key: len(key) > 5 and key[-5:] == '.html', keys)
# process
for key in keys:
    newkey = key[:-5]
    print('copy  : s3://{}/{} to s3://{}/{}'.format(bucket, key, bucket, newkey))
    # copy. will throw an exception if it fails - let it
    s3.Object(bucket, newkey).copy_from(CopySource='{}/{}'.format(bucket, key))
