export const testChain = 421613;
export const mainChain = 42161;

let supportChain: number = testChain;


if(process.env.NEXT_PUBLIC_NODE_ENV === 'prod') {
    supportChain = mainChain;
}


export {supportChain};