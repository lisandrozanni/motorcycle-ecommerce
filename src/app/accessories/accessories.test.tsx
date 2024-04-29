import { AccessoryProps } from '@/app/lib/definitions';
import { render, screen } from '@testing-library/react';

import { Accessory } from './page';

describe('Accessories page', () => {
  const mockAccessory: AccessoryProps = {
    name: 'Test Accessory',
    uuid: '123',
    variants: [
      {
        prices: [{ amount: 123456 }],
        images: [{ url: '/test-image.jpg' }],
      },
    ],
  };

  test('renders accessory name correctly', () => {
    render(<Accessory {...mockAccessory} />);
    const nameElement = screen.getByText('Test Accessory');
    expect(nameElement).toBeInTheDocument();
  });

  test('renders accessory image correctly', () => {
    render(<Accessory {...mockAccessory} />);
    const imageElement = screen.queryByAltText('Test Accessory');
    expect(imageElement).toBeInTheDocument();

    const src = imageElement?.getAttribute('src');

    expect(src).toContain('test-image.jpg');
  });

  test('renders accessory price correctly', () => {
    render(<Accessory {...mockAccessory} />);
    const priceElement = screen.getByText('$123.456');
    expect(priceElement).toBeInTheDocument();
  });
});
