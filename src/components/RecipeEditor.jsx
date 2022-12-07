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

export default function RecipeEditor({
  state,
  newIngredient,
  updateRecipe,
  deleteIngredient,
  addNewIngredient,
  newIngredientUpdate,
}) {
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
    <Box m={5}>
      <Heading mb={5}>{state.data.title}</Heading>
      <SimpleGrid minChildWidth="400px" gap={10} ml={3} mr={3}>
        <Box>
          <Heading size={'sm'}>Název:</Heading>
          <Input
            value={state.data.title ? state.data.title : 'Jméno'}
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

        <Box>
          <Heading size={'sm'}>Ingredience:</Heading>
          {state.data.ingredients ? (
            <TableContainer overflowY={'auto'} maxHeight={'253px'}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>množství</Th>
                    <Th>název</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {state.data.ingredients.map((item) => (
                    <Tr>
                      <Td>
                        {item.amount} {item.amountUnit}
                      </Td>
                      <Td>{item.name}</Td>
                      <Td>
                        <IconButton
                          colorScheme="red"
                          onClick={() => deleteIngredient(item._id)}
                          icon={<AiFillDelete />}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : null}
          <Heading size={'sm'}>Název:</Heading>
          <Input
            mb={2}
            value={newIngredient.name}
            onChange={(e) => {
              newIngredientUpdate('name', e.target.value);
            }}
          />
          <Flex alignItems={'center'}>
            <Heading textAlign={'center'} size={'sm'}>
              Množství:
            </Heading>
            <NumberInput
              min={1}
              value={newIngredient.amount ? newIngredient.amount : 1}
              onChange={(e) => {
                newIngredientUpdate('amount', e);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Heading size={'sm'}>Jednotka:</Heading>
            <Input
              value={newIngredient.amountUnit}
              onChange={(e) => {
                newIngredientUpdate('amountUnit', e.target.value);
              }}
            />
          </Flex>
          <Button mt={5} onClick={addNewIngredient}>
            Přidat ingredienci
          </Button>
        </Box>
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
            <Link
              color="blue"
              href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
            >
              Návod na Markdown
            </Link>
          </Box>
        </Box>
        <Box>
          <Heading size={'md'} mb={3}>
            Postup:
          </Heading>
          <Box ml={5}>
            <ReactMarkdown children={state.data.directions} />
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
