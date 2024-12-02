import * as fs from 'fs';
import * as path from 'path';


interface Draw {
    red: number;
    green: number;
    blue: number;
}

interface Game {
    id: number;
    draws: Draw[];
}

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
    .trim()
    .split('\n');

const games: Game[] = input.map(rawGame => {
    const [rawId, rawDraws] = rawGame.split(':').map(x => x.trim());

    const id = Number(rawId.match(/\d+/)[0]);

    const draws = rawDraws
        .split(';')
        .map(rawDraw => {
            const draw: Draw = {red: 0, green: 0, blue: 0};

            const rawColors = rawDraw.split(',').map(x => x.trim());
            rawColors.forEach(rawColor => {
                const [rawCount, color] = rawColor.split(' ');
                const count = Number(rawCount);

                draw[color as keyof Draw] = count;
            });

            return draw;
        });

    return { id: id, draws: draws };
});

const possibleGames = games.filter(game => game.draws.every(draw => draw.red <= 12 && draw.green <= 13 && draw.blue <= 14));
const idsOfPossibleGames = possibleGames.map(game => game.id);
const sumOfIds = idsOfPossibleGames.reduce((x, y) => x + y);

console.log('sum of IDs of possible games:', sumOfIds);

const gamePowers = games.map(game => {
    const redDraws = game.draws.map(draw => draw.red);
    const greenDraws = game.draws.map(draw => draw.green);
    const blueDraws = game.draws.map(draw => draw.blue);

    const minimumRedCubes = Math.max(...redDraws);
    const minimumGreenCubes = Math.max(...greenDraws);
    const minimumBlueCubes = Math.max(...blueDraws);

    return minimumRedCubes * minimumGreenCubes * minimumBlueCubes;
});

const sumOfGamePowers = gamePowers.reduce((x, y) => x + y);

console.log('sum of game powers:', sumOfGamePowers);
