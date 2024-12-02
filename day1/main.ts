import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
    .trim()
    .split('\n');

const calibrationValues = input
    .map(entry => {
        const numbersInEntry = entry
            .trim()
            .split('')
            .map(Number)
            .filter(x => !isNaN(x));
        
        return (numbersInEntry[0] * 10) + numbersInEntry[numbersInEntry.length - 1];
    });

const calibrationValuesSum = calibrationValues.reduce((x, y) => x + y);

console.log('sum of calibration values:', calibrationValuesSum);

const numberSearch = new RegExp('(?=([1-9]|one|two|three|four|five|six|seven|eight|nine))', 'g');
const convertToNumber = (word: string) => {
    if (!Number.isNaN(Number(word))) {
        return Number(word);
    }

    switch (word) {
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
        default:
            throw new Error('Invalid number!');
    }

}

let numbersInEntries = [];
const trueCalibrationValues = input
    .map(entry => {
        const rawNumbersInEntry = [...entry.matchAll(numberSearch)].map(x => x[1]);
        const numbersInEntry = rawNumbersInEntry.map(convertToNumber);
        const firstNumber = numbersInEntry[0];
        const lastNumber = numbersInEntry[numbersInEntry.length - 1];

        return (firstNumber * 10) + lastNumber;
    });
console.log(numbersInEntries);
console.log('true calibration values:', trueCalibrationValues);

const trueCalibrationValuesSum = trueCalibrationValues.reduce((x, y) => x + y);
console.log('sum of true calibration values:', trueCalibrationValuesSum);
