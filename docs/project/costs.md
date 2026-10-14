---
id: costs
title: Costs
sidebar_position: 3
---

# Costs

## Estimated infrastructure cost

The project's one-page summary states an estimated infrastructure cost of **about USD 460 per month** for the production
platform on AWS.

:::warning The detailed breakdown is not in the documents available
The USD 460 figure comes from the summary diagram. The line-by-line estimate (per service, with quantities and prices) was
not among the documents used to write this page, so no per-service numbers are given here. When the team shares the cost
sheet, this page should be completed with it.
:::

## What the estimate covers

The platform described in [Architecture v1](../sprint-1/architecture-v1.md) uses these AWS services, which are the cost
drivers to include in any breakdown:

| Group | Services |
|---|---|
| Network | VPC across 2 availability zones, Application Load Balancer, NAT Gateway, Internet Gateway |
| Real-time processing | ECS Fargate tasks (receiver, consumers, APIs), RabbitMQ on an EC2 instance |
| Database | PostgreSQL on RDS, single availability zone, automated backups, KMS encryption |
| Batch and orchestration | Airflow, Celery workers and Spark ETL on ECS Fargate (Spark with 4 vCPU) |
| Data lake and analytics | S3 (Landing, Bronze, Silver, Gold in Parquet), Athena, Power BI |
| Platform services | ECR, CloudWatch, Secrets Manager and KMS, IAM |
| Delivery | GitHub for pull requests, CI and image builds |

## Cost decisions already taken

| Decision | Effect on cost |
|---|---|
| **Single-AZ database** | Cheaper than a multi-AZ database, at the price of less availability |
| **Parquet partitioned by date in S3, queried with Athena** | Pay per query instead of running a data warehouse |
| **Fargate instead of managed servers** | No idle servers to pay for in the batch jobs |
| **Documentation on GitHub Pages** | Free for a public repository. See [ADR-0007](../decisions/0007-documentation-site.md) |
| **Simulators publish small files to S3** | Storage cost is negligible; there are no servers running. See [Publishing to S3](../simulator/publishing-to-s3.md) |
| **Local development with Docker** | No cloud cost for development. See [Running locally](../architecture/local-development.md) |

## What is not covered

- Costs of tools such as Jira or Power BI licences.
- Development effort and team time.
- Costs after the first production deployment, such as data growth or support.
