import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Spinner } from '../components/Spinner';
import { Error } from '../components/Error';

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

  console.log('Params', slug);
  return (
    <>
      {state.isLoading && <Spinner />}
      {state.isError && <Error errorMessage="Problém s načítáním dat" />}
      {state.data ? (
        <>
          <div>
            Název: <p>{state.data.title}</p>
          </div>
          <div>
            Doba přípravy: <p>{state.data.preparationTime}</p>
          </div>
          <div>
            Postup: <p>{state.data.directions}</p>
          </div>
          {/* {state.data.ingredients && <>{state.data.ingredients}</>} */}
          {state.data.ingredients?.map((item) => (
            <div>
              {item.amount} {item.amountUnit} {item.name}
            </div>
          ))}
        </>
      ) : null}
    </>
  );
}
