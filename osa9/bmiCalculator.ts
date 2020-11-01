export const calculateBmi = (height: number, weight: number, ): string => {
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

interface bmiInput {
    height: number,
    weight: number
}

export const validateInput = (args: Array<string>): bmiInput => {
    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (args.length > 4) throw new Error("Too many arguments");
    if (args.length < 4) throw new Error("Too few arguments");

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height, weight
        }
    } else {
        throw new Error("You didn't provide numbers")
    }
}

try {
    const { height, weight } = validateInput(process.argv)
    console.log(calculateBmi(height, weight));
} catch (e) {
    console.log("Something went wrong", e)
}     
