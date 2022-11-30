import React from 'react';
import { Heading, SimpleGrid, Input } from '@chakra-ui/react';
import '../css.css';
import RecipeCard from '../components/RecipeCard';
import { api } from '../api';
import { Spinner } from '../components/Spinner';
import { Error } from '../components/Error';

const DEFAULT_STATE = {
  data: null,
  isLoading: false,
  isError: false,
};

export function RecipeListPage() {
  const [state, setState] = React.useState(DEFAULT_STATE);
  const [search, setSearch] = React.useState('');

  const onFetchError = (error) => {
    setState({
      data: null,
      isLoading: false,
      isError: true,
    });
    console.log('Some error appeared', error);
  };

  const onFetchSuccess = ({ data }) => {
    // console.log(data);
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

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Heading my={4} color="dodgerblue">
        Recepty od maminky
      </Heading>

      {state.isLoading && <Spinner />}
      {state.isError && <Error errorMessage="Problém s načítáním dat" />}

      <Input value={search} onChange={(e) => setSearch(e.target.value)} />

      <SimpleGrid
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
            <RecipeCard key={item._id} item={item} />
          ))}
      </SimpleGrid>
    </>
  );
}
