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

export default function RecipeEditorInfo({ state, updateRecipe }) {
  const formatDate = (isoDate) => {
    const date = isoDate.split('T');
    const date2 = date[0].split('-');
    let newDate = '';
    for (let a = 2; a >= 0; a--) {
      if (a != 0) {
        newDate += date2[a] + '. ';
      } else {
        newDate += date2[a];
      }
    }
    return newDate;
  };
  return (
    <Box>
      <Heading size={'sm'}>Název:</Heading>
      <Input
        isRequired
        value={state.data.title ? state.data.title : 'Název'}
        mb={10}
        onChange={(e) => {
          updateRecipe('title', e.target.value);
        }}
      />
      <Heading size={'sm'}>Doba přípravy (v minutách):</Heading>
      <NumberInput
        min={1}
        mb={10}
        value={state.data.preparationTime ? state.data.preparationTime : 1}
        onChange={(e) => {
          updateRecipe('preparationTime', e);
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Heading size={'sm'}>Počet porcí:</Heading>
      <NumberInput
        min={1}
        mb={10}
        value={state.data.servingCount ? state.data.servingCount : 1}
        onChange={(e) => {
          updateRecipe('servingCount', e);
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Heading size={'sm'}>Přílohy:</Heading>
      <Input
        mb={4}
        value={state.data.sideDish ? state.data.sideDish : ''}
        onChange={(e) => {
          updateRecipe('sideDish', e.target.value);
        }}
      />
      {state.data.lastModifiedDate && (
        <>
          <Heading size={'sm'}>Naposledy upraveno:</Heading>
          <Text>{formatDate(state.data.lastModifiedDate)}</Text>
        </>
      )}
    </Box>
  );
}
