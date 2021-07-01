function solveMaze(maze, start, end) {
  validateParams(maze, start, end);

  const result = checkPath(maze, start, end);

  return result ? { solved: true, way: result } : { solved: false, way: [] };
}

function validateParams(maze, start, end) {
  const hasRequiredCoords = (position) =>
    ['x', 'y'].every(
      (coordName) =>
        Object.keys(position).includes(coordName) && typeof position[coordName] === 'number',
    );

  if (!Array.isArray(maze) || !maze.length) {
    throw new Error('Maze is not array or empty');
  }

  if (!start || !hasRequiredCoords(start)) {
    throw new Error(
      'Start position has wrong format or corrd type: { x: number, y: number } needed',
    );
  }

  if (!end || !hasRequiredCoords(end)) {
    throw new Error('End position has wrong format or coord type: { x: number, y: number } needed');
  }
}

function getValidSib(tempMaze, { x, y }) {
  const cords = [];

  if (tempMaze[y - 1] !== undefined) {
    cords.push({ x, y: y - 1, val: tempMaze[y - 1][x] });
  }

  if (tempMaze[y + 1] !== undefined) {
    cords.push({ x, y: y + 1, val: tempMaze[y + 1][x] });
  }

  if (tempMaze[y][x - 1] !== undefined) {
    cords.push({ x: x - 1, y, val: tempMaze[y][x - 1] });
  }

  if (tempMaze[y][x + 1] !== undefined) {
    cords.push({ x: x + 1, y, val: tempMaze[y][x + 1] });
  }

  return cords.filter((crd) => crd.val === '+');
}

function checkPath(maze, start, end, way = []) {
  const siblings = getValidSib(maze, start);

  if (!siblings.length) {
    return false;
  }

  maze[start.y][start.x] = 1;

  for (const sibling of siblings) {
    if (sibling.x < start.x) {
      way.push('left');
    }

    if (sibling.x > start.x) {
      way.push('right');
    }

    if (sibling.y < start.y) {
      way.push('top');
    }

    if (sibling.y > start.y) {
      way.push('bottom');
    }

    const isSolved = sibling.x === end.x && sibling.y === end.y;
    const notVisited = maze[sibling.y][sibling.x] !== 1;

    if (isSolved || (notVisited && checkPath(maze, sibling, end, way))) {
      return way;
    }
  }
}

module.exports = solveMaze;
