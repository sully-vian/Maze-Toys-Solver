# Maze-Toys-Solver

Solver for [Maze Toys](https://maze.toys/) challenges.

To use, just paste the following in your web console:

```js
document.head.appendChild(Object.assign(document.createElement('script'), {src: 'https://rawcdn.githack.com/sully-vian/Maze-Toys-Solver/refs/heads/main/script.js'}));
```

And then start with:

```js
main();
```

## Notes

## Objective

Generate the list of instructions to finish the puzzle or directly write to the `path` variable.

## Available data

The maze data is stored in the `cells` and `grid` variables (directly accessible in the console).

The current path is in the `path` variable.

To move, the `tryMove` function can be called with `down`, `up`, `right`, `left` as argument.

The `cells` variable is an array which first element is a matrix of `[top,right,bottom,left]` arrays where each of these elements is either 0 (wall) or 1 (no wall).

## TODO

click the move buttons or dispatch arrowKey events instead of calling tryMove for more legal cheating
