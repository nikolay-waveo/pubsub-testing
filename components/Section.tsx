import { Heading, Layout, SettingToggle, TextContainer, TextStyle } from '@shopify/polaris';
// import { useSettings } from 'hooks/useSettings';
import React, { useCallback, useEffect, useState } from 'react';
import Modal from './Modal';
// import { ISection } from 'types';
// import CalloutCard from './CalloutCard';
// import Modal from './Modal';

interface ISection {
  user: string,
  sectionTitle: string,
  sectionDescription: string,
  publishStatus?: boolean,
  toggle?: boolean,
  toggleText?: 
    string | {
      title?: string, 
      content: string,
      destructive?: boolean,
    }[],
  enableModal?: boolean,
  children?: React.ReactNode,
}

const Section: React.FC<ISection> = ({
  user,
  sectionTitle,
  sectionDescription,
  publishStatus=true,
  toggle,
  toggleText,
  enableModal, 
  children
}) => {

  const [active, setActive] = useState(publishStatus)
  const [showDeactivationModal, setShowDeactivationModal] = useState(false)
  const [showCalloutCard, setShowCalloutCard] = useState(active)
  const [showCalloutCardModal, setShowCalloutCardModal] = useState(false)
  // const { useSETShopSettings: setSettings } = useSettings();

  useEffect(() => {
    setActive(publishStatus)
  }, [publishStatus])

  const handleDeactivatePublish = useCallback(
    () => {
      // setSettings(user, {
      //   publish: false
      // })
      setActive(false)
      setShowDeactivationModal(false)
    },
    [user],
  )

  const handleToggle = useCallback(() => {
    if(enableModal && active) {
      setShowDeactivationModal(true)
    }
    else {
      // setSettings(user, {
      //   publish: !active
      // })
      setActive(!active)
      setShowCalloutCard(!active)
    }  
  }, [active, enableModal, user]);

  const contentStatus = active ? 'Deactivate' : 'Activate';

  const toggleTextMarkup = () => {
    // If passed a string
    if(typeof toggleText == "string") return toggleText

    // If passed an array of objects
    const [activateText, deactivateText] = toggleText.map(({
      title,
      content,
      destructive,
    }, key) => {
      return (
        <TextContainer key={key}>
          { title && <Heading>{title}</Heading> }
          <p className={destructive ? "text-shopify-critical" : undefined}>
            {content}
          </p>
        </TextContainer>
      )
    })
 
    return (
      active
      ? activateText
      : deactivateText
    )
  }

  // ..............

  // const [toggleOn, setToggleOn] = useState(true)

  // ..............

  return (
    <Layout>
      <Layout.AnnotatedSection
        title={sectionTitle}
        description={sectionDescription} >

        { toggle &&
          <div className={active ? "mb-10" : undefined}>
            <SettingToggle
              action={{
                content: contentStatus,
                onAction: handleToggle,
              }}
              enabled={active}>
              { toggleTextMarkup() }
            </SettingToggle> 

            {/* { active && 
              showCalloutCard &&
              <CalloutCard 
                title="Get your store link"
                content="Share your store link with other businesses to allow them to subscribe to your store."
                illustrationSRC="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                primaryAction={{
                  content: 'Get store link',
                  onAction: () => setShowCalloutCardModal(true),
                }} 
                onDismiss={() => setShowCalloutCard(false)} /> } */}

            <Modal 
              title="Get your store link"
              content={
                <p>
                  Your store link is <TextStyle variation="strong">{user}</TextStyle>. 
                  Share it with others so that they can find and subscribe to your store.
                </p>
              }
              isModalOpen={showCalloutCardModal}
              modalHandler={setShowCalloutCardModal} 
              primaryAction={{
                actionText: "Copy Link",
                actionHandler: () => {
                  navigator.clipboard.writeText(user)
                  setShowCalloutCardModal(false)
                },
              }}
              secondaryActions={[
                {
                  actionText: "Cancel",
                  actionHandler: () => setShowCalloutCardModal(false),
                },
              ]}
              toast={{
                content: "Copied to clipboard",
                duration: 3000
              }} />

            <Modal
              title="Deactivate Publishing"
              content="Deactivating this setting will stop others from finding your store 
                and suspend all current subscriptions to you. Do you want to continue?" 
              isModalOpen={showDeactivationModal}
              modalHandler={setShowDeactivationModal} 
              primaryAction={{
                actionText: "Deactivate",
                actionHandler: handleDeactivatePublish,
                destructive: true
              }}
              secondaryActions={[
                {
                  actionText: "Cancel",
                  actionHandler: () => setShowDeactivationModal(false),
                },
              ]}
              toast={{
                content: "Publishing Disabled"
              }}
              />
          </div> }

        { active && <div className="col-span-2" > { children } </div> }
      </Layout.AnnotatedSection>
    </Layout>
  )
}

export default Section
