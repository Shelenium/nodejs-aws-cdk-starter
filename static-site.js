#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticSite = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_s3_deployment_1 = require("aws-cdk-lib/aws-s3-deployment");
const constructs_1 = require("constructs");
class StaticSite extends constructs_1.Construct {
    constructor(parent, name) {
        super(parent, name);
        const cloudFrontOAI = new aws_cdk_lib_1.aws_cloudfront.OriginAccessIdentity(this, 'RSS-SHOP-CDK-OAI');
        const siteBucket = new aws_cdk_lib_1.aws_s3.Bucket(this, 'RssShopCdkStaticBucket', {
            bucketName: 'rss-shop-cdk',
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'index.html',
            publicReadAccess: false,
            blockPublicAccess: aws_cdk_lib_1.aws_s3.BlockPublicAccess.BLOCK_ALL
        });
        siteBucket.addToResourcePolicy(new aws_cdk_lib_1.aws_iam.PolicyStatement({
            actions: ['s3:GetObject'],
            resources: [siteBucket.arnForObjects("*")],
            principals: [new aws_cdk_lib_1.aws_iam.CanonicalUserPrincipal(cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
        }));
        const distribution = new aws_cdk_lib_1.aws_cloudfront.CloudFrontWebDistribution(this, 'RssShopCdkDistribution', {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: siteBucket,
                        originAccessIdentity: cloudFrontOAI
                    },
                    behaviors: [{ isDefaultBehavior: true }]
                }
            ]
        });
        new aws_s3_deployment_1.BucketDeployment(this, 'RssShopCdk-Bucket-Deployment', {
            sources: [aws_s3_deployment_1.Source.asset('../nodejs-aws-shop-react/dist')],
            destinationBucket: siteBucket,
            distribution,
            distributionPaths: ['/*']
        });
    }
}
exports.StaticSite = StaticSite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLXNpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0aWMtc2l0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsNkNBQXFFO0FBQ3JFLHFFQUF5RTtBQUN6RSwyQ0FBdUM7QUFFdkMsTUFBYSxVQUFXLFNBQVEsc0JBQVM7SUFDdkMsWUFBWSxNQUFhLEVBQUUsSUFBWTtRQUNyQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXBCLE1BQU0sYUFBYSxHQUFHLElBQUksNEJBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUV4RixNQUFNLFVBQVUsR0FBRyxJQUFJLG9CQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUNuRSxVQUFVLEVBQUUsY0FBYztZQUMxQixvQkFBb0IsRUFBRSxZQUFZO1lBQ2xDLG9CQUFvQixFQUFFLFlBQVk7WUFDbEMsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixpQkFBaUIsRUFBRSxvQkFBTSxDQUFDLGlCQUFpQixDQUFDLFNBQVM7U0FDdEQsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLG1CQUFtQixDQUFDLElBQUkscUJBQU8sQ0FBQyxlQUFlLENBQUM7WUFDekQsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsVUFBVSxFQUFFLENBQUMsSUFBSSxxQkFBTyxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1NBQ2hILENBQUMsQ0FBQyxDQUFBO1FBQ0gsTUFBTSxZQUFZLEdBQUcsSUFBSSw0QkFBYyxDQUFDLHlCQUF5QixDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUNoRyxhQUFhLEVBQUU7Z0JBQ2I7b0JBQ0UsY0FBYyxFQUFFO3dCQUNkLGNBQWMsRUFBRSxVQUFVO3dCQUMxQixvQkFBb0IsRUFBRSxhQUFhO3FCQUNwQztvQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDO2lCQUN6QzthQUNGO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsSUFBSSxvQ0FBZ0IsQ0FBQyxJQUFJLEVBQUUsOEJBQThCLEVBQUU7WUFDekQsT0FBTyxFQUFFLENBQUMsMEJBQU0sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUN4RCxpQkFBaUIsRUFBRSxVQUFVO1lBQzdCLFlBQVk7WUFDWixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQztTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFyQ0QsZ0NBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxyXG5pbXBvcnQgeyBhd3NfY2xvdWRmcm9udCwgYXdzX2lhbSwgYXdzX3MzLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcclxuaW1wb3J0IHsgQnVja2V0RGVwbG95bWVudCwgU291cmNlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzLWRlcGxveW1lbnQnO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0aWNTaXRlIGV4dGVuZHMgQ29uc3RydWN0IHtcclxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IFN0YWNrLCBuYW1lOiBzdHJpbmcpIHtcclxuICAgIHN1cGVyKHBhcmVudCwgbmFtZSk7XHJcblxyXG4gICAgY29uc3QgY2xvdWRGcm9udE9BSSA9IG5ldyBhd3NfY2xvdWRmcm9udC5PcmlnaW5BY2Nlc3NJZGVudGl0eSh0aGlzLCAnUlNTLVNIT1AtQ0RLLU9BSScpO1xyXG5cclxuICAgIGNvbnN0IHNpdGVCdWNrZXQgPSBuZXcgYXdzX3MzLkJ1Y2tldCh0aGlzLCAnUnNzU2hvcENka1N0YXRpY0J1Y2tldCcsIHtcclxuICAgICAgYnVja2V0TmFtZTogJ3Jzcy1zaG9wLWNkaycsXHJcbiAgICAgIHdlYnNpdGVJbmRleERvY3VtZW50OiAnaW5kZXguaHRtbCcsXHJcbiAgICAgIHdlYnNpdGVFcnJvckRvY3VtZW50OiAnaW5kZXguaHRtbCcsXHJcbiAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IGZhbHNlLFxyXG4gICAgICBibG9ja1B1YmxpY0FjY2VzczogYXdzX3MzLkJsb2NrUHVibGljQWNjZXNzLkJMT0NLX0FMTFxyXG4gICAgfSk7XHJcbiAgICBzaXRlQnVja2V0LmFkZFRvUmVzb3VyY2VQb2xpY3kobmV3IGF3c19pYW0uUG9saWN5U3RhdGVtZW50KHtcclxuICAgICAgYWN0aW9uczogWydzMzpHZXRPYmplY3QnXSxcclxuICAgICAgcmVzb3VyY2VzOiBbc2l0ZUJ1Y2tldC5hcm5Gb3JPYmplY3RzKFwiKlwiKV0sXHJcbiAgICAgIHByaW5jaXBhbHM6IFtuZXcgYXdzX2lhbS5DYW5vbmljYWxVc2VyUHJpbmNpcGFsKGNsb3VkRnJvbnRPQUkuY2xvdWRGcm9udE9yaWdpbkFjY2Vzc0lkZW50aXR5UzNDYW5vbmljYWxVc2VySWQpXVxyXG4gICAgfSkpXHJcbiAgICBjb25zdCBkaXN0cmlidXRpb24gPSBuZXcgYXdzX2Nsb3VkZnJvbnQuQ2xvdWRGcm9udFdlYkRpc3RyaWJ1dGlvbih0aGlzLCAnUnNzU2hvcENka0Rpc3RyaWJ1dGlvbicsIHtcclxuICAgICAgb3JpZ2luQ29uZmlnczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHMzT3JpZ2luU291cmNlOiB7XHJcbiAgICAgICAgICAgIHMzQnVja2V0U291cmNlOiBzaXRlQnVja2V0LFxyXG4gICAgICAgICAgICBvcmlnaW5BY2Nlc3NJZGVudGl0eTogY2xvdWRGcm9udE9BSVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGJlaGF2aW9yczogW3sgaXNEZWZhdWx0QmVoYXZpb3I6IHRydWUgfV1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pXHJcblxyXG4gICAgbmV3IEJ1Y2tldERlcGxveW1lbnQodGhpcywgJ1Jzc1Nob3BDZGstQnVja2V0LURlcGxveW1lbnQnLCB7XHJcbiAgICAgIHNvdXJjZXM6IFtTb3VyY2UuYXNzZXQoJy4uL25vZGVqcy1hd3Mtc2hvcC1yZWFjdC9kaXN0JyldLFxyXG4gICAgICBkZXN0aW5hdGlvbkJ1Y2tldDogc2l0ZUJ1Y2tldCxcclxuICAgICAgZGlzdHJpYnV0aW9uLFxyXG4gICAgICBkaXN0cmlidXRpb25QYXRoczogWycvKiddXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19