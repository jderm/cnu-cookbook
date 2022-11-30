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
  Flex,
  Stack,
} from '@chakra-ui/react';
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Spinner } from '../components/Spinner';
import { Error } from '../components/Error';

const DEFAULT_STATE = {
  data: null,
  isLoading: false,
  isError: false,
};

export function UpdateRecipePage() {
  const { slug } = useParams();
  const [state, setState] = React.useState(DEFAULT_STATE);

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

  function CreateSlug(name) {
    let slug = name.normalize('NFKD').replace(/[^\w]/g, '');
    return slug;
  }

  function updateRecipe(type, value) {
    switch (type) {
      case 'title':
        setState({
          ...state,
          data: {
            ...state.data,
            title: value,
            slug: CreateSlug(value),
          },
        });
        break;

      case 'preparationTime':
        setState({
          ...state,
          data: {
            ...state.data,
            preparationTime: value,
          },
        });
        break;

      case 'sideDish':
        setState({
          ...state,
          data: {
            ...state.data,
            sideDish: value,
          },
        });
        break;

      case 'servingCount':
        setState({
          ...state,
          data: {
            ...state.data,
            servingCount: value,
          },
        });
        break;

      default:
        break;
    }
  }

  function updateIngredients({ ingredient }) {}

  return (
    <>
      {state.isLoading && <Spinner />}
      {state.isError && <Error errorMessage="Problém s načítáním dat" />}
      {state.data ? (
        <Flex>
          <Stack width={'33.3%'}>
            <Heading>{state.data.title}</Heading>
            <Text>Název:</Text>
            <Input
              value={state.data.title}
              onChange={(e) => {
                updateRecipe('title', e.target.value);
              }}
            />
            {/* {state.data.preparationTime ? ( */}
            <>
              <Text>Doba přípravy (v minutách):</Text>
              <NumberInput
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
            </>
            {/* // ) : null} */}
            {/* {state.data.servingCount ? ( */}
            <>
              <Text>Počet porcí:</Text>
              <NumberInput
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
            </>
            {/* // ) : null} */}
            {/* {state.data.sideDish ? ( */}
            <>
              <Text>Přílohy:</Text>
              <Input
                value={state.data.sideDish ? state.data.sideDish : ''}
                onChange={(e) => {
                  updateRecipe('sideDish', e.target.value);
                }}
              />
            </>
            {/* ) : null} */}
            {/* {state.data.directions ? ( */}
            <>
              <Text>Postup:</Text>
              <Textarea
                height={'400px'}
                value={state.data.directions ? state.data.directions : ''}
              />
            </>
            {/* ) : null} */}
          </Stack>
        </Flex>
      ) : (
        <Error errorMessage="Problém s daty" />
      )}
    </>
  );
}
