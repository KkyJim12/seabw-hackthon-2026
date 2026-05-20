export const useMarketData = () => {
  const shops = [
    {
      id: 'bear-form',
      name: 'Bear Form',
      handle: '@bearform',
      category: 'Art Figures & Bearbrick',
      description: 'Authenticated Bearbrick 1000%, KAWS Companions, and curated designer figure drops with certificate of authenticity and serial verification.',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
      preorderCount: 14,
      auctionCount: 8,
      sales: '$3.6M'
    },
    {
      id: 'dial-edit',
      name: 'Dial Edit',
      handle: '@dialedit',
      category: 'AP, Omega & MoonSwatch',
      description: 'Audemars Piguet Royal Oak, Swatch × Omega MoonSwatch collab pieces, and investment-grade references direct from vetted authorized sources.',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80',
      preorderCount: 9,
      auctionCount: 11,
      sales: '$12.4M'
    },
    {
      id: 'supreme-hub',
      name: 'Supreme Hub',
      handle: '@supremehub',
      category: 'Supreme & Palace Drops',
      description: 'In-season Supreme New York and Palace Skateboards drops: box logos, accessories, and collaboration capsule pieces with full provenance documentation.',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&w=1200&q=80',
      preorderCount: 22,
      auctionCount: 4,
      sales: '$1.8M'
    },
    {
      id: 'fragment',
      name: 'Fragment',
      handle: '@fragmentdrops',
      category: 'Nike Collabs & Off-White',
      description: 'Travis Scott × Nike, Fragment × Jordan, Off-White Dunk, and Sacai collab sneakers — pre-authenticated pairs with original receipts and box.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      preorderCount: 16,
      auctionCount: 7,
      sales: '$2.3M'
    }
  ]

  const preorders = [
    {
      id: 'bearbrick-1000-kaws-bff-pastel',
      shopId: 'bear-form',
      title: 'Bearbrick 1000% KAWS BFF Pastel',
      maker: 'Bear Form',
      price: '$4,800',
      status: 'Ships Jul 18',
      progress: 82,
      reserved: 41,
      cap: 50,
      requirement: { kyc: true, x: true, minStake: 500 },
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'supreme-fw25-box-logo-hoodie-black',
      shopId: 'supreme-hub',
      title: 'Supreme FW25 Box Logo Hoodie Black',
      maker: 'Supreme Hub',
      price: '$188',
      status: 'Ships Aug 08',
      progress: 67,
      reserved: 268,
      cap: 400,
      requirement: { x: true },
      image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'moonwatch-omega-swatch-uranus',
      shopId: 'dial-edit',
      title: 'Swatch × Omega MoonSwatch Uranus',
      maker: 'Dial Edit',
      price: '$260',
      status: 'Ships Sep 05',
      progress: 45,
      reserved: 90,
      cap: 200,
      requirement: { kyc: true, minStake: 250 },
      image: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=1200&q=80'
    }
  ]

  const auctions = [
    {
      id: 'ap-royal-oak-15500st-blue-2023',
      shopId: 'dial-edit',
      title: 'AP Royal Oak 15500ST Blue Dial 2023',
      maker: 'Dial Edit',
      bid: '$89,200',
      status: '18m left',
      bidCount: 47,
      requirement: { kyc: true, x: true, minStake: 5000 },
      image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'kaws-companion-flayed-open-2024',
      shopId: 'bear-form',
      title: 'KAWS Companion Flayed Open Edition',
      maker: 'Bear Form',
      bid: '$3,200',
      status: '1h 24m left',
      bidCount: 58,
      requirement: { kyc: true },
      image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'supreme-cdg-box-logo-tee-ss22',
      shopId: 'supreme-hub',
      title: 'Supreme × CDG Box Logo Tee SS22',
      maker: 'Supreme Hub',
      bid: '$2,180',
      status: '2h 45m left',
      bidCount: 83,
      requirement: { x: true },
      image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80'
    }
  ]

  return { shops, preorders, auctions }
}
