import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  Link,
  Image,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  return (
    <Page>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400" align="center">
                <Image source="/logo.svg" alt="Pricer Sync Logo" width={64} />
                <Text as="h1" variant="headingLg">
                  Pricer Sync
                </Text>
                <Text as="p" variant="bodyMd">
                  Automatically sync and manage your product prices.
                </Text>
                <BlockStack gap="200">
                  <Link url="/app/log-history">View Log History</Link>
                  <Link url="/app/settings">Settings</Link>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
