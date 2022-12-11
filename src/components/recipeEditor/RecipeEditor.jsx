import React from 'react';
import { Heading, SimpleGrid, Box } from '@chakra-ui/react';
import RecipeEditorInfo from './RecipeEditorInfo';
import RecipeEditorIngredients from './RecipeEditorIngredients';
import RecipeEditorDirections from './RecipeEditorDirections';
import RecipeEditorMarkdown from './RecipeEditorMarkdown';

export default function RecipeEditor({ state, updateRecipe, setState }) {
  return (
    <Box m={5}>
      <Heading mb={5}>{state.data.title}</Heading>
      <SimpleGrid columns={[1, 2, 3]} gap={10} ml={3} mr={3}>
        <RecipeEditorInfo state={state} updateRecipe={updateRecipe} />
        <RecipeEditorIngredients state={state} setState={setState} />
        <RecipeEditorDirections state={state} updateRecipe={updateRecipe} />
      </SimpleGrid>
      <RecipeEditorMarkdown state={state} />
    </Box>
  );
}
