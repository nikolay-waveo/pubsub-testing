import { Heading, Page, Subheading } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Section from "../components/Section";

type ISubscription = {
  subscription: {
    storeURL: string,
    id: string,
    status: string,
  },
}

const Index: React.FC = () => {
  const router = useRouter()
  const shop = router.query.shop as string

  const [user, setUser] = useState(shop)
  const [publishedTo, setPublishedTo] = useState<ISubscription['subscription'][]>([]);
  const [subscribedTo, setSubscribedTo] = useState<ISubscription['subscription'][]>([]);
  const [publishStatus, setPublishStatus] = useState(false)


  return (
    <Page
      title="Store Product Sync"
      fullWidth={true}>
      <div>
        <Section 
          user={user}
          sectionTitle="Publish"
          sectionDescription="See which stores are subscribed to you."
          toggle 
          toggleText={[
            {
              title: "Disable Publishing",
              content: "Stop others from finding your store and suspend all currently subscribed stores.",
              destructive: true,
            },
            {
              title: "Enable Publishing",
              content: "Allow others to find and subscribe to your store.",
            }]}
          publishStatus={publishStatus} 
          enableModal={publishedTo.length > 0} >
            test
          </Section>

          <Section 
            user={user}
            sectionTitle="Subscribe"
            sectionDescription="Subscribe to a published store and check on pending subscriptions.">
              
          </Section>
        
      </div>
    </Page>
  )
}

export default Index;
