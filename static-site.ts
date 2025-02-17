#!/usr/bin/env node
import { aws_cloudfront, aws_iam, aws_s3, Stack } from 'aws-cdk-lib';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class StaticSite extends Construct {
  constructor(parent: Stack, name: string) {
    super(parent, name);

    const cloudFrontOAI = new aws_cloudfront.OriginAccessIdentity(this, 'RSS-SHOP-CDK-OAI');

    const siteBucket = new aws_s3.Bucket(this, 'RssShopCdkStaticBucket', {
      bucketName: 'rss-shop-cdk',
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: false,
      blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL
    });
    siteBucket.addToResourcePolicy(new aws_iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [siteBucket.arnForObjects("*")],
      principals: [new aws_iam.CanonicalUserPrincipal(cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
    }))
    const distribution = new aws_cloudfront.CloudFrontWebDistribution(this, 'RssShopCdkDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: siteBucket,
            originAccessIdentity: cloudFrontOAI
          },
          behaviors: [{ isDefaultBehavior: true }]
        }
      ]
    })

    new BucketDeployment(this, 'RssShopCdk-Bucket-Deployment', {
      sources: [Source.asset('../nodejs-aws-shop-react/dist')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*']
    });
  }
}
