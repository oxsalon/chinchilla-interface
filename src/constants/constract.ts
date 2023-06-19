const testNet = {
    tokenAddr: '0x427f850B3551700892295A6440150c7752E541ea', //web3
    depositAddr: '0x97129f27717348fb304e6557f4e1c290fc8992b8', //chef
    zyberAddr: '0x232D0d0b34483E4487F9C4b0fe4A0193E9529568', //pairweth
    sushiAddr: '0x232D0d0b34483E4487F9C4b0fe4A0193E9529568', //sushi
    wethAddr: '0x7CF31096E83546782802f094355f804F7dbE0752', //weth
    nftToken: '0x7A17A21eB8FfD6df5AEE7b554E61063Dc1545b90', //nft
    idoAddr: '0x2248Fa253A6240D7772e14593f1fED2f7732A045', //ido
}

const mainNet = {
    tokenAddr: '0xf7cFa236259B38d9646d541154CacD361C4C6CC5', //web3
    depositAddr: '0x93Db787b4376586d9a4Bd27F01a6B3cDd418c2FE', //chef
    zyberAddr: '0x5bcb14eeb3739a2140ea23535c96394597c85e82', //pairweth
    sushiAddr: '0x905dfCD5649217c42684f23958568e533C711Aa3', //sushi
    wethAddr: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', //weth
    nftToken: '0x7A17A21eB8FfD6df5AEE7b554E61063Dc1545b90', //nft
    idoAddr: '0x7490CDC9ead8A68508266CDD8A763589e27C2F38', //ido
}

let addr = testNet;

if(process.env.NEXT_PUBLIC_NODE_ENV === 'prod') {
    addr = mainNet;
}

export const depositAbi = [
    "function pendingReward(uint256, address) view returns (uint256)",
    "function deposit(uint256, uint256)",
    "function withdraw(uint256, uint256)",
    "function claim(uint256, address)",
    "function userInfo(uint256, address) view returns (uint256, uint256, uint256, uint256)",
];
export const tokenAbi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount)",
    "event Transfer(address indexed from, address indexed to, uint amount)",
    "function CARROTToFragment(uint256) view returns (uint256)",
]

export const nftAbi = [
    "function mint(uint256, bytes)",
    "function totalTickets() view returns (uint256)",
]

export const zyberAbi = [
    "function token0() view returns (address)",
    "function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
    "function approve(address, uint256)",
    "function allowance(address, address) view returns (uint256)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];

export const idoAbi = [{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenPrice","type":"uint256"},{"internalType":"uint256","name":"_totalTokenSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referee","type":"address"}],"name":"Referral","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"purchaser","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokenPurchase","type":"event"},{"inputs":[],"name":"REFERRAL_BONUS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenAmount","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"}],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"close","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getReferralStatus","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"open","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"setTokenPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newTotalTokenSupply","type":"uint256"}],"name":"setTotalTokenSupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensSold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokenSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawUnsoldTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}]

export const {tokenAddr, depositAddr, zyberAddr, sushiAddr, wethAddr, nftToken, idoAddr} = addr;