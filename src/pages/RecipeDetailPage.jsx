import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Spinner } from '../components/Spinner';
import { Error } from '../components/Error';
import {
  Button,
  Text,
  Flex,
  Heading,
  OrderedList,
  ListItem,
  Box,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const DEFAULT_STATE = {
  data: null,
  isLoading: false,
  isError: false,
};

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [state, setState] = useState(DEFAULT_STATE);

  const onFetchError = (error) => {
    console.log(error);
    setState({
      data: null,
      isLoading: false,
      isError: true,
    });
  };

  const onFetchSuccess = ({ data }) => {
    console.log('Data ', data);
    setState({
      data,
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
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

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

  return (
    <>
      {state.isLoading && <Spinner />}
      {state.isError && <Error errorMessage="Problém s načítáním dat" />}
      {state.data ? (
        <Box m={10}>
          <Flex width="auto">
            <Button m={'auto'} mr={0}>
              <Link to={`/updaterecipe/${slug}`}>Aktualizovat recept</Link>
            </Button>
          </Flex>
          <Heading mb={7}>{state.data.title}</Heading>
          <SimpleGrid minChildWidth="400px" gap={2} ml={5} mr={5}>
            <Box>
              <Heading size={'md'}>Doba přípravy: </Heading>
              <Text mb={5}> {state.data.preparationTime} min</Text>

              <Heading size={'md'}>Ingredience:</Heading>
              <OrderedList mb={5}>
                {state.data.ingredients?.map((item) => (
                  <ListItem>
                    {item.amount}
                    {item.amountUnit} {item.name}
                  </ListItem>
                ))}
              </OrderedList>
              <Heading size={'md'}>Naposledy upraveno:</Heading>
              <Text>{state.data.lastModifiedDate}</Text>
            </Box>
            <Box>
              <Heading size={'md'}>Postup:</Heading>
              <Text mb={5}> {state.data.directions}</Text>
            </Box>
          </SimpleGrid>
        </Box>
      ) : null}
    </>
  );
}
