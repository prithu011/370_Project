const fs = require('fs')
const csv = require('csv-parser')
const mysql = require('mysql2')

// MySQL connection config
const connection = mysql.createConnection({
  host: 'JOKE143',
  port: 3306,
  user: 'root',
  password: 'brac1234@#',
  database: 'footballdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
})

// SQL insert function
const tableData = (array) => {
  const sql = `
    INSERT INTO Player (
      Cclub_id, name, agent_id, assists, player_trans_id, user_id,
      player_nationality, player_jersey, player_trophies, club_name,
      matches, foot, yellow_card, red_card, pen_goal, goals, age,
      market_value, position, contract_period, is_free_agent, image_url
    ) VALUES ?
  `
  connection.query(sql, [array], (err, results) => {
    if (err) throw err
    console.log('Data successfully inserted into the Player table.')
  })
}

// Function to populate table from CSV
function populateTableFromCSV(csvFilePath, tableData) {
  const rows = []

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      rows.push(row)
    })
    .on('end', () => {
      console.log('CSV file successfully processed.')

      const transformRows = (rows) => {
        let newArr = []
        for (let element of rows) {
          if (element) {
            const Player = element['Player']
            const age = parseInt(element['Age']) || null
            const nationality = element['Nationality']
            const club = element['Club']
            const market_value = element['Market value']
            const matches = parseInt(element['Matches']) || 0
            const goals = parseInt(element['Goals']) || 0
            const pens = parseInt(element['Pens']) || 0
            const assists = parseInt(element['Assists']) || 0
            const YC = parseInt(element['YC']) || 0
            const RC = parseInt(element['RC']) || 0
            const pos = element['pos']
            const trophies = parseInt(element['trophies']) || 0
            const contract_period = element['contract_period']
            const Free = element['Free']
            const image_url = element['image_url']
            const feet = element['feet']

            console.log([
              null,
              Player,
              null,
              assists,
              null,
              null,
              nationality,
              null,
              trophies,
              club,
              matches,
              feet,
              YC,
              RC,
              pens,
              goals,
              age,
              market_value,
              pos,
              contract_period,
              Free === 'true' || Free === 'TRUE',
              image_url,
            ])
            newArr.push([
              null,
              Player,
              null,
              assists,
              null,
              null,
              nationality,
              null,
              trophies,
              club,
              matches,
              feet,
              YC,
              RC,
              pens,
              goals,
              age,
              market_value,
              pos,
              contract_period,
              Free === 'true' || Free === 'TRUE',
              image_url,
            ])
          }
        }
        return newArr
      }

      // Connect to DB and insert
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL:', err)
          return
        }
        console.log('Connected to MySQL.')
        const changedArr = transformRows(rows)
        tableData(changedArr)
        connection.end()
      })
    })
}

// Usage
const csvFilePath =
  'D:/370_Project_Football/370_Project/server/Database/Table_populated/table_populated/cleaned_data_3.csv'

populateTableFromCSV(csvFilePath, tableData)
