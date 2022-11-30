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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiOutlineClockCircle } from 'react-icons/ai';

export default function RecipeCard({ item: { title, preparationTime, slug } }) {
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
    <Card backgroundColor={clr}>
      <Link to={`/recept/${slug}`}>
        <Image src="/images/food-placeholder.png"></Image>
        <CardBody>
          <Stack>
            <Text>{title}</Text>
            <Flex>
              <AiOutlineClockCircle style={{ height: 'inherit' }} />
              <Text>{prepTime}</Text>
            </Flex>
          </Stack>
        </CardBody>
      </Link>
      <Button
        ml={'auto'}
        mt={'auto'}
        size={'xs'}
        onClick={() => console.log('lol')}
      >
        Delete
      </Button>
    </Card>
  );
}
