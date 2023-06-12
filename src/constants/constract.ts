const testNet = {
    tokenAddr: '0x7CF31096E83546782802f094355f804F7dbE0752', //web3
    depositAddr: '0x97129f27717348fb304e6557f4e1c290fc8992b8', //chef
    zyberAddr: '0x232D0d0b34483E4487F9C4b0fe4A0193E9529568', //pairweth
    sushiAddr: '0x232D0d0b34483E4487F9C4b0fe4A0193E9529568', //sushi
    wethAddr: '0x7CF31096E83546782802f094355f804F7dbE0752', //weth
    nftToken: '0x7A17A21eB8FfD6df5AEE7b554E61063Dc1545b90', //nft
    idoAddr: '0xa585c72e18f7b98f354dac070f440ae8294f658f', //ido
}

const mainNet = {
    tokenAddr: '0x8418B8BFF5a9979e26091922bF8614b78e93c44B', //web3
    depositAddr: '0x93Db787b4376586d9a4Bd27F01a6B3cDd418c2FE', //chef
    zyberAddr: '0x5bcb14eeb3739a2140ea23535c96394597c85e82', //pairweth
    sushiAddr: '0x905dfCD5649217c42684f23958568e533C711Aa3', //sushi
    wethAddr: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', //weth
    nftToken: '0x7A17A21eB8FfD6df5AEE7b554E61063Dc1545b90', //nft
    idoAddr: '0xa585c72e18f7b98f354dac070f440ae8294f658f', //ido
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

export const idoAbi = [
    "function claim(address, uint256, address, uint256, AllowlistProof, calldata, bytes) view returns (uint256)"
]

export const {tokenAddr, depositAddr, zyberAddr, sushiAddr, wethAddr, nftToken, idoAddr} = addr;