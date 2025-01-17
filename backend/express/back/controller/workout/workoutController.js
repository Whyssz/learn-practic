import asyncHandler from 'express-async-handler';
import Workout from '../../models/workout/workoutModel.js';

// @desc   Create new workout
// @route  POST /api/workouts
// @access Private
export const createNewWorkout = asyncHandler(async (req, res) => {
  const { name, exerciseIds } = req.body;

  const workout = await Workout.create({
    name,
    exercises: exerciseIds,
  });

  res.json(workout);
});

// @desc   Get workout
// @route  GET /api/workouts/:id
// @access Private
export const getWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id)
    .populate('exercises')
    .lean();

  const minutes = Math.round(workout.exercises.length * 3.7);

  // res.json({ ...workout.toObject(), minutes });
  res.json({ ...workout, minutes });
});

// @desc   Update workout
// @route  PUT /api/workouts
// @access Private
export const updateWorkout = asyncHandler(async (req, res) => {
  const { name, exerciseIds, workoutId } = req.body;

  const workout = await Workout.findById(workoutId);

  if (!workout) {
    res.status(404);
    throw new Error('Данное тренировка не найдено!');
  }

  workout.name = name;
  workout.exerciseIds = exerciseIds;

  const updatedWorkout = await workout.save();

  res.json(updatedWorkout);
});

// @desc   Delete workout
// @route  PUT /api/workouts
// @access Private
export const deleteWorkout = asyncHandler(async (req, res) => {
  const { workoutId } = req.body;

  const workout = await Workout.findById(workoutId);

  if (!workout) {
    res.status(404);
    throw new Error('Данная тренировка не найдена!');
  }

  await workout.remove();

  res.json({ message: 'Workout has been removed' });
});

// @desc   Get workouts
// @route  GET /api/workouts
// @access Private
export const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({}).populate('exercises');

  res.json(workouts);
});
