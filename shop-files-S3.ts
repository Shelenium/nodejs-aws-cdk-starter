#!/usr/bin/env node
import { aws_cloudfront, aws_iam, aws_s3, Stack } from 'aws-cdk-lib';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class FilesSite extends Construct {
  constructor(parent: Stack, name: string) {
    super(parent, name);

    const cloudFrontOAI = new aws_cloudfront.OriginAccessIdentity(this, 'RSS-SHOP-FILES-OAI');

    const filesBucket = new aws_s3.Bucket(this, 'RssShopFilesCdkBucket', {
      bucketName: 'rss-shop-files-cdk',
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: false,
      blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL
    });

    filesBucket.addToResourcePolicy(new aws_iam.PolicyStatement({
      sid: 'AllowReadAndWriteAccess',
      actions: ['s3:GetObject', 's3:PutObject', 's3:ListBucket', 's3:AbortMultipartUpload', 's3:DeleteObject'],
      resources: [filesBucket .arnForObjects("*")],
      principals: [new aws_iam.CanonicalUserPrincipal(cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
    }));

    const distribution = new aws_cloudfront.CloudFrontWebDistribution(this, 'RssShopFilesCdkDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: filesBucket,
            originAccessIdentity: cloudFrontOAI
          },
          behaviors: [{ isDefaultBehavior: true }]
        }
      ]
    })

    new BucketDeployment(this, 'RssShopFile-Deployment', {
      sources: [Source.asset('./uploaded')],
      destinationBucket: filesBucket,
      destinationKeyPrefix: 'uploaded/', // Optional: Add a prefix for the deployed files,
      distribution,
      distributionPaths: ['/*']
    });
  }
}
