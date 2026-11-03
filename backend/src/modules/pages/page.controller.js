import { Page } from './page.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const getPage = async (req, res, next) => {
  try {
    const name = req.params.name;
    let doc = await Page.findOne({ pageName: name });
    if (!doc) {
      doc = await Page.create({ pageName: name, content: {} });
    }
    res.status(200).json(new ApiResponse(200, doc, 'Loaded'));
  } catch (e) { 
    next(e); 
  }
};

export const updatePage = async (req, res, next) => {
  try {
    const name = req.params.name;
    const contentData = req.body.content || req.body;

    const doc = await Page.findOneAndUpdate(
      { pageName: name },
      { $set: { pageName: name, content: contentData } },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json(new ApiResponse(200, doc, 'Updated'));
  } catch (e) { 
    next(e); 
  }
};