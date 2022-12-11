import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Box,
  Button,
  useToast,
} from '@chakra-ui/react';

import { api } from '../api';
import RecipeEditor from './recipeEditor/RecipeEditor';

const DEFAULT_STATE = {
  data: {
    title: 'Jméno',
    preparationTime: 1,
    servingCount: 0,
    ingredients: [],
  },
  isLoading: false,
  isError: false,
};

export function NewRecipeModal({ isOpen, onClose, updateData }) {
  const toast = useToast();
  const [state, setState] = React.useState(DEFAULT_STATE);

  const onUploadError = (error) => {
    toast({
      title: `Vyskytla se chyba ` + error.response.status,
      position: 'top',
      isClosable: true,
      status: 'error',
      duration: 3000,
    });
    console.log(error);
  };

  const onUploadSuccess = () => {
    updateData({ type: 'new', recipe: state.data });
    toast({
      title: `Recept byl úspěšně vytvořen`,
      position: 'top',
      isClosable: true,
      status: 'success',
      duration: 3000,
    });
    onClose();
  };

  const uploadRecipe = () => {
    api.post('recipes', state.data).then(onUploadSuccess).catch(onUploadError);
  };

  const updateRecipe = (type, value) => {
    value !== ''
      ? setState({
          ...state,
          data: {
            ...state.data,
            [type]: value,
          },
        })
      : setState(() => {
          const copy = { ...state };
          delete copy.data[type];
          return copy;
        });
  };

  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} size={'2x1'}>
        <ModalOverlay />
        <ModalContent pt={5}>
          <RecipeEditor
            state={state}
            updateRecipe={updateRecipe}
            setState={setState}
          />
          <Box m={5}></Box>
          <ModalFooter>
            <Button onClick={onClose} mr={'5'} colorScheme="red">
              Zavřít
            </Button>
            <Button onClick={uploadRecipe} colorScheme="blue">
              Přidat recept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
