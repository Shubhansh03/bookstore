import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

//Route for save a new book
router.post('/', async (req,res) => {
  try{
    if(!req.body.title || !req.body.author || !req.body.publishYear){
      return res.status(400).send({
        message:'Send all required fields : title , author , publishYear',
      })
    }
    const newBook = {
      title: req.body.title,
      author:req.body.author,
      publishYear: req.body.publishYear,
    }

    const book = await Book.create(newBook);

    return res.status(201).send(book)
  }catch(error){
    console.log(error.message);
  }
} )

//getting all books

router.get('/', async (req,res) => {
  try{
    const books = await Book.find({});
    return res.json({
      count: books.length,
      data: books
    });
  }catch(error){
    console.log(error.message);
  }
} )

//getting one book woow

router.get('/:id', async (req,res) => {
  try{
    const {id} = req.params;

    const book = await Book.findById(id);
    return res.json(
      book
    ); 
  }catch(error){
    console.log(error.message);
  }
} )

//update a book by finding id

router.put('/:id', async (req,res) => {
  try{
    if(!req.body.title || !req.body.author || !req.body.publishYear){
      return res.status(400).send({
        message:'Send all required fields : title , author , publishYear',
      })
    }

    const {id} = req.params;

    const result = await Book.findByIdAndUpdate(id,req.body);

    if(!result){
      return res.json({message: "kuch toh gadbad hai !"})
    }

    return res.send({message:"book updated successfully"})
  }catch(error){
    console.log(error.message);
  }
} )


//delete a book by finding id

router.delete('/:id', async (req,res) => {
  try{

    const {id} = req.params;

    const result = await Book.findByIdAndDelete(id);

    if(!result){
      return res.json({message: "kuch toh gadbad hai !"})
    }

    return res.send({message:"book updated successfully"})
  }catch(error){
    console.log(error.message);
  }
} )

export default router;