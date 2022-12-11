import React from 'react';
import { Heading, Box, Flex, Textarea } from '@chakra-ui/react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

export default function RecipeEditorDirections({ state, updateRecipe }) {
  return (
    <Box>
      <Heading size={'sm'}>Postup:</Heading>
      <Textarea
        height={'400px'}
        resize={'none'}
        value={state.data.directions ? state.data.directions : ''}
        onChange={(e) => {
          updateRecipe('directions', e.target.value);
        }}
      />
      <Box textAlign={'right'}>
        <Flex>
          <Flex ml={'auto'}>
            <AiOutlineQuestionCircle style={{ height: 'inherit' }} />
            <a
              color="blue"
              href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
            >
              Návod na Markdown
            </a>
            <AiOutlineQuestionCircle style={{ height: 'inherit' }} />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
