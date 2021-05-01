const router = require('express').Router();
const { mongo } = require('mongoose');
const db = require("../../models");

router.get('/', async (req, res) => {
    try {
      const dbWorkout = await db.Workout.aggregate([
          { 
              $addFields: 
                { 
                  totalDuration: {$sum: "$exercises.duration"},
                }
                }
            ]);
      
      res.status(200).json(dbWorkout);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', (async (req, res) => {
    try {
        const newWorkout = await db.Workout.create(req.body)
        
        res.status(200).json(newWorkout)
    } catch (err) {
        res.status(500).json(err)
    }
}))

router.put('/:id', async (req, res) => {
    console.log(req.params.id )
   try {
       const updateWorkout = await db.Workout.findOneAndUpdate(
           {
               _id: req.params.id
           },
           {
               $set: {exercises: req.body }
           },
           )

    console.log(updateWorkout)
       res.status(200).json(updateWorkout)
   } catch (err) {
       res.status(500).json(err)
   }
    
});

router.get('/range', async (req, res) => {
    try {
        const rangeWorkout = await db.Workout.aggregate([
            { 
                $addFields: 
                  { 
                    totalDuration: {$sum: "$exercises.duration"},
                  }
                  }
              ]).limit(7);
        
        res.status(200).json(rangeWorkout)
    } catch (err) {
        res.status(500).json(err)
    }
})




module.exports = router;