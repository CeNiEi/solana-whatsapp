import dayjs from 'dayjs';

export class Chat {
    constructor(publicKey, accountData) {
        this.publicKey = publicKey;
        this.author = accountData.author;
        this.room = accountData.room;
        this.timestamp = accountData.timestamp;
        this.content = accountData.content;
    }
    get key() {
        return this.publicKey.toBase58();
    }
    get chat_author() {
        return this.author.toBase58();
    }
    get chat_content() {
        return this.content;
    }
    get created_at() {
        return dayjs.unix(this.timestamp).format('lll')
    }
    get created_ago() {
        return dayjs.unix(this.timestamp).fromNow()
    }
  
}