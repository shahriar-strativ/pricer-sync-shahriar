import {
  Card,
  Layout,
  Page,
  BlockStack,
  FormLayout,
  TextField,
  Button,
  Checkbox,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    customerName: "",
    storeUUID: "",
    username: "",
    password: "",
  });
  const [isEnabled, setIsEnabled] = useState(false);

  const handleChange = (value: string, field: keyof typeof formData) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Page>
      <TitleBar title="Settings" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Checkbox
                label="Enable Sync"
                checked={isEnabled}
                onChange={setIsEnabled}
              />
              <FormLayout>
                <TextField
                  label="Customer name (Company name)"
                  autoComplete="off"
                  value={formData.customerName}
                  onChange={(value) => handleChange(value, "customerName")}
                />
                <TextField
                  label="Store UUID"
                  autoComplete="off"
                  value={formData.storeUUID}
                  onChange={(value) => handleChange(value, "storeUUID")}
                />
                <TextField
                  label="Username"
                  autoComplete="off"
                  value={formData.username}
                  onChange={(value) => handleChange(value, "username")}
                />
                <TextField
                  label="Password"
                  type="password"
                  autoComplete="off"
                  value={formData.password}
                  onChange={(value) => handleChange(value, "password")}
                />
              </FormLayout>

              <Button>Save</Button>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
