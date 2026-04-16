export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Ноутбук MacBook Pro 14"',
        description: 'Професійний ноутбук на базі процесора M3 Pro з дисплеєм Liquid Retina XDR.',
        price: 89999,
        imageUrl: 'https://picsum.photos/seed/1/200/200'
    },
    {
        id: '2',
        title: 'Смартфон iPhone 15 Pro',
        description: 'Флагманський смартфон з титановим корпусом та системою камер Pro.',
        price: 49999,
        imageUrl: 'https://picsum.photos/seed/2/200/200'
    },
    {
        id: '3',
        title: 'Навушники AirPods Pro 2',
        description: 'Бездротові навушники з активним шумозаглушенням та просторовим аудіо.',
        price: 11499,
        imageUrl: 'https://picsum.photos/seed/3/200/200'
    },
    {
        id: '4',
        title: 'Планшет iPad Air 5',
        description: 'Універсальний планшет на базі чипа M1 для роботи та творчості.',
        price: 27999,
        imageUrl: 'https://picsum.photos/seed/4/200/200'
    },
    {
        id: '5',
        title: 'Навушники AirPods Pro Pro 3',
        description: 'Бездротові нанонавушники з активним шумозаглушенням та просторовим аудіо.',
        price: 12499,
        imageUrl: 'https://picsum.photos/seed/5/200/200'
    },
    {
        id: '6',
        title: 'Планшет iPad Pro Air 6',
        description: 'Універсальний планшет на базі чипа M2 для роботи та творчості.',
        price: 28999,
        imageUrl: 'https://picsum.photos/seed/6/200/200'
    },
    {
        id: '7',
        title: 'Навушники Air Pro Pro 235',
        description: 'Бездротові нанонавушники з активним шумозаглушенням та просторовим аудіо.',
        price: 15499,
        imageUrl: 'https://picsum.photos/seed/7/200/200'
    },
    {
        id: '8',
        title: 'Планшет iPad Pros Air 6000',
        description: 'Універсальний планшет на базі чипа M2 для роботи та творчості.',
        price: 33999,
        imageUrl: 'https://picsum.photos/seed/8/200/200'
    }
];