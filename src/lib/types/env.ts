export const env = {
  moralisKey: process.env.MORALIS_KEY,
  alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
  serverAlchemyId: process.env.SERVER_ALCHEMY_ID,
  rpc1Key: process.env.NEXT_PUBLIC_1RPC_KEY,
  thirdwebKey: process.env.NEXT_PUBLIC_THIRDWEB_API_KEY,
  dynamicConnectId: process.env.NEXT_PUBLIC_DYNAMIC_CONNECT_ID,
  officialEvmRecipient: process.env.NEXT_PUBLIC_OFFICIAL_EVM_RECEIPT,
  officialSolRecipient: process.env.NEXT_PUBLIC_OFFICIAL_SOL_RECEIPT,
  mockWalletAddress: process.env.NEXT_PUBLIC_LOCAL_MOCK_WALLET_ADDRESS,
  simplehashKey: process.env.SIMPLEHASH_KEY,
  awsCDN: process.env.NEXT_PUBLIC_AWS_CDN.endsWith('/')
    ? process.env.NEXT_PUBLIC_AWS_CDN
    : `${process.env.NEXT_PUBLIC_AWS_CDN}/`,
  poapAPIKey: process.env.POAP_API_KEY,
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  isProd: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || ['prod', 'pre'].includes(process.env.BRANCH_NAME),
  walletConnectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  iframelyKey: process.env.NEXT_PUBLIC_IFRAMELY_KEY,
  avatarTotal: Number(process.env.NEXT_PUBLIC_AVATAR_TOTAL),
}
