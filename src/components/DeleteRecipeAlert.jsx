import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import { api } from '../api';

export function DeleteRecipeAlert({
  isOpen,
  onClose,
  receptId,
  title,
  updateData,
}) {
  const cancelRef = React.useRef();
  const toast = useToast();

  const onDeleteError = (error) => {
    console.log(error);
    toast({
      title: `Vyskytla se chyba ` + error.response.status,
      position: 'top',
      isClosable: true,
      status: 'error',
      duration: 3000,
    });
  };

  const onDeleteSuccess = () => {
    updateData({ type: 'delete', receptId: receptId });
    onClose();
    toast({
      title: `Recept byl úspěšně smazán`,
      position: 'top',
      isClosable: true,
      status: 'success',
      duration: 3000,
    });
  };

  const deleteRecord = () => {
    api
      .delete(`recipes/${receptId}`)
      .then(onDeleteSuccess)
      .catch(onDeleteError);
  };
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
