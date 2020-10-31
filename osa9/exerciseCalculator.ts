interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (exercises: Array<number>): Result => {
    const periodLength = 7;
    const averageDailyTime: number = exercises.reduce((a, b) => a + b, 0) / periodLength;
    const target: number = 1.5;
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
        trainingDays: exercises.length,
        success: success,
        rating: rating,
        ratingDescription: ratingMap[rating],
        target: target,
        average: averageDailyTime
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));