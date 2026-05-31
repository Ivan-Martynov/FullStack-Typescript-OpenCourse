interface InputData {
    target: number;
    values: number[];
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
    if (hours.some((h) => h < 0)) {
        throw Error("Hour values should be non-negative");
    } else if (target < 0) {
        throw Error("Target should be non-negative");
    }

    const periodLength = hours.length;
    const average = periodLength
        ? hours.reduce((a, b) => a + b, 0) / periodLength
        : 0;

    const success = average >= target;
    // The success already eliminates zero division problem.
    const rating = success ? 3 : average / target < 0.5 ? 1 : 2;
    return {
        periodLength,
        trainingDays: hours.filter((h) => h > 0).length,
        target,
        average,
        success,
        rating,
        ratingDescription:
            rating === 3
                ? "Very good! Keep it up"
                : rating === 2
                  ? "Not bad, but you can do better"
                  : "Don't forget to exercise more systematically",
    };
};

const parseExerciseArguments = (args: string[]): InputData => {
    if (args.length < 4) {
        throw new Error("Provide a target and at least one value");
    }

    let target = 0;
    const values: number[] = [];
    for (let i = 2; i < args.length; ++i) {
        const arg = Number(args[i]);
        if (isNaN(arg)) {
            throw new Error("Inputs should be numerics");
        }

        if (i === 2) {
            target = arg;
        } else {
            values.push(arg);
        }
    }
    return { target, values };
};

try {
    const { target, values } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(values, target));
} catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.error(errorMessage);
}
