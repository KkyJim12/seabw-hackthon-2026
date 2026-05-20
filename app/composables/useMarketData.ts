export const useMarketData = () => {
  const shops = [
    {
      id: 'maison-vault',
      name: 'Maison Vault',
      handle: '@maisonvault',
      category: 'Hermes and Chanel bags',
      description: 'Authenticated quota bags, classic flap releases, and private-client handbag allocations.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
      preorderCount: 18,
      auctionCount: 6,
      sales: '$4.2M'
    },
    {
      id: 'crown-time',
      name: 'Crown Time',
      handle: '@crowntime',
      category: 'Rolex and Patek watches',
      description: 'Investment-grade watches, full-set references, and rare dial variants for serious collectors.',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80',
      preorderCount: 11,
      auctionCount: 9,
      sales: '$8.7M'
    },
    {
      id: 'atelier-drip',
      name: 'Atelier Drip',
      handle: '@atelierdrip',
      category: 'Dior, LV, and Prada',
      description: 'Runway leather goods, limited sneakers, and seasonal luxury accessories with verified provenance.',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
      preorderCount: 15,
      auctionCount: 5,
      sales: '$2.9M'
    },
    {
      id: 'blue-chip-jewels',
      name: 'Blue Chip Jewels',
      handle: '@bluechipjewels',
      category: 'Cartier and Tiffany jewelry',
      description: 'Signed jewelry, diamond essentials, and rare archive pieces prepared for Base-native settlement.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
      preorderCount: 22,
      auctionCount: 12,
      sales: '$6.1M'
    }
  ]

  const preorders = [
    {
      id: 'hermes-birkin-25-gold-togo',
      shopId: 'maison-vault',
      title: 'Hermes Birkin 25 Gold Togo',
      maker: 'Maison Vault',
      price: '$28,500',
      status: 'Arrives Jul 12',
      progress: 78,
      reserved: 39,
      cap: 50,
      requirement: { kyc: true, x: true, minStake: 500 },
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'dior-b30-blue-drop',
      shopId: 'atelier-drip',
      title: 'Dior B30 Blue Drop',
      maker: 'Atelier Drip',
      price: '$1,180',
      status: 'Arrives Aug 04',
      progress: 61,
      reserved: 122,
      cap: 200,
      requirement: { x: true },
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'cartier-love-bracelet-white-gold',
      shopId: 'blue-chip-jewels',
      title: 'Cartier Love Bracelet White Gold',
      maker: 'Blue Chip Jewels',
      price: '$8,900',
      status: 'Arrives Aug 28',
      progress: 44,
      reserved: 22,
      cap: 50,
      requirement: { kyc: true, minStake: 250 },
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80'
    }
  ]

  const auctions = [
    {
      id: 'rolex-daytona-panda-116500ln',
      shopId: 'crown-time',
      title: 'Rolex Daytona Panda 116500LN',
      maker: 'Crown Time',
      bid: '$38,200',
      status: '18m left',
      bidCount: 42,
      requirement: { kyc: true, x: true, minStake: 1000 },
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'chanel-classic-flap-black-caviar',
      shopId: 'maison-vault',
      title: 'Chanel Classic Flap Caviar',
      maker: 'Maison Vault',
      bid: '$9,480',
      status: '1h 12m left',
      bidCount: 61,
      requirement: { kyc: true },
      image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'patek-nautilus-blue-dial',
      shopId: 'crown-time',
      title: 'Patek Philippe Nautilus Blue Dial',
      maker: 'Crown Time',
      bid: '$121,400',
      status: '2h 06m left',
      bidCount: 74,
      requirement: { kyc: true, x: true, minStake: 5000 },
      image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1200&q=80'
    }
  ]

  return { shops, preorders, auctions }
}
