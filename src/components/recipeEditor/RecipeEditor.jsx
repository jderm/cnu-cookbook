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
  Textarea,
  useToast,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { AiFillDelete } from 'react-icons/ai';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import RecipeEditorInfo from './RecipeEditorInfo';
import RecipeEditorIngredients from './RecipeEditorIngredients';
import RecipeEditorDirections from './RecipeEditorDirections';
import RecipeEditorMarkdown from './RecipeEditorMarkdown';

export default function RecipeEditor({
  state,
  newIngredient,
  updateRecipe,
  setState,
  deleteIngredient,
  addNewIngredient,
  newIngredientUpdate,
}) {
  return (
    <Box m={5}>
      <Heading mb={5}>{state.data.title}</Heading>
      <SimpleGrid
        // columns={3}
        // minChildWidth="400px"
        columns={[1, 2, 3]}
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
        <RecipeEditorDirections state={state} updateRecipe={updateRecipe} />
        <RecipeEditorMarkdown state={state} />
      </SimpleGrid>
    </Box>
  );
}
