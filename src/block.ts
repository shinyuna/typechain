import * as CyptoJs from "crypto-js";

class Block {
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CyptoJs.SHA256(index + previousHash + timestamp + data).toString();

  static vaildateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "20202020", "", "Hello", 12345);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain,
  getLatestBlock = (): Block => blockchain[blockchain.length - 1],
  getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock(),
    newIndex: number = previousBlock.index + 1,
    newTimeStamp: number = getNewTimeStamp(),
    newHash: string = Block.calculateBlockHash(
      newIndex,
      previousBlock.hash,
      newTimeStamp,
      data
    ),
    newBlock: Block = new Block(
      newIndex,
      newHash,
      previousBlock.hash,
      data,
      newTimeStamp
    );

  addBlock(newBlock);

  return newBlock;
};

const getHashForBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );

const isBlockVaild = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.vaildateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockVaild(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("second block");
createNewBlock("thrid block");
createNewBlock("fourh block");

console.log("🚀", getBlockchain());

export {};

// 선언 헤 놓은 type과 속성이 같은 type은 에러가 나지 않음.
