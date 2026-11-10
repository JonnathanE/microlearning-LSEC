import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShowImage from './ShowImage';

let component

const image = {
    name: "test image",
    url: "http://image.com"
}

beforeEach(() => {
    component = render(
        <MemoryRouter>
            <ShowImage name={image.name} url={image.url} />
        </MemoryRouter>
    )
})

describe('<ShowImage />', () => {

    test('CP45 display image', () => {
        const img = component.getByAltText(image.name)
        expect(img.src).toContain(image.url);
    });

});