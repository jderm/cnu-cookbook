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

  // function updateRecipe(type, value) {
  //   {
  //     value !== ''
  //       ? setState({
  //           ...state,
  //           data: {
  //             ...state.data,
  //             [type]: value,
  //           },
  //         })
  //       : setState(() => {
  //           const copy = { ...state };
  //           delete copy.data[type];
  //           return copy;
  //         });
  //   }

  //   // switch (type) {
  //   //   case 'title':
  //   //     setState({
  //   //       ...state,
  //   //       data: {
  //   //         ...state.data,
  //   //         title: value,
  //   //         slug: CreateSlug(value),
  //   //       },
  //   //     });
  //   //     break;

  //   //   case 'preparationTime':
  //   //     setState({
  //   //       ...state,
  //   //       data: {
  //   //         ...state.data,
  //   //         preparationTime: value,
  //   //       },
  //   //     });
  //   //     break;

  //   //   case 'sideDish':
  //   //     setState({
  //   //       ...state,
  //   //       data: {
  //   //         ...state.data,
  //   //         sideDish: value,
  //   //       },
  //   //     });
  //   //     break;

  //   //   case 'servingCount':
  //   //     setState({
  //   //       ...state,
  //   //       data: {
  //   //         ...state.data,
  //   //         servingCount: value,
  //   //       },
  //   //     });
  //   //     break;

  //   //   case 'directions':
  //   //     {
  //   //       // value !== ''
  //   //       //   ? setState({
  //   //       //       ...state,
  //   //       //       data: {
  //   //       //         ...state.data,
  //   //       //         directions: value,
  //   //       //       },
  //   //       //     })
  //   //       //   : setState({
  //   //       //       ...state,
  //   //       //       data: {
  //   //       //         ...state.data,
  //   //       //         directions: {delete state.data.directions},
  //   //       //       },
  //   //       //     });
  //   //       setState(() => {
  //   //         // 👇️ create copy of state object
  //   //         let copy = { ...state };

  //   //         // 👇️ remove salary key from object
  //   //         delete copy.data['directions'];

  //   //         return copy;
  //   //       });
  //   //     }
  //   //     break;

  //   //   default:
  //   //     break;
  //   // }
  // }

  const formatTime = () => {
    //let prepTime = '';
    let hours = Math.floor(state.data.preparationTime / 60);
    if (hours > 0) {
      let minutes = state.data.preparationTime - 60 * hours;
      let minutesText = minutes > 0 ? '& ' + minutes + 'min' : '';
      return hours + 'h ' + minutesText;
    }
    // else {
    //   return state.data.preparationTime + 'min';
    // }
  };

  return (
    <>
      {state.isLoading && <Spinner />}
      {state.isError && <Error errorMessage="Problém s načítáním dat" />}
      {state.data ? (
        <Box m={10}>
          <Flex width="auto">
            <Button m={'auto'} mr={0} size={'lg'}>
              <Link to={`/updaterecipe/${slug}`}>Aktualizovat recept</Link>
            </Button>
          </Flex>
          <Heading mb={7}>{state.data.title}</Heading>
          <SimpleGrid minChildWidth="400px" gap={2}>
            <Box>
              <Heading size={'md'}>Doba přípravy: </Heading>
              <Text mb={5}>{state.data.preparationTime} min</Text>

              {state.data.ingredients > 0 ? (
                <>
                  <Heading size={'md'}>Ingredience:</Heading>
                  <OrderedList mb={5}>
                    {state.data.ingredients?.map((item) => (
                      <ListItem>
                        {item.amount}
                        {item.amountUnit} {item.name}
                      </ListItem>
                    ))}
                  </OrderedList>
                </>
              ) : (
                <Text color={'red.600'} mb={5}>
                  Žádné ingredience
                </Text>
              )}

              <Heading size={'md'}>Naposledy upraveno:</Heading>
              <Text>{formatDate(state.data.lastModifiedDate)}</Text>
            </Box>
            <Box>
              {state.data.directions ? (
                <>
                  <Heading size={'md'}>Postup:</Heading>
                  {state.data.directions.split('\n\n').map((line) => (
                    <Text whiteSpace={'pre-line'} mb={5}>
                      {' '}
                      {line}
                    </Text>
                  ))}
                </>
              ) : (
                <Text color={'red.600'}>Žádný postup</Text>
              )}
            </Box>
          </SimpleGrid>
        </Box>
      ) : null}
    </>
  );
}
