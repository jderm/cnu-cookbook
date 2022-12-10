import React from 'react';
import {
  Input,
  Text,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
  TableContainer,
  Thead,
  Td,
  Tr,
  Table,
  Tbody,
  Th,
  Box,
  IconButton,
  Button,
  Flex,
  Textarea,
  useToast,
  InputGroup,
  InputRightElement,
  OrderedList,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { AiFillDelete } from 'react-icons/ai';

const DEFAULT_INGREDIENT = {
  name: 'Název ingredience',
  amount: 1,
  amountUnit: '',
  isGroup: false,
};

export default function RecipeEditorIngredients({
  state,
  setState,
  // deleteIngredient,
  // newIngredientUpdate,
  // addNewIngredient,
  // newIngredient,
}) {
  const [ingredient, setIngredient] = React.useState(DEFAULT_INGREDIENT);
  const [groupName, setGroupName] = React.useState('');

  function deleteIngredient(ingredientId) {
    const newIngredients = state.data.ingredients.filter(
      (ingredient) => ingredient._id !== ingredientId,
    );
    setState({
      ...state,
      data: {
        ...state.data,
        ingredients: newIngredients,
      },
    });
  }

  function addNewIngredient() {
    const newIngredients = [...state.data.ingredients, ingredient];
    setState({
      ...state,
      data: {
        ...state.data,
        ingredients: newIngredients,
      },
    });
    setIngredient(DEFAULT_INGREDIENT);
  }

  function addNewGroup() {
    const newIngredients = [
      ...state.data.ingredients,
      { name: groupName, isGroup: true },
    ];
    setState({
      ...state,
      data: {
        ...state.data,
        ingredients: newIngredients,
      },
    });
    setIngredient(DEFAULT_INGREDIENT);
    setGroupName('');
  }

  function newIngredientUpdate(type, value) {
    setIngredient({
      ...ingredient,
      [type]: value,
    });
  }
  console.log(state);
  return (
    <Box>
      <Heading size={'sm'} mb={3}>
        Ingredience:
      </Heading>
      {state.data.ingredients ? (
        <UnorderedList
          listStyleType={'none'}
          maxHeight="350px"
          overflowY={'auto'}
          margin={0}
          mb={5}
        >
          {state.data.ingredients.map((item) => (
            <ListItem
              mb={3}
              display={'flex'}
              width={'100%'}
              backgroundColor={item.isGroup ? 'blackAlpha.200' : 'white'}
            >
              <Text flex={'1 1 0%;'} ml={1} mr={1} alignSelf="center">
                {item.amount}
              </Text>
              <Text flex={'1 1 0%;'} ml={1} mr={1} alignSelf="center">
                {' '}
                {item.amountUnit}
              </Text>
              <Text flex={'8 1 0%;'} ml={1} mr={1} alignSelf="center">
                {item.name}
              </Text>
              <IconButton
                colorScheme="red"
                onClick={() => deleteIngredient(item._id)}
                icon={<AiFillDelete />}
              />
            </ListItem>
          ))}
        </UnorderedList>
      ) : // <TableContainer overflowY={'auto'} maxHeight={'253px'} mb={5}>
      //   <Table maxWidth={'inherit'}>
      //     <Thead maxWidth={'inherit'}>
      //       <Tr>
      //         <Th>množství</Th>
      //         <Th>název</Th>
      //       </Tr>
      //     </Thead>
      //     <Tbody maxWidth={'inherit'}>
      //       {state.data.ingredients.map((item) => (
      //         <Tr>
      //           <Td>
      //             {item.amount} {item.amountUnit}
      //           </Td>
      //           <Td>{item.name}</Td>
      //           <Td>
      //             <IconButton
      //               colorScheme="red"
      //               onClick={() => deleteIngredient(item._id)}
      //               icon={<AiFillDelete />}
      //             />
      //           </Td>
      //         </Tr>
      //       ))}
      //     </Tbody>
      //   </Table>
      // </TableContainer>
      null}
      {/* <Heading size={'sm'}>Název:</Heading> */}
      {/* <InputGroup> */}
      <Flex mb={2}>
        <Input
          placeholder="Název ingredience"
          value={ingredient.name ? ingredient.name : 'Název ingredience'}
          onChange={(e) => {
            newIngredientUpdate('name', e.target.value);
          }}
        />
        <Button
          ml={'auto'}
          mr={'auto'}
          mt={0}
          onClick={addNewIngredient}
          colorScheme="blue"
        >
          Přidat
        </Button>
      </Flex>
      {/* <InputRightElement> */}

      {/* </InputRightElement>
      </InputGroup> */}
      <Flex mb={2}>
        {/* <Heading textAlign={'center'} size={'sm'}>
          Množství:
        </Heading> */}

        <NumberInput
          min={1}
          placeholder="Množství"
          value={ingredient.amount ? ingredient.amount : 1}
          onChange={(e) => {
            newIngredientUpdate('amount', e);
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {/* <Heading ml={7} size={'sm'}>
          Jednotka:
        </Heading> */}
        <Input
          placeholder="Jednotka"
          value={ingredient.amountUnit}
          onChange={(e) => {
            newIngredientUpdate('amountUnit', e.target.value);
          }}
        />
      </Flex>
      {/* <Box width={'100%'}>
        <Button
          ml={'auto'}
          mr={'auto'}
          mt={5}
          onClick={addNewIngredient}
          colorScheme="blue"
        >
          Přidat ingredienci
        </Button>
      </Box> */}
      <Flex mb={2}>
        <Input
          mb={2}
          placeholder="Nová skupina"
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
        <Button
          ml={'auto'}
          mr={'auto'}
          mt={0}
          onClick={addNewGroup}
          colorScheme="blue"
        >
          Přidat
        </Button>
      </Flex>
    </Box>
  );
}
