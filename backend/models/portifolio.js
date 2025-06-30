import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String
});

const portfolioSchema = new mongoose.Schema({
    name: String,
    shortNote: String,
    aboutMe: String,
    projects: [projectsSchema],
    skills: [string]
});

export const Portfolio = mongoose.modal('Portfolio', portfolioSchema);