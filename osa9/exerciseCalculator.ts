interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (target: number, exercises: Array<number>): Result => {
    const periodLength = 7;
    const averageDailyTime: number = exercises.reduce((a, b) => a + b, 0) / periodLength;
    let rating: number = 1;
    let success: boolean = false;
    const ratingMap: { [key: string]: string } = {
        1: "Nope, not so good",
        2: "You've done enough",
        3: "That's great"
    }

    if (averageDailyTime > target) {
        success = true;
        rating = 3;
    }

    if (averageDailyTime == target) {
        success = true;
        rating = 2;
    }

    return {
        periodLength: periodLength,
        trainingDays: exercises.filter(e => e > 0).length,
        success: success,
        rating: rating,
        ratingDescription: ratingMap[rating],
        target: target,
        average: averageDailyTime
    }
}

interface exerciseInput {
    target: number,
    exercises: Array<number>
}

const validateExerciseInput = (args: Array<string>): exerciseInput => {
    const target = Number(process.argv[2]);
    const exercises = (process.argv.slice(3)).map(e => Number(e));
    const periodLength = exercises?.length;

    if (isNaN(target)) {
        throw new Error("You didn't provide target");
    }

    if (!exercises) {
        throw new Error("You didn't provide exercises");
    }

    return {
        target, exercises
    }
}

try {
    const { target, exercises } = validateExerciseInput(process.argv)
    console.log(calculateExercises(target, exercises));
} catch (e) {
    console.log("Something went wrong", e)
}
