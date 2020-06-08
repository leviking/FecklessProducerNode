const Sequelize = require('sequelize');
const express   = require('express');
const cors      = require('cors')
const app       = express();
const port      = 3000;

app.use(cors())

const {
	prefix,
	token,
	db,
	dbUser,
	dbPass
      } = require('./config.json');

const sequelize = new Sequelize(db, dbUser, dbPass, {
	host: 'localhost',
	dialect: 'mariadb',
	logging: false
});

const RollCalls = sequelize.define('RollCalls', {
	guild: Sequelize.STRING,
	channel: Sequelize.STRING,
	channelName: Sequelize.STRING,
	user: Sequelize.STRING,
	nick: Sequelize.STRING,
	listened: Sequelize.BOOLEAN,
	duration: Sequelize.INTEGER,
	technicalDifficulty: Sequelize.BOOLEAN
})

app.get('/', async (req, res) => {
	let rolls = await RollCalls.findAll({
	  order: [['createdAt', 'ASC']]
	}).then(
	  result => res.json(result)
	)
  }
)

app.listen(port, () => console.log(`listening on port: ${port}`))
