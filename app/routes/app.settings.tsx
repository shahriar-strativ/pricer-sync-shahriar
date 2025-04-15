import {
  Card,
  Layout,
  Page,
  BlockStack,
  FormLayout,
  TextField,
  Button,
  Checkbox,
  Banner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import prisma from "~/db.server";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { useState, useEffect } from "react";

interface Settings {
  shopName: string;
  isEnabled: boolean;
  customerName: string;
  storeUUID: string;
  username: string;
  password: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shopName = session.shop;

  if (!shopName) {
    throw new Response("Unauthorized", { status: 401 });
  }
  const settings = await getSettingsFromDB(shopName);

  return new Response(JSON.stringify(settings), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const action: ActionFunction = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shopName = session.shop;

  const formData = await request.formData();

  const updatedSettings = {
    shopName,
    isEnabled: formData.get("isEnabled") === "true",
    customerName: formData.get("customerName"),
    storeUUID: formData.get("storeUUID"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  try {
    await saveSettingsToDB(updatedSettings);
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};

export default function SettingsPage() {
  const settings = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [formData, setFormData] = useState<Settings>(settings);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (actionData) {
      setShowBanner(true);
    }
  }, [actionData]);

  const handleChange = (field: any) => (value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Page>
      <TitleBar title="Settings" />
      <Layout>
        <Layout.Section>
          {actionData && showBanner && (
            <div style={{ marginBottom: 16 }}>
              <Banner
                title={actionData.success ? "Success" : "Error"}
                tone={actionData.success ? "success" : "critical"}
                onDismiss={() => setShowBanner(false)}
              >
                {actionData.success
                  ? "Settings saved successfully"
                  : actionData.error || "Failed to save settings"}
              </Banner>
            </div>
          )}
          <Card>
            <BlockStack gap="400">
              <Form method="post">
                <input
                  type="hidden"
                  name="isEnabled"
                  value={formData.isEnabled.toString()}
                />
                <Checkbox
                  label="Enable Sync"
                  checked={formData.isEnabled}
                  onChange={handleChange("isEnabled")}
                />
                <FormLayout>
                  <TextField
                    label="Customer name (Company name)"
                    autoComplete="off"
                    value={formData.customerName}
                    onChange={handleChange("customerName")}
                    name="customerName"
                  />
                  <TextField
                    label="Store UUID"
                    autoComplete="off"
                    value={formData.storeUUID}
                    onChange={handleChange("storeUUID")}
                    name="storeUUID"
                  />
                  <TextField
                    label="Username"
                    autoComplete="off"
                    value={formData.username}
                    onChange={handleChange("username")}
                    name="username"
                  />
                  <TextField
                    label="Password"
                    type="password"
                    autoComplete="off"
                    value={formData.password}
                    onChange={handleChange("password")}
                    name="password"
                  />

                  <Button fullWidth submit>
                    Save
                  </Button>
                </FormLayout>
              </Form>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

async function getSettingsFromDB(shopName: string) {
  const settings = await prisma.settings.findUnique({ where: { shopName } });
  return (
    settings || {
      shopName,
      isEnabled: false,
      customerName: "",
      storeUUID: "",
      username: "",
      password: "",
    }
  );
}

async function saveSettingsToDB(settings: any): Promise<void> {
  await prisma.settings.upsert({
    where: { shopName: settings.shopName },
    update: settings,
    create: settings,
  });
}
