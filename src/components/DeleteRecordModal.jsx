import React from 'react';
import {
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { api } from '../api';
// import { useDisclosure } from 'react-use-disclosure';

export function DeleteRecordModal({ isOpen, onClose, recordId }) {
  // const { isOpen, onOpen, onClose } = useDisclosure(onOpen);

  function deleteRecord(recordId) {
    onClose();
  }
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure you want to delete this record?</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" onClick={() => deleteRecord(recordId)}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
