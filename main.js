const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index
        this.timestamp = timestamp 
        this.data = data
        this.previousHash = previousHash
        this.calculateHash()
    }
    
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}


class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
    }
    
    createGenesisBlock(){
        return new Block(0,'01/01/2021','this is the genesis block','0')
    }
    
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }
    
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock)
    }
    
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]
            
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false
            }
            
            if(currentBlock.previousHash !== previousBlock.hash){
                return false
            }
        }
        return true
    }
}

let kwartaPadala =new BlockChain()

kwartaPadala.addBlock(new Block(1,'02/02/2021',{
    amount : 500
}))

kwartaPadala.addBlock(new Block(1,'02/03/2021',{
    amount : 540
}))

kwartaPadala.addBlock(new Block(1,'02/04/2021',{
    amount : 530
}))

kwartaPadala.addBlock(new Block(1,'02/05/2021',{
    amount : 590
}))


console.log(JSON.stringify(kwartaPadala,null,4))

console.log(kwartaPadala.isChainValid())
