import React from 'react';
import { Button, useToast } from '@chakra-ui/react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import { api } from '../api';

export function DeleteRecipeAlert({
  isOpen,
  onClose,
  receptId,
  title,
  upData,
}) {
  const cancelRef = React.useRef();
  const toast = useToast();
  console.log(receptId);

  const onDeleteError = (error) => {
    console.log('Some error appeared', error);
    toast({
      title: `Error with deleting`,
      position: 'top',
      isClosable: true,
      status: 'error',
      duration: 3000,
    });
  };

  const onDeleteSuccess = () => {
    upData();
    onClose();
    console.log('Succesfully deleted');
    toast({
      title: `Succesfully deleted`,
      position: 'top',
      isClosable: true,
      status: 'success',
      duration: 3000,
    });
  };

  function deleteRecord() {
    api
      .delete(`recipes/${receptId}`)
      .then(onDeleteSuccess)
      .catch(onDeleteError);
  }
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Smazat recept</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Opravdu chcete smazat recept {title}?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Ne
            </Button>
            <Button colorScheme="red" ml={3} onClick={deleteRecord}>
              Ano
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
