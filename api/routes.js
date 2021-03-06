const express =require('express');
const router = express.Router();
const { sequelize, User, Course} =require('./models');
const bcrypt =require('bcrypt');

const { authenticateUser} = require('./middleware/auth-user');
const asyncHandler=(cb)=>
{
    

    
    return async (req,res,next) =>
    {
        try{
            await cb(req,res,next);
        }
        catch(err)
        {
            next(err);
        }
    }
}

//return currently authenicated user with 200 HTPP status code
router.get('/users', authenticateUser,asyncHandler( async (req,res)=>{
    const user = req.currentUser;
   
    currentUser = await User.findByPk(user.dataValues.id);
    console.log(currentUser);

    res.status(200).json(currentUser);
    
}));

//Creates a new user return 201 status code, set location header to "/"
router.post('/users', asyncHandler( async (req,res) =>
{
    
    try {
        const errors=[];
        console.log(req.body);
        const user =req.body;
        if(!user.firstName)
        {
            errors.push("Please provide a firstName")
        }

        if(!user.lastName)
        {
            errors.push("Please provide a lastName")
        }
        if(!user.emailAddress)
        {
            errors.push("Please an Email Address")
        }

        let password =user.password;
        if(!password)
        {
            errors.push("Please enter a password for the account.")
        }
        else
        {user.password =bcrypt.hashSync(password,10);}

        if(errors.length > 0)
        {
            res.status(400).json({errors});
        }
        else
       { await User.create(user);
        res.redirect(201,'/');}

    }
    catch(error)
    {
        console.log('Error' , error.name);

        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError')
        {
            const errors = error.errors.map( err => err.message);
            res.status(400).json({errors});   
        }

        else{
            throw error;
        }
    }
    
} ))


//Return a list of all courses and the user that owns each course and 200 status
router.get('/courses', asyncHandler( async (req,res)=>
{
    let courses = await Course.findAll({
        include:[
            {
                model:User,attributes:{
                   exclude: ['password', 'createdAt','updatedAt']
            
            }
            },

        ]
        ,
        attributes : {exclude: ['password', 'createdAt','updatedAt']}
    });
    res.status(200).json(courses);
}));

//Returns a single course and the user it belongs to 
router.get('/courses/:id', asyncHandler( async (req, res) =>
{
    let course = await Course.findByPk(req.params.id, {include:User});
    res.status(200).json(course);

}) );

// Creates a new course
router.post('/courses', authenticateUser,asyncHandler( async (req, res) =>
{

    try {
        const course = req.body;
        const user = req.body;
        console.log(user);
        console.log(course);
        const errors = [];
        if (!course.title) {
            errors.push("Please provide a title for the course");
            console.log("Title not there")
        }

        if (!course.description) {
            errors.push('Please Provide a Description for the course');

        }

        if (errors.length > 0) {
            console.log(errors);
            res.status(400).json({ errors });
        }
        else {
            console.log("We are adding the course")
            const newCourse = await Course.create(course);
            console.log(`This is the new course ${newCourse}`);
            return res.redirect(`/courses/${newCourse.id}`, 201);
        }
    }
    catch (error) {

        console.log('Error', error.name);

        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {

            const errors = error.errors.map(err => err.message);
            res.json(400).json({ errors });
        }

        else {
            throw error;
        }
    }


}));

//Update the course with the id
router.put('/courses/:id', authenticateUser,asyncHandler( async (req,res) =>
{
    const course=await Course.findByPk(req.params.id);
   
    const errors =[];
    
    const updateCourse=req.body;
    
    if(!updateCourse.title)
    {
        errors.push("Please provide a title for the course");
    }

    if(!updateCourse.description)
        {
            errors.push('Please Provide a Description for the course');

    }

    if(errors.length >0)
    {
        res.status(400).json({errors});
    }
    else
    {
        await course.update(req.body);
        res.redirect(204,'/courses/:id');
    }
   
}));

//Delete the course witht this id
router.delete('/courses/:id',authenticateUser ,asyncHandler( async (req, res) => {
    const course=await Course.findByPk(req.params.id);
    if(course)
    {
        await course.destroy();
        res.status(204).end();
    }
}));

module.exports = router;