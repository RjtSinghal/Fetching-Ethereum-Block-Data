const Web3 = require('web3');
const  web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/5e66f831443940ed88e9adca82578c2b'));

class AuthService{

    public async blockData (blockNum, count) {

        return new Promise ((resolve, reject)=> {
            let block = blockNum
            let result:any = []
            let loop = async (block)=> {
                // console.log("11111111111", count)
                let temp : any = await web3.eth.getBlock( block, true)
                result.push(temp)
    
                if(count> 0) {
                    count--
                    block = block -1 
                    loop(block)
                }
                else {
                    resolve (result)
                }
            }
            
            if (count>0) {
                count--
                block = block -1 
                loop(block)
            }
            else {
                // console.log("result", result)
                resolve (result)
            }
        } )
            
    }


}

export default new AuthService();