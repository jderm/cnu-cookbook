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
import ReactMarkdown from 'react-markdown';

export default function RecipeEditorMarkdown({ state }) {
  return (
    <Box>
      <Heading size={'md'} mb={3}>
        Náhled postupu:
      </Heading>
      <Box ml={5}>
        <ReactMarkdown children={state.data.directions} />
      </Box>
    </Box>
  );
}
