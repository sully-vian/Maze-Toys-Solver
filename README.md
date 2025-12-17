# Maze-Toys-Solver

Solver for [Maze Toys](https://maze.toys/) challenges.

## Notes

## Objective

Generate the list of instructions to finish the puzzle or directly write to the `path` variable.

## Available data

The maze data is stored in the `cells` and `grid` variables (directly accessible in the console).

The current path is in the `path` variable.

To move, the `tryMove` function can be called with `down`, `up`, `right`, `left` as argument.

The `cells` variable is an array which first element is a matrix of `[top,right,bottom,left]` arrays where each of these elements is either 0 (wall) or 1 (no wall).
