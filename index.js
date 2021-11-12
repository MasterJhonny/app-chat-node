const express = require('express');
const router = express.Router();

const app = express();
app.use(express.json());
app.use(router);

router.get('/message', (req, res) => {
    // console.log(req.query);
    const header = req.headers;
    console.log(header);
    res.header({
        "Otro-message":'Hola Mundillo feliz, sean muy felices',
        "Otro-cosa":'Estamos felices gracias a Dios',
        "Otro-message2":'A toda por la situacion'
    });
    res.send('list message');
})

router.post('/message', (req, res) => {
    const body = req.body;
    res.status(201).json([
        {
            name:'Carlos',
            message: 'hola como estas'
        },
        {
            name:'Carlos',
            message: 'hola como estas'
        },
        {
            name:'Juan',
            message: 'hola como estas'
        }
    ]);
})

router.use('/app', express.static('public'));

app.listen(3000, () => {
    console.log(`run http://localhost:3000`)
})