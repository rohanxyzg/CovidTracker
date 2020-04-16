const router = require('express').Router();
let Stats = require('../models/stats.model');

router.route('/').get((req, res) => {
  Stats.find()
    .then(stats => res.json(stats))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const countryname = req.body.countryname;
  const confirmed = Number(req.body.confirmed);
  const recovered = Number(req.body.recovered);
  const deaths = Number(req.body.deaths);
  const newStats = new Stats({
    countryname,
    confirmed,
    recovered,
    deaths,
  });
  newStats.save()
  .then(() => res.json('Stats added!'))
  .catch(err => res.status(400).json('Error: ' + err));


});

router.route('/:id').get((req, res) => {
  Stats.findById(req.params.id)
    .then(stats => res.json(stats))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Stats.findByIdAndDelete(req.params.id)
    .then(() => res.json('Stats deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Stats.findById(req.params.id)
    .then(stats=> {
      stats.countryname = req.body.countryname;
      stats.confirmed = Number(req.body.confirmed);
      stats.recovered = Number(req.body.recovered);
      stats.deaths = Number(req.body.deaths);

      stats.save()
        .then(() => res.json('Stats updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


 

module.exports = router;