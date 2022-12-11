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
  Box,
  IconButton,
  Button,
  Flex,
  ListItem,
  UnorderedList,
  Divider,
} from '@chakra-ui/react';
import { AiFillDelete } from 'react-icons/ai';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

const DEFAULT_INGREDIENT = {
  name: '',
  amount: '',
  amountUnit: '',
  isGroup: false,
};

export default function RecipeEditorIngredients({ state, setState }) {
  const [ingredient, setIngredient] = React.useState(DEFAULT_INGREDIENT);
  const [groupName, setGroupName] = React.useState('');

  const deleteIngredient = (ingredientId) => {
    console.log(ingredientId);
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
  };

  const addNewIngredient = () => {
    const newIngredients = [...state.data.ingredients, ingredient];
    setState({
      ...state,
      data: {
        ...state.data,
        ingredients: newIngredients,
      },
    });
    setIngredient(DEFAULT_INGREDIENT);
  };

  const addNewGroup = () => {
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
  };

  const newIngredientUpdate = (type, value) => {
    setIngredient({
      ...ingredient,
      [type]: value,
    });
  };

  const SortableItem = SortableElement(({ value }) => (
    <ListItem
      className="ingrEditItem"
      display={'flex'}
      width={'100%'}
      userSelect="none"
      backgroundColor={value.isGroup ? 'blackAlpha.200' : 'white'}
    >
      <Text flex={'1 1 0%;'} ml={1} mr={1} alignSelf="center">
        {value.amount}
      </Text>
      <Text flex={'1 1 0%;'} ml={1} mr={1} alignSelf="center">
        {' '}
        {value.amountUnit}
      </Text>
      <Text flex={'8 1 0%;'} ml={1} mr={1} alignSelf="center">
        {value.name}
      </Text>
      <IconButton
        colorScheme="red"
        onClick={() => deleteIngredient(value._id)}
        icon={<AiFillDelete />}
      />
    </ListItem>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <UnorderedList
        listStyleType={'none'}
        maxHeight="350px"
        overflowY={'auto'}
        margin={0}
        mb={5}
      >
        {items.map((value, index) => (
          <>
            <SortableItem key={value._id} index={index} value={value} />
            <Divider />
          </>
        ))}
      </UnorderedList>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setState({
      ...state,
      data: {
        ...state.data,
        ingredients: arrayMoveImmutable(
          state.data.ingredients,
          oldIndex,
          newIndex,
        ),
      },
    });
  };
  return (
    <Box>
      <Heading size={'sm'} mb={3}>
        Ingredience:
      </Heading>
      {state.data.ingredients ? (
        <>
          <SortableList items={state.data.ingredients} onSortEnd={onSortEnd} />
        </>
      ) : null}
      <Flex mb={2}>
        <Input
          placeholder="Název ingredience"
          value={ingredient.name}
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
          isDisabled={ingredient.name === '' ? true : false}
        >
          Přidat
        </Button>
      </Flex>
      <Flex mb={2}>
        <NumberInput
          min={0}
          placeholder="Množství"
          value={ingredient.amount}
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
        <Input
          placeholder="Jednotka"
          value={ingredient.amountUnit}
          onChange={(e) => {
            newIngredientUpdate('amountUnit', e.target.value);
          }}
        />
      </Flex>
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
          isDisabled={groupName === '' ? true : false}
        >
          Přidat
        </Button>
      </Flex>
    </Box>
  );
}
