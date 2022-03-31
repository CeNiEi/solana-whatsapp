import dayjs from 'dayjs';
import { Chat } from './Chat';

export class Room {
    constructor(publicKey, accountData) {
        this.publicKey = publicKey;
        this.author = accountData.author;
        this.name = accountData.name;
        this.timestamp = accountData.timestamp.toString();
        this.description = accountData.description;
    }
    get key() {
        return this.publicKey.toBase58();
    }
    get raw_public_key() {
        return this.publicKey;
    }
    get group_name() {
        return this.name;
    }
    get created_at() {
        return dayjs.unix(this.timestamp).format('lll')
    }
    get group_description() {
        return this.description;
    }
    get created_ago() {
        return dayjs.unix(this.timestamp).fromNow()
    }
}