import mongo from 'mongodb'

const mongoClient = mongo.MongoClient
// user: process.env.MONGO_USER,
// pass: process.env.MONGO_PASSWORD,

const options = { useNewUrlParser: true, useUnifiedTopology: true }

let mongoDb

const onConnect = (err, client) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(`Mongo connected!`)
}

// const connect = async () => await mongo.connect(process.env.MONGO_URL, options, onConnect)



const connect = () => {
    return new Promise((resolve, reject) => {
        setImmediate(() => {
            mongoClient.connect(process.env.MONGO_URL, options, (err, client) => {
                console.log('Mongo connected!')
                mongoDb = client.db()//.collection('users').insertOne({text: 'hello world'})
                resolve(client)
            })
        })
    })
}

// export const mongoClient = mongo.MongoClient
export { connect, mongoDb }