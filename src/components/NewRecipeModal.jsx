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

const DEFAULT_STATE = {
  data: { title: '', preparationTime: 1, servingCount: 0, ingredients: [] },
  isLoading: false,
  isError: false,
};

export function NewRecipeModal({ isOpen, onClose, updateData }) {
  const toast = useToast();
  const [state, setState] = React.useState(DEFAULT_STATE);
  const [newIngredient, setNewIngredient] = React.useState({
    name: '',
    amount: 1,
    amountUnit: '',
  });
  function uploadRecipe() {
    api.post('recipes', state.data).then(onUploadSuccess).catch(onUploadError);
  }

  const onUploadError = (error) => {
    console.log('Error with creating', error);
    toast({
      title: `Error with creating`,
      position: 'top',
      isClosable: true,
      status: 'error',
      duration: 3000,
    });
  };

  const onUploadSuccess = () => {
    updateData('new', state.data);
    console.log('Created successfully');
    toast({
      title: `Created successfully`,
      position: 'top',
      isClosable: true,
      status: 'success',
      duration: 3000,
    });

    onClose();
  };
  //updateData('new', state.data);

  function deleteIngredient(ingredientId) {
    const newIngredients = state.data.ingredients.filter(
      (ingredient) => ingredient._id !== ingredientId,
    );
    setState({
      ...state,
      data: {
        ...state.data,
        ingredients: newIngredients,
      },
    });
  }

  function addNewIngredient() {
    const newIngredients = [...state.data.ingredients, newIngredient];
    setState({
      ...state,
      data: {
        ...state.data,
        ingredients: newIngredients,
      },
    });
  }

  function newIngredientUpdate(type, value) {
    setNewIngredient({
      ...newIngredient,
      [type]: value,
    });
  }

  function updateRecipe(type, value) {
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

  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size={'5x1'}>
        <ModalOverlay />
        <ModalContent pt={5}>
          {/* <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>fasdfasfasfas</Text>
          </ModalBody> */}
          <Box m={5}>
            {/* <Flex width={'100%'}>
              <Heading>{state.data.title ? state.data.title : ''}</Heading>
              <Button m={'auto'} mr={0} onClick={uploadUpdatedRecipe}>
                Aktualizovat recept
              </Button>
            </Flex> */}
            <Heading>{state.data.title}</Heading>
            <SimpleGrid minChildWidth="400px" gap={10} ml={3} mr={3}>
              <Box>
                <Heading size={'sm'}>Název:</Heading>
                <Input
                  value={state.data.title ? state.data.title : ''}
                  mb={10}
                  onChange={(e) => {
                    updateRecipe('title', e.target.value);
                  }}
                />
                <Heading size={'sm'}>Doba přípravy (v minutách):</Heading>
                <NumberInput
                  min={1}
                  mb={10}
                  value={
                    state.data.preparationTime ? state.data.preparationTime : 1
                  }
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
                <Heading size={'sm'}>Naposledy upraveno:</Heading>
                <Text>{state.data.lastModifiedDate}</Text>
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
                            </Td>{' '}
                            <Td>{item.name}</Td>
                            <Td>
                              {' '}
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
                  value={state.data.directions ? state.data.directions : ''}
                  onChange={(e) => {
                    updateRecipe('directions', e.target.value);
                  }}
                />
              </Box>
            </SimpleGrid>
          </Box>
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
