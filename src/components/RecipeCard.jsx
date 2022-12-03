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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { DeleteRecordModal } from './DeleteRecordModal';

export default function RecipeCard({ item: { title, preparationTime, slug } }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let clr = 'yellow';
  if (preparationTime >= 100) {
    clr = 'red';
  }

  let prepTime = '';
  let hours = Math.floor(preparationTime / 60);
  if (hours > 0) {
    let minutes = preparationTime - 60 * hours;
    let minutesText = minutes > 0 ? '& ' + minutes + 'min' : '';
    prepTime = hours + 'h ' + minutesText;
  } else {
    prepTime = preparationTime + 'min';
  }

  return (
    <Card backgroundColor={clr} width={'400px'}>
      {/* <CardBody> */}
      {/* <Flex> */}
      <Link to={`/recept/${slug}`}>
        <Image src="/images/food-placeholder.png"></Image>
      </Link>

      <CardFooter height={'100%'} width={'100%'}>
        <Link to={`/recept/${slug}`}>
          {/* <CardBody> */}
          <Stack height={'100%'}>
            <Text mb={'auto'}>{title}</Text>
            <Flex>
              <AiOutlineClockCircle style={{ height: 'inherit' }} />
              <Text mt={'auto'}>{prepTime}</Text>
            </Flex>
          </Stack>
          {/* </CardBody> */}
        </Link>

        <Button
          to={`/recept/${slug}`}
          ml={'auto'}
          mt={'auto'}
          mb={'auto'}
          size={'xs'}
          onClick={onOpen}
        >
          Delete
        </Button>
      </CardFooter>
      {isOpen ? <DeleteRecordModal isOpen={isOpen} onClose={onClose} /> : null}
    </Card>
  );
}
