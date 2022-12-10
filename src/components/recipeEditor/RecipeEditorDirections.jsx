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
import { Link } from 'react-router-dom';

export default function RecipeEditorDirections({ state, updateRecipe }) {
  return (
    <Box>
      <Heading size={'sm'}>Postup:</Heading>
      <Textarea
        height={'400px'}
        resize={'none'}
        value={state.data.directions ? state.data.directions : ''}
        onChange={(e) => {
          updateRecipe('directions', e.target.value);
        }}
      />
      <Box textAlign={'right'}>
        <a
          color="blue"
          href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
        >
          Návod na Markdown
        </a>
      </Box>
    </Box>
  );
}
