const calculateBmi = (height: number, weight: number, ): string => {
    if (weight === 0) {
        throw new Error("Weight should be over 0");
    }
    const bmi = weight / ((height * 0.01) ^ 2);

    switch (true) {
        case (bmi < 19):
            return "Underweight"
        case (bmi > 25):
            return "Overweight"
        default:
            return "Normal (healthy weight)"
    }
}

console.log(calculateBmi(180, 74));