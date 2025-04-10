import { Card, Layout, Page, DataTable, Icon } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { CheckIcon, XIcon } from "@shopify/polaris-icons";

interface LogHistoryItem {
  id: string;
  productId: string;
  productName: string;
  updateTime: string;
  syncStatus: boolean;
}

// Mock data for demonstration
const logHistory: LogHistoryItem[] = [
  {
    id: "1",
    productId: "123456",
    productName: "Sample Product 1",
    updateTime: new Date().toLocaleString(),
    syncStatus: true,
  },
  {
    id: "2",
    productId: "789012",
    productName: "Sample Product 2",
    updateTime: new Date().toLocaleString(),
    syncStatus: false,
  },
  {
    id: "3",
    productId: "789012",
    productName: "Sample Product 3",
    updateTime: new Date().toLocaleString(),
    syncStatus: false,
  },
  {
    id: "4",
    productId: "789012",
    productName: "Sample Product 4",
    updateTime: new Date().toLocaleString(),
    syncStatus: true,
  },
  {
    id: "5",
    productId: "789012",
    productName: "Sample Product 5",
    updateTime: new Date().toLocaleString(),
    syncStatus: true,
  },
];

export default function LogHistoryPage() {
  const rows = logHistory.map((item) => [
    item.productId,
    item.productName,
    item.updateTime,
    <Icon key={item.id} source={item.syncStatus ? CheckIcon : XIcon} />,
  ]);

  return (
    <Page>
      <TitleBar title="Log History" />
      <Layout>
        <Layout.Section>
          <Card>
            <DataTable
              columnContentTypes={["text", "text", "text", "text"]}
              headings={[
                "Product ID",
                "Product Name",
                "Update Time",
                "Sync Status",
              ]}
              rows={rows}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
