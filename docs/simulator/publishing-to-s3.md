---
id: publishing-to-s3
title: Publishing data to AWS S3
sidebar_position: 7
---

# Publishing data to AWS S3 and reading it with GET

Besides sending over HTTP, the simulator can **generate a batch and save it to S3** so it can be read with `GET` from
anywhere. There are no running servers: it is just storage.

:::note
This mode **does not receive** webhooks: it publishes data to be read. For push delivery use `python -m webhook_simulator`.
:::

## What gets published

| URL (under the `simulator/` folder) | Content |
|---|---|
| `index.json` | Summary: configuration, totals and file list |
| `events/all.ndjson` | All messages, one per line, in arrival order |
| `events/<carrier>.ndjson` | The messages of one carrier |

Each line is a JSON object with `sequence`, `carrier`, `content_type`, `duplicate` and `body` (the message exactly as that
carrier would send it).

## Easy path (only clicks in the AWS console)

### Part 1: generate the files on your computer

You need Python 3.12 or later; nothing else has to be installed. From the simulator folder:

```bash
python3 -m webhook_simulator.publisher --local-dir output --events 1000 --seed 1
```

On Windows use `python` instead of `python3`. This creates `output/simulator/` with `index.json` and the `events` folder.

### Part 2: create the bucket

1. Go to the AWS console, open the **S3** service and click **Create bucket**.
2. **Bucket name:** a name that is unique across all of AWS (lowercase letters, numbers and hyphens).
3. **Object Ownership:** leave "ACLs disabled".
4. **Block Public Access:** clear "Block all public access" and confirm the warning.
5. Click **Create bucket**.

### Part 3: allow reads (GET)

In the bucket's **Permissions** tab, under **Bucket policy**, paste the following, replacing `YOUR-BUCKET-NAME`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadOfSimulatedData",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/simulator/*"
    }
  ]
}
```

### Part 4: upload the files

In the **Objects** tab click **Upload → Add folder** and choose the `output/simulator` folder (**the whole `simulator`
folder**, not the `output` folder). The policy only grants access to the `simulator/*` path.

### Part 5: make the GET request

```text
https://YOUR-BUCKET-NAME.s3.REGION.amazonaws.com/simulator/index.json
```

The region must be **the bucket's region** (for example `us-east-2`). Otherwise AWS answers `PermanentRedirect` and shows the
correct region in `Endpoint`.

:::tip .ndjson files are downloaded
The browser downloads `.ndjson` files instead of displaying them. Open them with a text editor or use Postman with `GET`.
:::

## AWS CLI path

With a CloudFormation template that creates the bucket with public read access only for `simulator/`, CORS, and automatic
deletion after 30 days:

```bash
aws cloudformation deploy \
  --template-file deploy/aws/bucket.yaml \
  --stack-name cargaexpress-simulator \
  --parameter-overrides BucketName=YOUR-BUCKET-NAME \
  --region us-east-2
uv sync --extra aws
uv run python -m webhook_simulator.publisher --bucket YOUR-BUCKET-NAME --region us-east-2 --events 1000 --seed 1
```

## Tearing everything down

In S3, select the bucket, click **Empty** and then **Delete**. With the CLI:

```bash
aws s3 rm s3://YOUR-BUCKET-NAME --recursive
aws cloudformation delete-stack --stack-name cargaexpress-simulator
```

## Security

Reads are **public**: use this only with simulated data. Never store AWS keys in the repository.
