import React from 'react';
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
} from '@chakra-ui/react';
import { Textarea, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Spinner } from '../components/Spinner';
import { Error } from '../components/Error';
import { AiFillDelete } from 'react-icons/ai';
import RecipeEditor from '../components/recipeEditor/RecipeEditor';

import RecipeEditorInfo from '../components/recipeEditor/RecipeEditorInfo';
import RecipeEditorIngredients from '../components/recipeEditor/RecipeEditorIngredients';
import RecipeEditorDirections from '../components/recipeEditor/RecipeEditorDirections';
import RecipeEditorMarkdown from '../components/recipeEditor/RecipeEditorMarkdown';

const DEFAULT_STATE = {
  data: null,
  isLoading: false,
  isError: false,
};

export function UpdateRecipePage() {
  const { slug } = useParams();
  const toast = useToast();
  const [state, setState] = React.useState(DEFAULT_STATE);
  // const [newIngredient, setNewIngredient] = React.useState({
  //   name: '',
  //   amount: 1,
  //   amountUnit: '',
  // });

  const onFetchError = (error) => {
    setState({
      data: null,
      isLoading: false,
      isError: true,
    });
    console.log('Some error appeared', error);
  };

  const onFetchSuccess = ({ data }) => {
    setState({
      data: data,
      isLoading: false,
      isError: false,
    });
  };

  const fetchData = () => {
    setState({
      data: null,
      isLoading: true,
      isError: false,
    });
    api
      .get('recipes/' + slug)
      .then(onFetchSuccess)
      .catch(onFetchError);
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const onUploadError = (error) => {
    console.log('Error with uploading', error);
    toast({
      title: `Problém s aktualizováním receptu`,
      position: 'top',
      isClosable: true,
      status: 'error',
      duration: 3000,
    });
  };

  const onUploadSuccess = () => {
    console.log('Updated successfully');
    toast({
      title: `Recept byl úspěšně aktualizován`,
      position: 'top',
      isClosable: true,
      status: 'success',
      duration: 3000,
    });
  };

  function uploadUpdatedRecipe() {
    api
      .post(`recipes/${state.data._id}`, state.data)
      .then(onUploadSuccess)
      .catch(onUploadError);
  }

  function updateRecipe(type, value) {
    {
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
    }
  }

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

  // function addNewIngredient() {
  //   const newIngredients = [...state.data.ingredients, newIngredient];
  //   setState({
  //     ...state,
  //     data: {
  //       ...state.data,
  //       ingredients: newIngredients,
  //     },
  //   });
  // }

  // function newIngredientUpdate(type, value) {
  //   setNewIngredient({
  //     ...newIngredient,
  //     [type]: value,
  //   });
  // }

  return (
    <>
      {state.isLoading && <Spinner />}
      {state.isError && <Error errorMessage="Problém s načítáním dat" />}
      {state.data ? (
        <Box m={5}>
          <Box>
            <Flex width={'100%'}>
              <Button
                size={'lg'}
                m={'auto'}
                mr={0}
                onClick={uploadUpdatedRecipe}
                colorScheme="green"
              >
                Aktualizovat recept
              </Button>
            </Flex>
          </Box>
          {/* <Heading>{state.data.title}</Heading> */}
          <RecipeEditor
            state={state}
            setState={setState}
            // newIngredient={newIngredient}
            updateRecipe={updateRecipe}
            // deleteIngredient={deleteIngredient}
            // addNewIngredient={addNewIngredient}
            // newIngredientUpdate={newIngredientUpdate}
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
                // deleteIngredient={deleteIngredient}
              />
              <RecipeEditorDirections
                state={state}
                updateRecipe={updateRecipe}
              />
              <RecipeEditorMarkdown state={state} />
            </SimpleGrid>
          </Box> */}
        </Box>
      ) : null}
    </>
  );
}
