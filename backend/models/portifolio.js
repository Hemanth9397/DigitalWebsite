import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String
});

const technicalSkillsSchema = new mongoose.Schema( {
        frontend: [
            String
        ],
        backend: [
            String
        ],
        database: [
           String
        ],
        versionControl: [
           String
        ],
        toolsAndUtilities: [
           String
        ]
    });

const portfolioSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    shortNote: String,
    aboutMe: String,
    projects: [projectsSchema],
    technicalSkills: technicalSkillsSchema
});

export const Portfolio = mongoose.model('Portfolio', portfolioSchema);