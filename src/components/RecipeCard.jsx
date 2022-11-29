import { Card, CardFooter, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ item: { title, preparationTime, slug } }) {
  var clr = 'yellow';
  if (preparationTime >= 100) {
    clr = 'red';
  }
  return (
    <Link to={`/recept/${slug}`}>
      <Card backgroundColor={clr}>
        <Image src="/images/food-placeholder.png"></Image>
        <CardFooter>
          <div>{title}</div>
          <div>{preparationTime}</div>
        </CardFooter>
      </Card>
    </Link>
  );
}
