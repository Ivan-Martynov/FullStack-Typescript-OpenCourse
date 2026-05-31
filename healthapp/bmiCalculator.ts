const calculateBmi = (heightCm: number, massKg: number): string => {
    if (heightCm <= 0 || massKg <= 0) {
        throw new Error("Values should be positive numbers");
    }

    const h = heightCm * 0.01;
    const k = massKg / (h * h);
    if (k < 16.0) {
        return "Underweight (Severe thinness)";
    } else if (k < 17.0) {
        return "Underweight (Moderate thinness)";
    } else if (k < 18.5) {
        return "Underweight (Mild thinness)";
    } else if (k < 25.0) {
        return "Normal range";
    } else if (k < 30.0) {
        return "Overweight (Pre-obese)";
    } else if (k < 35.0) {
        return "Obese (Class I)";
    } else if (k < 40.0) {
        return "Obese (Class II)";
    } else {
        return "Obese (Class III)";
    }
};

const parseBmiArguments = (
    args: string[],
): { heightCm: number; massKg: number } => {
    if (args.length < 3) {
        throw new Error("Provide height in centimeters and mass in kilograms");
    } else if (args.length < 4) {
        throw new Error("Provide also mass in kilograms");
    } // Ignoring any extra arguments as the program will not use them

    const heightArg = Number(args[2]);
    const massArg = Number(args[3]);
    if (isNaN(heightArg) || isNaN(massArg)) {
        throw new Error("Inputs should be numerics");
    }
    return { heightCm: heightArg, massKg: massArg };
};

try {
    const { heightCm, massKg } = parseBmiArguments(process.argv);
    console.log(calculateBmi(heightCm, massKg));
} catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.error(errorMessage);
}
