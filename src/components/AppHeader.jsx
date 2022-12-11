import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { GiKnifeFork } from 'react-icons/gi';
import { GiSpoon } from 'react-icons/gi';

export function AppHeader() {
  return (
    <Box
      as="header"
      h="100px"
      bg="#242424"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading color="white" ml={'auto'} mr="auto">
        <ReactRouterLink to="/">
          <Flex>
            <GiKnifeFork style={{ height: 'inherit' }} />
            Albertovy recepty
            <GiSpoon style={{ height: 'inherit' }} />
          </Flex>
        </ReactRouterLink>
      </Heading>
    </Box>
  );
}
