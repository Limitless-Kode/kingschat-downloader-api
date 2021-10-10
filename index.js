const { getImage, getVideo } = require('./helpers/Scapper');
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.post('/getImage', jsonParser, async (req, res)=>{
    const {url} = req.body;
    const image = await getImage(url);
    const response = {
        success: true,
        media: image
    };
    res.status(200).json(response);
})

app.post('/getVideo', jsonParser, async (req, res)=>{
    const {url} = req.body;
    const videos = await getVideo(url);
    const response = {
        success: true,
        media: videos
    };
    res.status(200).json(response);
})

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`App Listening on port ${port}`))
