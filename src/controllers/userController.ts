import * as express from 'express';

const Web3 = require('web3');
const  web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/5e66f831443940ed88e9adca82578c2b'));

import TxModel from '../models/txModel';
import AuthService from './../service/authService'


class UserController {

    /*
        Description: "Fetching Block data of last 10000 blocks"
    */

    public async getBlockData() {

        try { 
            if (await TxModel.find().count() ) {
                console.log("Block Data already stored in DB.")
            }
            else {                
                console.log("Fetching block Data...........")
                let offset: Number = 5                                  // Number of blocks
                let latestBlock = await web3.eth.getBlockNumber()
                let data:any = await AuthService.blockData(latestBlock, offset)
        
                console.log("111", latestBlock, data.length )
                data.forEach(async block => {
                    block.transactions.forEach (async tx=> {
                        await TxModel.create(tx)
                    })
                });
                    // let data = await setInterval(async function() 
                    // {
                    //         for (i = latestBlock; i > j; i-- ) {
                    //             console.log("22222", latestBlock, j, i);
                    //             let b = await web3.eth.getBlock(i, true)
                    //             count = count+1
                    //             result.push(b)
                    //         }
                    //         latestBlock = j
                    //         j = j-50
                    //         if (count >= 1000) {
                    //             clearInterval(data)
                    //             return res.status(200).json({cnt: count, result: result})
                    //         }
                    // }, 1000)

                // getBlock
                // getBlockTransactionCount
                // getTransactionFromBlock

                console.log("Block Data stored in DB.")
                // return res.status(200).json({message: "Fetching Data....."})
        }
        } 
        catch (err) {
            console.log("err", err.message)
            // return res.status(500).json({"message":err})
        }
      
    }
    

    /**
     * @description fecthing Tx data for account addresses. 
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
    */

    public async getTxData (req: any, res: express.Response, next: express.NextFunction): Promise < any > {
       
        let add = '0x7DcEEEEa5eC9C9dD750d67B3309367431394227f'
        let data = await TxModel.find({ $or: [{from: add}, {to : add}] })        
        return res.status(200).json({data: data})
    } 



}

export default new UserController();