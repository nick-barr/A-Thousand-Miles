const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Itinerary = require("../../models/Itinerary");
const User = require("../../models/User");
const Attraction = require("../../models/Attraction")
const validateItineraryInput = require("../../validation/itinerary");

router.get('/', (req, res) => {
    Itinerary.find()
        .then(itineraries => res.json(itineraries))
        .catch(err => res.status(404).json({ message: 'No itineraries found' }));
});

router.get('/user/:user_id', (req, res) => {
    Itinerary.find({ user: req.params.user_id })
        .then(itineraries => res.json(itineraries))
        .catch(err =>
            res.status(404).json({ message: 'No itineraries found from that user' }
            )
        );
});

router.get('/:id', (req, res) => {
    Itinerary.findById(req.params.id)
        .then(itinerary => res.json(itinerary))
        .catch(err =>
            res.status(404).json({ message: 'No itinerary found with that ID' })
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateItineraryInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newItinerary = new Itinerary({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            start_address: req.body.start_address,
            end_address: req.body.end_address,
            start_lat: req.body.start_lat,
            start_lng: req.body.start_lng,
            end_lat: req.body.end_lat,
            end_lng: req.body.end_lng,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
        });
        newItinerary.save()
            .then(itinerary => {
                res.json(itinerary)
            })
            .catch(err => console.log(err));
    }
);

router.put('/:id/:attraction_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Itinerary.findById(req.params.id)
            .then(itinerary => {
                // Attraction.findById(req.params.attraction_id)
                //     .then(attraction => {
                //         if(!itinerary.attractions.includes(attraction.id)){
                //             itinerary.attractions.push(attraction);
                //             itinerary.save();
                //         }

                //         if(!attraction.itineraries.includes(itinerary.id)){
                //             attraction.itineraries.push(itinerary);
                //             attraction.save();
                //         }
                //     })
                res.json(itinerary)
            })
            .catch(err =>
                res.status(404).json({ message: 'No itinerary found with that ID' })
            );
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Itinerary.findById(req.params.id)
        .then(itinerary => {
                if(req.user.id === itinerary.user.toString()){
                    itinerary.remove()
                    res.json(itinerary)
                } else {
                    res.status(401).json({message: "This itinerary does not belong to this user"})
                }
            })
            .catch(err =>
                res.status(404).json({ message: 'No itinerary found with that ID' })
            );
    }
);



module.exports = router;