import * as connections from '../config/connection';
import { Schema, Document } from 'mongoose';

export interface ITxModel extends Document {

    from: string;
    to: string;
    blockNumber: string;
    hash:string;                                                // tx hash
}

const TxSchema: Schema = new Schema({
    from: String,
    to: String,
    blockNumber: String,
    hash: String,
    
}, {
    collection: 'tx',
    versionKey: false
}).pre('save', function<ITxModel>(next) {
  
    next();
  }).pre('updateOne', function<ITxModel>(next) {
   
    next();
  }).index({from:1, to: 1});

export default connections.db.model < ITxModel >('TxModel', TxSchema);
