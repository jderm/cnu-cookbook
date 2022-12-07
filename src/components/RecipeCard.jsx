import {
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Image,
  Text,
  Stack,
  Box,
  Flex,
  Button,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiOutlineClockCircle, AiFillDelete } from 'react-icons/ai';
import { DeleteRecipeAlert } from './DeleteRecipeAlert';
import { LinkBox, LinkOverlay } from '@chakra-ui/react';

export default function RecipeCard({
  item: { title, preparationTime, slug, _id, ingredients },
  updateData,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatTime = () => {
    //let prepTime = '';
    let hours = Math.floor(preparationTime / 60);
    if (hours > 0) {
      let minutes = preparationTime - 60 * hours;
      let minutesText = minutes > 0 ? '& ' + minutes + 'min' : '';
      return hours + 'h ' + minutesText;
    } else {
      return preparationTime + 'min';
    }
  };

  return (
    <Card width={'400px'}>
      <LinkBox>
        <LinkOverlay href={`/recept/${slug}`}>
          <Image src="/images/food-placeholder.png"></Image>
          <CardFooter>
            <Stack width={'100%'}>
              <Text
                textOverflow={'ellipsis'}
                whiteSpace={'nowrap'}
                overflow={'hidden'}
              >
                {title}
              </Text>
              <Flex fontSize={'xs'}>
                <AiOutlineClockCircle style={{ height: 'inherit' }} />
                <Text>{formatTime()}</Text>
              </Flex>
              <Box
                width={'70%'}
                fontSize={'xs'}
                textOverflow={'ellipsis'}
                whiteSpace={'nowrap'}
                overflow={'hidden'}
              >
                {ingredients
                  ? ingredients.map((item) => <Text>{item}</Text>)
                  : null}
              </Box>
            </Stack>
          </CardFooter>
        </LinkOverlay>
      </LinkBox>
      {isOpen ? (
        <DeleteRecipeAlert
          isOpen={isOpen}
          onClose={onClose}
          receptId={_id}
          title={title}
          updateData={updateData}
        />
      ) : null}
      <IconButton
        colorScheme="red"
        position={'absolute'}
        top={0}
        right={0}
        onClick={onOpen}
        m={'auto'}
        mr={0}
        icon={<AiFillDelete />}
      />
    </Card>
  );
}
