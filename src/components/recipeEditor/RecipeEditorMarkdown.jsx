import React from 'react';
import { Heading, Box } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

export default function RecipeEditorMarkdown({ state }) {
  return (
    <Box>
      <Heading size={'md'} mb={3}>
        Náhled postupu:
      </Heading>
      <Box>
        <ReactMarkdown children={state.data.directions} />
      </Box>
    </Box>
  );
}
