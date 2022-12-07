import React from 'react';
import {
  SimpleGrid,
  Input,
  Button,
  Flex,
  Center,
  Box,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import '../css.css';
import RecipeCard from '../components/RecipeCard';
import { api } from '../api';
import { Spinner } from '../components/Spinner';
import { Error } from '../components/Error';
import { NewRecipeModal } from '../components/NewRecipeModal';

const DEFAULT_STATE = {
  data: null,
  isLoading: false,
  isError: false,
};

export function RecipeListPage() {
  const [state, setState] = React.useState(DEFAULT_STATE);
  const [search, setSearch] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onFetchError = (error) => {
    setState({
      data: null,
      isLoading: false,
      isError: true,
    });
    toast({
      title: `Error with deleting`,
      position: 'top',
      isClosable: true,
      status: 'error',
      duration: 3000,
    });
    console.log('Some error appeared', error);
  };

  const onFetchSuccess = ({ data }) => {
    //console.log(data);
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
    api.get('recipes').then(onFetchSuccess).catch(onFetchError);
  };

  const updateData = ({ type, receptId, recipe }) => {
    // console.log('hmmmmmmmmm');
    // console.log('Type', type);
    // console.log('Recipe', recipe);
    console.log(type, receptId, recipe);
    switch (type) {
      case 'update':
        fetchData();
        // const updatedData = state.data.filter(
        //   (recept) => recept._id !== receptId,
        // );
        // setState({
        //   data: updatedData,
        //   isLoading: false,
        //   isError: false,
        // });
        break;

      case 'new':
        fetchData();
        // console.log(recipe);
        // const newRecipe = [...state.data, recipe];
        // setState({
        //   ...state,
        //   data: {
        //     ...state.data,
        //     data: newRecipe,
        //   },
        // });
        // console.log(state.data);
        break;

      case 'delete':
        fetchData();
        // const newData = state.data.filter((recept) => recept._id !== receptId);
        // setState({
        //   data: newData,
        //   isLoading: false,
        //   isError: false,
        // });
        break;
    }
    // if (type === 'update') {
    //   const newData = state.data.filter((recept) => recept._id !== receptId);
    //   setState({
    //     data: newData,
    //     isLoading: false,
    //     isError: false,
    //   });
    //   console.log(newData);
    // } else if (type === 'new') {
    //   const newRecipes = [...state.data, recipe];
    //   setState({
    //     ...state,
    //     data: {
    //       ...state.data,
    //       ingredients: newRecipes,
    //     },
    //   });
    // } else if (type === 'delete') {
    //   const newData = state.data.filter((recept) => recept._id !== receptId);
    //   setState({
    //     data: newData,
    //     isLoading: false,
    //     isError: false,
    //   });
    // }
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <Box m={5}>
      {state.isLoading && <Spinner />}
      {state.isError && <Error errorMessage="Problém s načítáním dat" />}

      {state.data ? (
        <>
          <Flex width={'100%'} mb={5}>
            {/* <Input
              placeholder="Vyhledej recept"
              value={search}
              width={'100%'}
              size={'lg'}
              textAlign={'center'}
              onChange={(e) => setSearch(e.target.value)}
            /> */}
            <Button
              size={'lg'}
              m={'auto'}
              mr={0}
              onClick={onOpen}
              updateData={updateData}
            >
              Nový recept
            </Button>
          </Flex>
          <Center mb={5}>
            <Input
              placeholder="Vyhledej recept"
              value={search}
              width={'100%'}
              textAlign={'center'}
              size={'lg'}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Center>
          <SimpleGrid
            justifyItems={'center'}
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
          >
            {state.data
              ?.filter((item) => {
                return (
                  item.title.toLowerCase().includes(search.toLowerCase()) ||
                  search === ''
                );
              })
              .map((item) => (
                <RecipeCard
                  key={item._id}
                  item={item}
                  updateData={updateData}
                  ingredients={item.ingredients}
                />
              ))}
          </SimpleGrid>
          {isOpen ? (
            <NewRecipeModal
              isOpen={isOpen}
              onClose={onClose}
              updateData={updateData}
            />
          ) : null}
        </>
      ) : null}
    </Box>
  );
}
