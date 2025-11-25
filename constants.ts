import { Product } from './types';

// Replace with the actual seller's number in production
export const SELLER_PHONE_NUMBER = '5491112345678'; 

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mate Imperial de Calabaza',
    description: 'Calabaza gruesa seleccionada, forrado en cuero vaqueta con virola de alpaca cincelada.',
    price: 45000,
    category: 'mate',
    image: 'https://picsum.photos/id/102/400/400',
  },
  {
    id: '2',
    name: 'Mate Camionero Premium',
    description: 'Boca ancha, ideal para yerbas compuestas. Cuero negro y virola de acero inoxidable.',
    price: 38000,
    category: 'mate',
    image: 'https://picsum.photos/id/108/400/400',
  },
  {
    id: '3',
    name: 'Mate Torpedo Cincelado',
    description: 'Forma ergonómica, cuero marrón rústico. Personalización de virola incluida.',
    price: 42000,
    category: 'mate',
    image: 'https://picsum.photos/id/111/400/400',
  },
  {
    id: '4',
    name: 'Bombilla Pico de Loro',
    description: 'Acero inoxidable 304. Filtro pala ranurado. No se tapa.',
    price: 12000,
    category: 'bombilla',
    image: 'https://picsum.photos/id/146/400/400',
  },
  {
    id: '5',
    name: 'Bombilla Alpaca Premium',
    description: 'Hecha a mano en alpaca. Detalles en bronce. Alta durabilidad.',
    price: 18500,
    category: 'bombilla',
    image: 'https://picsum.photos/id/175/400/400',
  },
  {
    id: '6',
    name: 'Chapita Identificadora Grabada',
    description: 'Chapita de alpaca o bronce con iniciales grabadas a láser para tu mate.',
    price: 5000,
    category: 'accesorio',
    image: 'https://picsum.photos/id/201/400/400',
  },
  {
    id: '7',
    name: 'Set Matero Completo',
    description: 'Incluye Mate Camionero, Bombilla Pico de Loro y Termo media manija.',
    price: 85000,
    category: 'set',
    image: 'https://picsum.photos/id/250/400/400',
  },
  {
    id: '8',
    name: 'Yerbera y Azucarera Cuero',
    description: 'Set de latas forradas en cuero ecológico haciendo juego con tu mate.',
    price: 15000,
    category: 'accesorio',
    image: 'https://picsum.photos/id/292/400/400',
  },
];