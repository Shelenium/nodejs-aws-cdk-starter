#!/usr/bin/env node
import { App, Stack } from 'aws-cdk-lib';
import { StaticSite } from './static-site';

class RssShopCdkStaticSiteStack extends Stack {
  constructor(parent: App, name: string) {
    super(parent, name);

    new StaticSite(this, 'RssShopCdkStaticWebsite');
  }
}

const app = new App();

new RssShopCdkStaticSiteStack(app, 'RssShopCdkStaticWebsite');

app.synth();