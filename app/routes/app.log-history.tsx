import {
  Card,
  Layout,
  Page,
  DataTable,
  Icon,
  Modal,
  ActionMenu,
  BlockStack,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { CheckIcon, XIcon } from "@shopify/polaris-icons";
import { useState } from "react";

interface LogHistoryItem {
  id: string;
  productId: string;
  productName: string;
  previousPrice: number;
  currentPrice: number;
  updateTime: string;
  syncStatus: boolean;
}

// Mock data for demonstration
const logHistory: LogHistoryItem[] = [
  {
    id: "1",
    productId: "123456",
    productName: "Sample Product 1",
    previousPrice: 29.99,
    currentPrice: 24.99,
    updateTime: new Date().toLocaleString(),
    syncStatus: true,
  },
  {
    id: "2",
    productId: "789012",
    productName: "Sample Product 2",
    previousPrice: 19.99,
    currentPrice: 19.99,
    updateTime: new Date().toLocaleString(),
    syncStatus: false,
  },
  {
    id: "3",
    productId: "789012",
    productName: "Sample Product 3",
    previousPrice: 39.99,
    currentPrice: 34.99,
    updateTime: new Date().toLocaleString(),
    syncStatus: false,
  },
  {
    id: "4",
    productId: "789012",
    productName: "Sample Product 4",
    previousPrice: 49.99,
    currentPrice: 44.99,
    updateTime: new Date().toLocaleString(),
    syncStatus: true,
  },
  {
    id: "5",
    productId: "789012",
    productName: "Sample Product 5",
    previousPrice: 59.99,
    currentPrice: 54.99,
    updateTime: new Date().toLocaleString(),
    syncStatus: true,
  },
];

export default function LogHistoryPage() {
  const [selectedItem, setSelectedItem] = useState<LogHistoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalChange = () => setIsModalOpen(!isModalOpen);

  const handleViewDetails = (item: LogHistoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const rows = logHistory.map((item) => [
    item.productId,
    item.productName,
    `$${item.previousPrice.toFixed(2)}`,
    `$${item.currentPrice.toFixed(2)}`,
    item.updateTime,
    <Icon key={item.id} source={item.syncStatus ? CheckIcon : XIcon} />,
    <ActionMenu
      key={`menu-${item.id}`}
      actions={[
        {
          content: "View Details",
          onAction: () => handleViewDetails(item),
        },
      ]}
    />,
  ]);

  return (
    <Page>
      <TitleBar title="Log History" />
      <Layout>
        <Layout.Section>
          <Card>
            <DataTable
              columnContentTypes={[
                "text",
                "text",
                "text",
                "text",
                "text",
                "text",
                "text",
              ]}
              headings={[
                "Product ID",
                "Product Name",
                "Previous Price",
                "Current Price",
                "Update Time",
                "Sync Status",
                "Actions",
              ]}
              rows={rows}
            />
          </Card>
        </Layout.Section>
      </Layout>

      <Modal
        open={isModalOpen}
        onClose={handleModalChange}
        title="Product Details"
      >
        <Modal.Section>
          {selectedItem && (
            <BlockStack gap="400">
              <Text as="p">
                <Text as="span" fontWeight="bold">
                  Product ID:
                </Text>{" "}
                {selectedItem.productId}
              </Text>
              <Text as="p">
                <Text as="span" fontWeight="bold">
                  Product Name:
                </Text>{" "}
                {selectedItem.productName}
              </Text>
              <Text as="p">
                <Text as="span" fontWeight="bold">
                  Previous Price:
                </Text>{" "}
                ${selectedItem.previousPrice.toFixed(2)}
              </Text>
              <Text as="p">
                <Text as="span" fontWeight="bold">
                  Current Price:
                </Text>{" "}
                ${selectedItem.currentPrice.toFixed(2)}
              </Text>
              <Text as="p">
                <Text as="span" fontWeight="bold">
                  Update Time:
                </Text>{" "}
                {selectedItem.updateTime}
              </Text>
              <Text as="p">
                <Text as="span" fontWeight="bold">
                  Sync Status:
                </Text>{" "}
                {selectedItem.syncStatus ? "Synced" : "Not Synced"}
              </Text>
            </BlockStack>
          )}
        </Modal.Section>
      </Modal>
    </Page>
  );
}
