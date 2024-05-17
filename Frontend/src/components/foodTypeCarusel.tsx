import { Carousel } from '@mantine/carousel';
import { cuisines } from '../utils/cuisines';


function FoodCuisines() {

    return (
        <div style={{ width: '100%', margin: '7px', border: '1px solid #ddd', padding: '8px' }}>
            <Carousel align="start" slideSize="5%" controlSize={1} loop withControls={false}>
                {cuisines.map((cuisine, index) => (
                    <Carousel.Slide key={index}>{cuisine}</Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
}

export default FoodCuisines;
