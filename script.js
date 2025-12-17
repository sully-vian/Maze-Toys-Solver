#!/usr/bin/env node

// transforms the raw cells array into an Adjacency List.
function createMazeGraph(rawCells) {
    const graph = {};
    const height = rawCells.length / 2;
    const width = rawCells[0].length;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cellWalls = rawCells[y][x]; // Format: [Top, Right, Bottom, Left]
            const neighbors = [];

            // 0: Top (y - 1)
            if (cellWalls[0] === 1) neighbors.push(`${x},${y - 1}`);

            // 1: Right (x + 1)
            if (cellWalls[1] === 1) neighbors.push(`${x + 1},${y}`);

            // 2: Bottom (y + 1)
            if (cellWalls[2] === 1) neighbors.push(`${x},${y + 1}`);

            // 3: Left (x - 1)
            if (cellWalls[3] === 1) neighbors.push(`${x - 1},${y}`);

            graph[`${x},${y}`] = neighbors;
        }
    }
    return graph;
}

function solveMazeBFS(graph, startNode, endNode) {
    const queue = [startNode];
    const visited = new Set([startNode]);
    const parents = {}; // track "parent" to reconstruct the path

    while (queue.length > 0) {
        const current = queue.shift();
        // finished
        if (current === endNode) {
            return reconstructPath(parents, startNode, endNode);
        }

        for (const neighbor of graph[current]) {
            if (visited.has(neighbor)) {
                continue;
            }
            visited.add(neighbor);
            parents[neighbor] = current; // record where we came from
            queue.push(neighbor);
        }
    }
    return null; // path not found
}

function reconstructPath(parents, start, end) {
    const path = [];
    let current = end;
    while (current !== undefined) {
        path.unshift(current);
        current = parents[current];
    }
    return path;
}

function getDirections(path) {
    const directions = [];
    for (let i = 1; i < path.length; i++) {
        const from = path[i - 1];
        const to = path[i];

        const [fromX, fromY] = from.split(",").map(Number);
        const [toX, toY] = to.split(",").map(Number);

        if (toX > fromX) directions.push("right"); // Corresponds to cells[y][x][1]
        if (toX < fromX) directions.push("left"); // Corresponds to cells[y][x][3]
        if (toY > fromY) directions.push("down"); // Corresponds to cells[y][x][2]
        if (toY < fromY) directions.push("up"); // Corresponds to cells[y][x][0]
    }
    return directions;
}

async function main() {
    const graph = createMazeGraph(cells);
    const startCell = "0,0";
    const endCell = `${cells.length / 2 - 1},${cells[0].length - 1}`;
    const computedPath = solveMazeBFS(graph, startCell, endCell);
    const directions = getDirections(computedPath);

    console.log(`Path found with ${directions.length} steps`);

    for (const direction of directions) {
        tryMove(direction);
        await new Promise((r) => setTimeout(r, 0)); // wai
    }

    console.log("Maze Solved!");
}
