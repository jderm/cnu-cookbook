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

  return (
    <>
      {state.isLoading && <Spinner />}
      {state.isError && <Error errorMessage="Problém s načítáním dat" />}
      {state.data ? (
        <>
          <Flex width="auto">
            <Button m={'auto'} mr={0}>
              <Link to={`/updaterecipe/${slug}`}>Aktualizovat recept</Link>
            </Button>
          </Flex>
          <Heading mb={3}>{state.data.title}</Heading>

          <Heading size={'md'}>Doba přípravy: </Heading>
          <Text mb={5}> {state.data.preparationTime} min</Text>

          <Heading size={'md'}>Postup:</Heading>
          <Text mb={5}> {state.data.directions}</Text>
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
        </>
      ) : null}
    </>
  );
}
