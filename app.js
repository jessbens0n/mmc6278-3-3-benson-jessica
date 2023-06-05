require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const util = require('./util')
var cityInfo
var jobs

app.use(express.static('public'))
///////////
let getJobs = async() => {
    jobs = await util.getJobs;
}

let getCityInfo = async() => {
    cityInfo = await util.getCityInfo;
}
////////
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.js'))
})

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, './public/style.css'))
})

app.get('/api/city/:city', async (req, res) => {
    try {
        var cityInfo = await util.getCityInfo(req.params.city)
        var jobs = await util.getJobs(req.params.city)
        if (!cityInfo && !jobs){
            throw new Error
        }
        return res.status(200).json({
            cityInfo: cityInfo,
            jobs: jobs
        })
    }catch (err){
        res.status(404).json({
            error: err
        })
    }
    }
)
module.exports = app
