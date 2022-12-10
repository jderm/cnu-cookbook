import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Box, Heading, Link, HStack, Flex } from '@chakra-ui/react';
import { GiKnifeFork } from 'react-icons/gi';
import { GiSpoon } from 'react-icons/gi';

export function AppHeader() {
  return (
    <Box
      as="header"
      h="100px"
      bg="gray.900"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading ml={8} color="white">
        <ReactRouterLink to="/">
          <Flex>
            <GiKnifeFork style={{ height: 'inherit' }} />
            Albertovy recepty
            <GiSpoon style={{ height: 'inherit' }} />
          </Flex>
        </ReactRouterLink>
      </Heading>
      <Box mr={4}>
        <HStack p={2} spacing={6}>
          <Link as={ReactRouterLink} to="/api-test">
            API TEST
          </Link>
          <Link as={ReactRouterLink} to="/">
            RECEPTY
          </Link>
        </HStack>
      </Box>
    </Box>
  );
}
