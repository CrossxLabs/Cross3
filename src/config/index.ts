let title = 'Cross3',
  domains = {
    master: 'https://cross3.me',
    docs: 'https://docs.cross3.me',
    dev: 'https://dev.cross3.me',
    cdn: 'https://cdn.cross3.me',
    cdn_test: 'https://test-cdn.cross3.me',
  }

let mission = 'Onchain Social Layer for Web3 Crypto Portfolios'

const config = {
  title,
  titles: title.match(/[a-zA-Z]+|[0-9]+/g),
  mission,
  domains,
  host: 'cross3.me',
  prefix: 'cross3',
  themes: {
    primary: '#570DF8',
    success: '#09bf4b',
    accent: '#768cff',
    warning: '#f37e00',
    error: '#FD2929',
    secondary: '#F000B8',
    disabled: '#E6E8EC',
    light: '#fff',
    dark: '#000',
    backgroundImage: {
      'create-gradient-001': 'linear-gradient(90deg, #FC6D76 0%, #F320A2 100%)',
      'create-gradient-002': 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
      'create-gradient-003': 'linear-gradient(to right, #F82F9D 0%, #4510F3 100%)',
      'create-gradient-004': 'linear-gradient(135deg,#fc692a,#ffd800 26.04%,#72db5a 49.48%,#6dc4fe 75.52%,#cdb9fa)',
      'badge-gradient-001':
        'radial-gradient(111.89% 213.6% at 24.99% 43.36%, rgba(51, 71, 255, 0.4) 0%, rgba(223, 226, 255, 0.216) 74.98%, rgba(107, 122, 255, 0.4) 100%)',
      'badge-gradient-002': 'linear-gradient(138.43deg, #021918 -0.1%, rgba(40, 80, 225, 0.5) 162.62%)',
      'clip-gradient-001': 'linear-gradient(to right, #2a8af6 0%, #e92a67 100%)',
      'theconvo-gradient-001': "url('https://cdn.cross3.me/status/gradient.webp')",
    },
  },
  logo: {
    light: `${domains.cdn}/cross3/brand/logo/light.svg`,
    dark: `${domains.cdn}/cross3/brand/logo/dark.svg`,
    light_pro: `${domains.cdn}/cross3/brand/logo/light_pro.svg`,
    dark_pro: `${domains.cdn}/cross3/brand/logo/dark_pro.svg`,
  },
  images: {
    placeholder: 'https://picsum.photos/256/256/?blur=5',
    nft_placeholder: `${domains.cdn}/status/nft_placeholder.png`,
    banner: {
      cover: `${domains.cdn}/cross3/brand/banner/brand_banner_default.jpg`,
    },
  },
  footer: {
    links: [
      {
        menu: 'Resources',
        list: [
          {
            name: 'Docs',
          },
          {
            name: 'Brands',
          },
        ],
      },
      {
        menu: 'Governance',
        list: [
          {
            name: 'DAO',
          },
          {
            name: 'Feedback',
          },
        ],
      },
      {
        menu: 'Legal',
        list: [
          {
            name: 'Terms of Service',
            url: '/user/terms',
            target: '_blank',
          },
          {
            name: 'Privacy Policy',
            url: '/user/privacy',
            target: '_blank',
          },
        ],
      },
    ],
    media: [
      {
        icon: 'x',
        name: 'Twitter',
      },
      {
        icon: 'farcaster',
        name: 'Farcaster',
      },
      {
        icon: 'github',
        name: 'GitHub',
        url: '//github.com/CrossxLabs/Cross3',
      },
      {
        icon: 'discord',
        name: 'Discord',
      },
      {
        icon: 'telegram',
        name: 'Telegram',
      },
      {
        icon: 'email',
        name: 'Email',
        url: 'mailto:contact@cross3.me',
      },
    ],
  },
  organization: {
    name: 'CrossxLabs',
    url: 'https://github.com/CrossxLabs',
  },
}

export default config
