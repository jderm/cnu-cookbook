import { Alert, AlertIcon } from '@chakra-ui/react';

export const Error = ({ errorMessage }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      {errorMessage}
    </Alert>
  );
};
