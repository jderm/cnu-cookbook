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
  ListItem,
  Box,
  UnorderedList,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const DEFAULT_STATE = {
  data: null,
  isLoading: false,
  isError: false,
};

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [state, setState] = useState(DEFAULT_STATE);
  const [servCount, setServCount] = useState(1);
  const toast = useToast();

  const onFetchError = (error) => {
    console.log(error);
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
  };

  const onFetchSuccess = ({ data }) => {
    setState({
      data,
      isLoading: false,
      isError: false,
    });
    document.title = data.title + ' - Albertovy recepty';
    setServCount(data.servingCount ? data.servingCount : 1);
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
      if (a !== 0) {
        newDate += date2[a] + '. ';
      } else {
        newDate += date2[a];
      }
    }
    return newDate;
  };

  const detailInfo = (item) => {
    let text = '';
    if (state.data.servingCount) {
      if (item.amount) {
        text +=
          Math.abs(
            item.amount *
              (servCount /
                (state.data.servingCount ? state.data.servingCount : 1)),
          ) + ' ';
        if (item.amountUnit) {
          text += item.amountUnit + ' ';
        } else {
          text += ' ';
        }
      } else {
        text += ' ';
      }
    } else {
      if (item.amount) {
        text += item.amount + ' ';
        if (item.amountUnit) {
          text += item.amountUnit + ' ';
        } else {
          text += ' ';
        }
      } else {
        text += ' ';
      }
    }
    text += item.name;
    return text;
  };

  return (
    <>
      {state.isLoading && <Spinner />}
      {state.isError && <Error errorMessage="Problém s načítáním dat" />}
      {state.data ? (
        <Box m={5}>
          <Flex width="auto">
            <Button m={'auto'} mr={0} size={'lg'} colorScheme="blue">
              <Link to={`/recept/${slug}/update/`}>Upravit recept</Link>
            </Button>
          </Flex>
          <Heading mb={7}>{state.data.title}</Heading>
          <Flex flexFlow={'row wrap'}>
            <Box flex={'1 0 0%'} m={5}>
              <Heading size={'md'}>Doba přípravy: </Heading>
              <Text mb={5}>{state.data.preparationTime} min</Text>
              {state.data.servingCount ? (
                <>
                  <Heading size={'md'} mb={1}>
                    Počet porcí:
                  </Heading>
                  <NumberInput
                    min={1}
                    mb={5}
                    placeholder="Množství"
                    value={servCount}
                    onChange={(e) => {
                      setServCount(e);
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </>
              ) : null}
              {state.data.ingredients.length > 0 ? (
                <>
                  <Heading size={'md'}>Ingredience:</Heading>
                  <UnorderedList listStyleType="none" margin={0} mb={5}>
                    {state.data.ingredients?.map((item) => (
                      <ListItem
                        key={item._id}
                        p={1}
                        mb={3}
                        backgroundColor={
                          item.isGroup ? 'blackAlpha.200' : 'white'
                        }
                      >
                        {detailInfo(item)}
                      </ListItem>
                    ))}
                  </UnorderedList>
                </>
              ) : (
                <Text color={'red.600'} mb={5}>
                  Žádné ingredience
                </Text>
              )}

              {state.data.sideDish ? (
                <>
                  <Heading size={'md'}>Přílohy:</Heading>
                  <Text mb={5}>{state.data.sideDish}</Text>
                </>
              ) : (
                <Text mb={5} color={'red.600'}>
                  Žádné přílohy
                </Text>
              )}

              <Heading size={'md'}>Naposledy upraveno:</Heading>
              <Text>{formatDate(state.data.lastModifiedDate)}</Text>
            </Box>
            <Box flex={'3 0 0%'} m={5}>
              {state.data.directions ? (
                <>
                  <Heading size={'md'}>Postup:</Heading>
                  <Box mt={5}>
                    <ReactMarkdown children={state.data.directions} />
                  </Box>
                </>
              ) : (
                <Text color={'red.600'}>Žádný postup</Text>
              )}
            </Box>
          </Flex>
        </Box>
      ) : null}
    </>
  );
}
