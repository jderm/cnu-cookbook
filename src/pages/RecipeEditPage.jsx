import React from 'react';
import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Spinner } from '../components/Spinner';
import { Error } from '../components/Error';
import RecipeEditor from '../components/recipeEditor/RecipeEditor';
import { Link } from 'react-router-dom';

const DEFAULT_STATE = {
  data: null,
  isLoading: false,
  isError: false,
};

export function RecipeEditPage() {
  const { slug } = useParams();
  const toast = useToast();
  const [state, setState] = React.useState(DEFAULT_STATE);

  const onFetchError = (error) => {
    setState({
      data: null,
      isLoading: false,
      isError: true,
    });
    toast({
      title: `Vyskytla se chyba ` + error.response.status,
      position: 'top',
      isClosable: true,
      status: 'error',
      duration: 3000,
    });
    console.log(error);
  };

  const onFetchSuccess = ({ data }) => {
    setState({
      data: data,
      isLoading: false,
      isError: false,
    });
    document.title = data.title + ' - Albertovy recepty';
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

  const onUploadError = (error) => {
    console.log(error);
    toast({
      title: `Problém s úpravou receptu ` + error.response.status,
      position: 'top',
      isClosable: true,
      status: 'error',
      duration: 3000,
    });
  };

  const onUploadSuccess = () => {
    toast({
      title: `Recept byl úspěšně upraven`,
      position: 'top',
      isClosable: true,
      status: 'success',
      duration: 3000,
    });
  };

  const uploadUpdatedRecipe = () => {
    api
      .post(`recipes/${state.data._id}`, state.data)
      .then(onUploadSuccess)
      .catch(onUploadError);
  };

  const updateRecipe = (type, value) => {
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
  };

  return (
    <>
      {state.isLoading && <Spinner />}
      {state.isError && <Error errorMessage="Problém s načítáním dat" />}
      {state.data ? (
        <Box m={5}>
          <Box>
            <Flex width={'100%'}>
              <Button size={'lg'} m={'auto'} ml={0} colorScheme="blue">
                <Link to={`/recept/${slug}`}>Zpět </Link>
              </Button>
              <Button
                size={'lg'}
                m={'auto'}
                mr={0}
                onClick={uploadUpdatedRecipe}
                colorScheme="green"
                isDisabled={state.data.title ? false : true}
              >
                Upravit recept
              </Button>
            </Flex>
          </Box>
          <RecipeEditor
            state={state}
            setState={setState}
            updateRecipe={updateRecipe}
          />
        </Box>
      ) : null}
    </>
  );
}
