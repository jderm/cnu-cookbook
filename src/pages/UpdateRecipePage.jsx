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
import RecipeEditor from '../components/RecipeEditor';

const DEFAULT_STATE = {
  data: null,
  isLoading: false,
  isError: false,
};

export function UpdateRecipePage() {
  const { slug } = useParams();
  const toast = useToast();
  const [state, setState] = React.useState(DEFAULT_STATE);
  const [newIngredient, setNewIngredient] = React.useState({
    name: '',
    amount: 1,
    amountUnit: '',
  });

  const onUploadError = (error) => {
    console.log('Error with uploading', error);
    toast({
      title: `Error with uploading`,
      position: 'top',
      isClosable: true,
      status: 'error',
      duration: 3000,
    });
  };

  const onUploadSuccess = () => {
    console.log('Updated successfully');
    toast({
      title: `Updated successfully`,
      position: 'top',
      isClosable: true,
      status: 'success',
      duration: 3000,
    });
  };

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

    // switch (type) {
    //   case 'title':
    //     setState({
    //       ...state,
    //       data: {
    //         ...state.data,
    //         title: value,
    //         slug: CreateSlug(value),
    //       },
    //     });
    //     break;

    //   case 'preparationTime':
    //     setState({
    //       ...state,
    //       data: {
    //         ...state.data,
    //         preparationTime: value,
    //       },
    //     });
    //     break;

    //   case 'sideDish':
    //     setState({
    //       ...state,
    //       data: {
    //         ...state.data,
    //         sideDish: value,
    //       },
    //     });
    //     break;

    //   case 'servingCount':
    //     setState({
    //       ...state,
    //       data: {
    //         ...state.data,
    //         servingCount: value,
    //       },
    //     });
    //     break;

    //   case 'directions':
    //     {
    //       // value !== ''
    //       //   ? setState({
    //       //       ...state,
    //       //       data: {
    //       //         ...state.data,
    //       //         directions: value,
    //       //       },
    //       //     })
    //       //   : setState({
    //       //       ...state,
    //       //       data: {
    //       //         ...state.data,
    //       //         directions: {delete state.data.directions},
    //       //       },
    //       //     });
    //       setState(() => {
    //         // 👇️ create copy of state object
    //         let copy = { ...state };

    //         // 👇️ remove salary key from object
    //         delete copy.data['directions'];

    //         return copy;
    //       });
    //     }
    //     break;

    //   default:
    //     break;
    // }
  }

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
              >
                Aktualizovat recept
              </Button>
            </Flex>
          </Box>
          {/* <Heading>{state.data.title}</Heading> */}
          <RecipeEditor
            state={state}
            newIngredient={newIngredient}
            updateRecipe={updateRecipe}
            deleteIngredient={deleteIngredient}
            addNewIngredient={addNewIngredient}
            newIngredientUpdate={newIngredientUpdate}
          />
          {/* <SimpleGrid minChildWidth="400px" gap={10} ml={3} mr={3}>
            <Box>
              <Heading size={'sm'}>Název:</Heading>
              <Input
                value={state.data.title}
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
                value={state.data.directions ? state.data.directions : ''}
                onChange={(e) => {
                  updateRecipe('directions', e.target.value);
                }}
              />
            </Box>
          </SimpleGrid> */}
        </Box>
      ) : null}
    </>
  );
}
