#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesSite = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_s3_deployment_1 = require("aws-cdk-lib/aws-s3-deployment");
const constructs_1 = require("constructs");
class FilesSite extends constructs_1.Construct {
    constructor(parent, name) {
        super(parent, name);
        const cloudFrontOAI = new aws_cdk_lib_1.aws_cloudfront.OriginAccessIdentity(this, 'RSS-SHOP-FILES-OAI');
        const filesBucket = new aws_cdk_lib_1.aws_s3.Bucket(this, 'RssShopFilesCdkBucket', {
            bucketName: 'rss-shop-files-cdk',
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'index.html',
            publicReadAccess: false,
            blockPublicAccess: aws_cdk_lib_1.aws_s3.BlockPublicAccess.BLOCK_ALL
        });
        filesBucket.addToResourcePolicy(new aws_cdk_lib_1.aws_iam.PolicyStatement({
            sid: 'AllowReadAndWriteAccess',
            actions: ['s3:GetObject', 's3:PutObject', 's3:ListBucket', 's3:AbortMultipartUpload', 's3:DeleteObject'],
            resources: [filesBucket.arnForObjects("*")],
            principals: [new aws_cdk_lib_1.aws_iam.CanonicalUserPrincipal(cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
        }));
        const distribution = new aws_cdk_lib_1.aws_cloudfront.CloudFrontWebDistribution(this, 'RssShopFilesCdkDistribution', {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: filesBucket,
                        originAccessIdentity: cloudFrontOAI
                    },
                    behaviors: [{ isDefaultBehavior: true }]
                }
            ]
        });
        new aws_s3_deployment_1.BucketDeployment(this, 'RssShopFile-Deployment', {
            sources: [aws_s3_deployment_1.Source.asset('./uploaded')],
            destinationBucket: filesBucket,
            destinationKeyPrefix: 'uploaded/',
            distribution,
            distributionPaths: ['/*']
        });
    }
}
exports.FilesSite = FilesSite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcC1maWxlcy1TMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNob3AtZmlsZXMtUzMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLDZDQUFxRTtBQUNyRSxxRUFBeUU7QUFDekUsMkNBQXVDO0FBRXZDLE1BQWEsU0FBVSxTQUFRLHNCQUFTO0lBQ3RDLFlBQVksTUFBYSxFQUFFLElBQVk7UUFDckMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVwQixNQUFNLGFBQWEsR0FBRyxJQUFJLDRCQUFjLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFFMUYsTUFBTSxXQUFXLEdBQUcsSUFBSSxvQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLEVBQUU7WUFDbkUsVUFBVSxFQUFFLG9CQUFvQjtZQUNoQyxvQkFBb0IsRUFBRSxZQUFZO1lBQ2xDLG9CQUFvQixFQUFFLFlBQVk7WUFDbEMsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixpQkFBaUIsRUFBRSxvQkFBTSxDQUFDLGlCQUFpQixDQUFDLFNBQVM7U0FDdEQsQ0FBQyxDQUFDO1FBRUgsV0FBVyxDQUFDLG1CQUFtQixDQUFDLElBQUkscUJBQU8sQ0FBQyxlQUFlLENBQUM7WUFDMUQsR0FBRyxFQUFFLHlCQUF5QjtZQUM5QixPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSx5QkFBeUIsRUFBRSxpQkFBaUIsQ0FBQztZQUN4RyxTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLFVBQVUsRUFBRSxDQUFDLElBQUkscUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsK0NBQStDLENBQUMsQ0FBQztTQUNoSCxDQUFDLENBQUMsQ0FBQztRQUVKLE1BQU0sWUFBWSxHQUFHLElBQUksNEJBQWMsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsNkJBQTZCLEVBQUU7WUFDckcsYUFBYSxFQUFFO2dCQUNiO29CQUNFLGNBQWMsRUFBRTt3QkFDZCxjQUFjLEVBQUUsV0FBVzt3QkFDM0Isb0JBQW9CLEVBQUUsYUFBYTtxQkFDcEM7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQztpQkFDekM7YUFDRjtTQUNGLENBQUMsQ0FBQTtRQUVGLElBQUksb0NBQWdCLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQ25ELE9BQU8sRUFBRSxDQUFDLDBCQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JDLGlCQUFpQixFQUFFLFdBQVc7WUFDOUIsb0JBQW9CLEVBQUUsV0FBVztZQUNqQyxZQUFZO1lBQ1osaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBekNELDhCQXlDQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcclxuaW1wb3J0IHsgYXdzX2Nsb3VkZnJvbnQsIGF3c19pYW0sIGF3c19zMywgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCB7IEJ1Y2tldERlcGxveW1lbnQsIFNvdXJjZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMy1kZXBsb3ltZW50JztcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsZXNTaXRlIGV4dGVuZHMgQ29uc3RydWN0IHtcclxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IFN0YWNrLCBuYW1lOiBzdHJpbmcpIHtcclxuICAgIHN1cGVyKHBhcmVudCwgbmFtZSk7XHJcblxyXG4gICAgY29uc3QgY2xvdWRGcm9udE9BSSA9IG5ldyBhd3NfY2xvdWRmcm9udC5PcmlnaW5BY2Nlc3NJZGVudGl0eSh0aGlzLCAnUlNTLVNIT1AtRklMRVMtT0FJJyk7XHJcblxyXG4gICAgY29uc3QgZmlsZXNCdWNrZXQgPSBuZXcgYXdzX3MzLkJ1Y2tldCh0aGlzLCAnUnNzU2hvcEZpbGVzQ2RrQnVja2V0Jywge1xyXG4gICAgICBidWNrZXROYW1lOiAncnNzLXNob3AtZmlsZXMtY2RrJyxcclxuICAgICAgd2Vic2l0ZUluZGV4RG9jdW1lbnQ6ICdpbmRleC5odG1sJyxcclxuICAgICAgd2Vic2l0ZUVycm9yRG9jdW1lbnQ6ICdpbmRleC5odG1sJyxcclxuICAgICAgcHVibGljUmVhZEFjY2VzczogZmFsc2UsXHJcbiAgICAgIGJsb2NrUHVibGljQWNjZXNzOiBhd3NfczMuQmxvY2tQdWJsaWNBY2Nlc3MuQkxPQ0tfQUxMXHJcbiAgICB9KTtcclxuXHJcbiAgICBmaWxlc0J1Y2tldC5hZGRUb1Jlc291cmNlUG9saWN5KG5ldyBhd3NfaWFtLlBvbGljeVN0YXRlbWVudCh7XHJcbiAgICAgIHNpZDogJ0FsbG93UmVhZEFuZFdyaXRlQWNjZXNzJyxcclxuICAgICAgYWN0aW9uczogWydzMzpHZXRPYmplY3QnLCAnczM6UHV0T2JqZWN0JywgJ3MzOkxpc3RCdWNrZXQnLCAnczM6QWJvcnRNdWx0aXBhcnRVcGxvYWQnLCAnczM6RGVsZXRlT2JqZWN0J10sXHJcbiAgICAgIHJlc291cmNlczogW2ZpbGVzQnVja2V0IC5hcm5Gb3JPYmplY3RzKFwiKlwiKV0sXHJcbiAgICAgIHByaW5jaXBhbHM6IFtuZXcgYXdzX2lhbS5DYW5vbmljYWxVc2VyUHJpbmNpcGFsKGNsb3VkRnJvbnRPQUkuY2xvdWRGcm9udE9yaWdpbkFjY2Vzc0lkZW50aXR5UzNDYW5vbmljYWxVc2VySWQpXVxyXG4gICAgfSkpO1xyXG5cclxuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbiA9IG5ldyBhd3NfY2xvdWRmcm9udC5DbG91ZEZyb250V2ViRGlzdHJpYnV0aW9uKHRoaXMsICdSc3NTaG9wRmlsZXNDZGtEaXN0cmlidXRpb24nLCB7XHJcbiAgICAgIG9yaWdpbkNvbmZpZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzM09yaWdpblNvdXJjZToge1xyXG4gICAgICAgICAgICBzM0J1Y2tldFNvdXJjZTogZmlsZXNCdWNrZXQsXHJcbiAgICAgICAgICAgIG9yaWdpbkFjY2Vzc0lkZW50aXR5OiBjbG91ZEZyb250T0FJXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYmVoYXZpb3JzOiBbeyBpc0RlZmF1bHRCZWhhdmlvcjogdHJ1ZSB9XVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSlcclxuXHJcbiAgICBuZXcgQnVja2V0RGVwbG95bWVudCh0aGlzLCAnUnNzU2hvcEZpbGUtRGVwbG95bWVudCcsIHtcclxuICAgICAgc291cmNlczogW1NvdXJjZS5hc3NldCgnLi91cGxvYWRlZCcpXSxcclxuICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IGZpbGVzQnVja2V0LFxyXG4gICAgICBkZXN0aW5hdGlvbktleVByZWZpeDogJ3VwbG9hZGVkLycsIC8vIE9wdGlvbmFsOiBBZGQgYSBwcmVmaXggZm9yIHRoZSBkZXBsb3llZCBmaWxlcyxcclxuICAgICAgZGlzdHJpYnV0aW9uLFxyXG4gICAgICBkaXN0cmlidXRpb25QYXRoczogWycvKiddXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19