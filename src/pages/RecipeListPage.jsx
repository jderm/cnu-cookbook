import React from 'react';
import {
  SimpleGrid,
  Input,
  Button,
  Flex,
  Center,
  Box,
  useDisclosure,
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

  const onFetchError = (error) => {
    setState({
      data: null,
      isLoading: false,
      isError: true,
    });
    console.log('Some error appeared', error);
  };

  const onFetchSuccess = ({ data }) => {
    console.log(data);
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

  function updateData({ type, receptId, recipe }) {
    console.log('Type', type);
    console.log('Recipe', recipe);
    if (type === 'update') {
      const newData = state.data.filter((recept) => recept._id !== receptId);
      setState({
        data: newData,
        isLoading: false,
        isError: false,
      });
      console.log(newData);
    } else if (type === 'new') {
      const newRecipes = [...state.data, recipe];
      setState({
        ...state,
        data: {
          ...state.data,
          ingredients: newRecipes,
        },
      });
    } else if (type === 'delete') {
      const newData = state.data.filter((recept) => recept._id !== receptId);
      setState({
        data: newData,
        isLoading: false,
        isError: false,
      });
    }
  }

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <Box m={10}>
      {state.isLoading && <Spinner />}
      {state.isError && <Error errorMessage="Problém s načítáním dat" />}

      <Center mb={5}>
        <Input
          placeholder="Vyhledej recept"
          value={search}
          width={'80%'}
          size={'lg'}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Center>

      <Flex width={'100%'} mb={5}>
        <Button m={'auto'} mr={0} onClick={onOpen} updateData={updateData}>
          Nový recept
        </Button>
      </Flex>

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
    </Box>
  );
}
