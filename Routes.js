import { v4 as uuidv4 } from 'uuid';
import { Student } from "./Student.js";
import { Router } from 'express';
import { getItemById, addItem } from './service.js';

let route = new Router();

route.get('/student/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await getItemById(userId);
        res.send(result);
    } catch(err) {
        res.send(err);
    }
});

// route.delete('/student/:id', async (req, res) => {

// });

route.post('/student',async (req, res) => {
    const student = new Student(uuidv4(), req.body.name, req.body.lastName);
    try {
        await addItem(student);
        res.send('Student created successfully!');
    } catch(err) {
        res.send(err);
    }
});

export default route;