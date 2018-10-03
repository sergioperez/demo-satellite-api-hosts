import fetch from 'node-fetch'
import express from 'express'

const app = express()
app.set('view engine', 'ejs')

const SATELLITE_URL=process.argv[2]
const CREDENTIALS=process.argv[3]

// Ignore the self-signed certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function getSatelliteHosts() {
  const init = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Basic ${CREDENTIALS}`,
      'Content-Type': 'application/json,version=2',
    },
  }
  const data = await fetch(`${SATELLITE_URL}/api/v2/hosts` , init)  
  return (await data.json()).results
}

app.get('/', async (req, res) => {
  const hosts = await getSatelliteHosts()
  if(!hosts) {
    res.send("Error: Probably bad credentials")
  }
  res.render('index', {
    hosts: hosts
  })
})

app.listen(8000, async () => {
  console.log("Listening on port 8000")
  const hosts = await getSatelliteHosts()
})
