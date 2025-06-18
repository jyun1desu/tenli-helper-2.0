"use client"

import { Button, Dialog, Portal, CloseButton } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"


const DemoModal = ({
  id,
  isOpen,
  setOpen,
  children,
  confirmText,
  cancelText,
  showCancelButton = true,
  title,
  onConfirm,
}) => {
  const { t } = useTranslation('modal');

  return (
    <Dialog.Root
      id={id}
      size="lg"
      placement="center"
      motionPreset="slide-in-bottom"
      scrollBehavior="inside"
      open={isOpen}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content css={{ fontSize: 'xl', margin: '16px', color: 'content.primary', overflow: 'hidden' }}>
            <Dialog.Header css={{ bg: title ? 'bg.primary' : '', p: '4' }}>
              <Dialog.Title css={{
                fontWeight: 600,
                fontSize: '2xl',
                letterSpacing: '2px'
              }}>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body css={{ p: 4 }}>
              {children}
            </Dialog.Body>
            <Dialog.Footer css={{ p: 4, pt: 2 }}>
              {
                showCancelButton ? (
                  <Dialog.ActionTrigger asChild>
                    <Button letterSpacing="1px" size="lg" variant="outline" color="content.tertiary" textStyle="lg">{cancelText || t('cancel')}</Button>
                  </Dialog.ActionTrigger>
                ) : null
              }
              <Button
                letterSpacing="1px"
                size="lg"
                bg="bg.secondary"
                textStyle="lg"
                onClick={onConfirm}
              >{confirmText || t('confirm')}</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="lg" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DemoModal;


