import { Spinner as ChakraSpinner, Center } from '@chakra-ui/react';

export const Spinner = () => {
  return (
    <Center>
      <ChakraSpinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};
