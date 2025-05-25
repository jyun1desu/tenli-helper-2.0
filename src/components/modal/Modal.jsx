"use client"

import { Button, Dialog, Portal, CloseButton } from "@chakra-ui/react"

const DemoModal = ({
  id,
  isOpen,
  setOpen,
  children,
  confirmText = '確定',
  cancelText = '取消',
  showCancelButton = true,
  title,
  onConfirm,
}) => {
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
                    <Button letterSpacing="1px" size="lg" variant="outline" color="content.tertiary" textStyle="lg">{cancelText}</Button>
                  </Dialog.ActionTrigger>
                ) : null
              }
              <Button
                letterSpacing="1px"
                size="lg"
                bg="bg.secondary"
                textStyle="lg"
                onClick={onConfirm}
              >{confirmText}</Button>
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


