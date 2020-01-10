import * as express from 'express';

import TxModel from '../models/txModel';
import AuthService from './../service/authService'

const Web3 = require('web3');
const  web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/5e66f831443940ed88e9adca82578c2b'));


class UserController {

    /** 
     * @description : "Fetching Block data of last 10000 blocks"
    */

    public async getBlockData() {

        try { 
            if (await TxModel.find().count() ) {
                console.log("Block Data already stored in DB.")
            }
            else {                
                console.log("Fetching block Data. . . ")
                let offset: Number = 10000                                // Number of blocks
                let latestBlock = await web3.eth.getBlockNumber()
                let data:any = await AuthService.blockData(latestBlock, offset)
        
                // console.log("111", latestBlock, data.length )
                data.forEach(async block => {
                    block.transactions.forEach (async tx=> {
                        await TxModel.create(tx)
                    })
                });
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

        try {
            // let add = '0x7DcEEEEa5eC9C9dD750d67B3309367431394227f'
            let add = req.query.address
            let data = await TxModel.find({ $or: [{from: add}, {to : add}] })        
            return res.status(200).json({data: data})

        }   catch (err) {
            return res.status(500).json({message: err.message})
        }
    
    } 

}


export default new UserController();