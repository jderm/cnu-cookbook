import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import {
  Input,
  Text,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
  TableContainer,
  Thead,
  Td,
  Tr,
  Table,
  Tbody,
  Th,
  Box,
  IconButton,
  Button,
  Flex,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { AiFillDelete } from 'react-icons/ai';

import { api } from '../api';

import RecipeEditor from './recipeEditor/RecipeEditor';
import RecipeEditorInfo from './recipeEditor/RecipeEditorInfo';
import RecipeEditorIngredients from './recipeEditor/RecipeEditorIngredients';
import RecipeEditorDirections from './recipeEditor/RecipeEditorDirections';
import RecipeEditorMarkdown from './recipeEditor/RecipeEditorMarkdown';

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
  // const [newIngredient, setNewIngredient] = React.useState({
  //   name: '',
  //   amount: 1,
  //   amountUnit: '',
  // });

  const onUploadError = (error) => {
    console.log('Error with creating', error);
    toast({
      title: `Problém s vytvářením receptu`,
      position: 'top',
      isClosable: true,
      status: 'error',
      duration: 3000,
    });
  };

  const onUploadSuccess = () => {
    updateData({ type: 'new', recipe: state.data });
    //console.log('Created successfully');
    toast({
      title: `Recept byl úspěšně vytvořen`,
      position: 'top',
      isClosable: true,
      status: 'success',
      duration: 3000,
    });

    onClose();
  };

  function uploadRecipe() {
    api.post('recipes', state.data).then(onUploadSuccess).catch(onUploadError);
  }

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

  // function deleteIngredient(ingredientId) {
  //   const newIngredients = state.data.ingredients.filter(
  //     (ingredient) => ingredient._id !== ingredientId,
  //   );
  //   setState({
  //     ...state,
  //     data: {
  //       ...state.data,
  //       ingredients: newIngredients,
  //     },
  //   });
  // }

  // const addNewIngredient = () => {
  //   const newIngredients = [...state.data.ingredients, newIngredient];
  //   setState({
  //     ...state,
  //     data: {
  //       ...state.data,
  //       ingredients: newIngredients,
  //     },
  //   });
  // };

  // const newIngredientUpdate = (type, value) => {
  //   setNewIngredient({
  //     ...newIngredient,
  //     [type]: value,
  //   });
  // };

  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} size={'2x1'}>
        <ModalOverlay />
        <ModalContent pt={5}>
          <RecipeEditor
            state={state}
            // newIngredient={newIngredient}
            updateRecipe={updateRecipe}
            setState={setState}
            //   deleteIngredient={deleteIngredient}
            //   addNewIngredient={addNewIngredient}
            //   newIngredientUpdate={newIngredientUpdate}
            //
          />

          {/* <Box m={5}>
            <Heading mb={5}>{state.data.title}</Heading>
            <SimpleGrid
              // columns={3}
              minChildWidth="500px"
              gap={10}
              ml={3}
              mr={3}
            >
              <RecipeEditorInfo state={state} updateRecipe={updateRecipe} />
              <RecipeEditorIngredients
                state={state}
                setState={setState}
                // newIngredient={newIngredient}
                // newIngredientUpdate={newIngredientUpdate}
                // addNewIngredient={addNewIngredient}
              />
              <RecipeEditorDirections
                state={state}
                updateRecipe={updateRecipe}
              />
              <RecipeEditorMarkdown state={state} />
            </SimpleGrid>
          </Box> */}

          <Box m={5}></Box>
          <ModalFooter>
            <Button onClick={onClose} mr={'5'}>
              Zavřít
            </Button>
            <Button onClick={uploadRecipe}>Přidat recept</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
