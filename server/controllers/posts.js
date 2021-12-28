import mongoose from "mongoose"
import express from 'express'
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res)=>{
    try {
        const postMessages = await PostMessage.find()

        console.log(postMessages)
        
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const {searchQuery, tags} = req.query
    
    try {
        const title = new RegExp(searchQuery, 'i')
        const posts = await PostMessage.find({title})
        res.json({data:posts})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req,res)=>{
    const {id: _id} = req.params
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No request with that id') 
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true})

    res.json(updatedPost)
}

export const deletePost = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No request with that id')

    await PostMessage.findByIdAndRemove(id)
    console.log('DELETE')

    return res.json({message:'Post deleted succesfully'})

}

export const likePost = async (req,res)=>{
    const {id} = req.params

    if(!req.userId) return res.json({message: 'Unauthenticated'})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No request with that id')
    const post = await PostMessage.findById(id)
    const index = post.calls.findIndex((id)=> id ===String(req.userId))
    if(index===-1){
        post.calls.push(req.userId)
    }else{
        post.calls = post.calls.filter((id)=>id!==String(req.userId))
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new:true})

    res.json(updatedPost)
}