import asyncHandler from 'express-async-handler';
import Project from "../models/projectModel.js";


const getProjects = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalProjects = await Project.countDocuments({});
  const projects = await Project.find({user:req.user.id})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)

  res.json({
    projects,
    totalProjects,
    totalPages: Math.ceil(totalProjects / limit),
    currentPage: page,
  });
});

const getProject = asyncHandler (async(req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

const createProject = asyncHandler (async(req, res) => {
  const { title, description, startDate, endDate, status } = req.body;
  try {
    const existingProject = await Project.findOne({ title });
    if (existingProject) {
      return res.status(400).json({ message: 'Project title already exists' });
    }
    const newProject = new Project({
      title,
      description,
      startDate,
      endDate,
      status,
      user: req.user.id
    });
    const project = await newProject.save();
    res.json(project);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

const updateProject = asyncHandler (async(req, res) => {
  const { title, description, startDate, endDate, status } = req.body;
  const projectFields = { title, description, startDate, endDate, status };
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    project = await Project.findByIdAndUpdate(req.params.id, { $set: projectFields }, { new: true });
    res.json(project);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

const deleteProject = asyncHandler (async(req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    await Project.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Project removed' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

export {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
  };