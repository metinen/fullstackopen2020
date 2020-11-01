import express from 'express'
import { validateInput, calculateBmi } from './bmiCalculator'
const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send("Hello Fullstack")
})

app.get('/bmi', (req, res) => {
    const { height, weight } = validateInput();
    res.json();
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})