import { MotorcyleProps } from '@/app/lib/definitions';
import { render, screen, waitFor } from '@testing-library/react';

import { Motorcycle } from './page';

jest.mock('../lib/data', () => ({
  convertCurrency: jest.fn().mockReturnValue('123.456'),
}));

describe('Motorcycles page', () => {
  const mockMotorcycle: MotorcyleProps = {
    name: 'Test Motorcycle',
    uuid: '123',
    categories: [{ name: 'Test Category' }],
    variants: [
      {
        prices: [{ amount: 123456 }],
        images: [{ url: '/test-image.jpg' }],
      },
    ],
  };

  test('renders motorcycle name correctly', () => {
    render(<Motorcycle {...mockMotorcycle} />);
    const nameElement = screen.queryByText('Test Motorcycle');
    expect(nameElement).toBeInTheDocument();
  });

  test('renders motorcycle price correctly', async () => {
    render(<Motorcycle {...mockMotorcycle} />);
    const priceElement = screen.queryByText('$123.456');
    expect(priceElement).toBeInTheDocument();

    await waitFor(
      () => {
        const priceElement = screen.getByText('$123.456');
        expect(priceElement).toBeInTheDocument();
      },
      {
        timeout: 3000,
      },
    );
  });

  test('renders motorcycle category correctly', () => {
    render(<Motorcycle {...mockMotorcycle} />);
    const categoryElement = screen.queryByText('Test Category');
    expect(categoryElement).toBeInTheDocument();
  });

  test('renders motorcycle image correctly', () => {
    render(<Motorcycle {...mockMotorcycle} />);
    const imageElement = screen.queryByAltText('Test Motorcycle');
    expect(imageElement).toBeInTheDocument();

    const src = imageElement?.getAttribute('src');

    expect(src).toContain('test-image.jpg');
  });
});
