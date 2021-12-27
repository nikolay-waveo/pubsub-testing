import { Frame, Page, } from "@shopify/polaris";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Section from "../components/Section";
import List from "../components/List";

type TSubscription = {
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
  const [publishedTo, setPublishedTo] = useState<TSubscription['subscription'][]>([
    {storeURL: 'test', id: '000', status: 'pending'}
  ]);
  const [subscribedTo, setSubscribedTo] = useState<TSubscription['subscription'][]>([
    {storeURL: 'test', id: '000', status: 'pending'}
  ]);
  const [publishStatus, setPublishStatus] = useState(false)


  return (
    <Frame>
      <Page
        title="Store Product Sync"
        fullWidth={true}>
        <div className="grid grid-cols-1 gap-10 mb-20">
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
            <List 
              user={user}
              listType="publishTo"
              listText={{
                title: "Subscribers",
                description: "You can connect, disconnect and track subscriptions to your store.",
              }}
              list={publishedTo}
              listUpdateHandler={setPublishedTo}
              emptyListText={{
                title: "No subscribers yet",
                description: "Track user subscriptions to your store."
              }} />
          </Section>

          <Section 
            user={user}
            sectionTitle="Subscribe"
            sectionDescription="Subscribe to a published store and check on pending subscriptions.">
            <List 
              user={user}
              listType="subscribeTo"
              listText={{
                title: "Subscriptions",
                description: "A list of all of your subscriptions to other stores.",
              }}
              list={subscribedTo} 
              listUpdateHandler={setSubscribedTo}
              emptyListText={{
                title: "No subscriptions yet",
                description: "Track your subscriptions from stores."
              }} 
              canAddToList />
          </Section>
          
        </div>
      </Page>
    </Frame>
  )
}

export default Index;
