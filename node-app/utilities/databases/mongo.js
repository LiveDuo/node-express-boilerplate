import mongo from 'mongodb'

const mongoClient = mongo.MongoClient

// user: process.env.MONGO_USER,
// pass: process.env.MONGO_PASSWORD,

const options = { useNewUrlParser: true, useUnifiedTopology: true }

let mongoDb

const connect = () => {
	return new Promise((resolve) => {
		setImmediate(() => {
			mongoClient.connect(process.env.MONGO_URL, options, (err, client) => {
				console.log('Mongo connected!')
				mongoDb = client.db()
				resolve(client)
			})
		})
	})
}

export { connect, mongoDb }