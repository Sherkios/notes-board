const Note = require('../models/Note');

class NoteController {
  async get(req, res) {
    try {
      res.json(await Note.find());
      
    } catch (error) {
      
    }
  }

  async getById(req, res) {
    try {
      res.json(await Note.findById(req.params.id));      
    } catch (error) {
      
    }
  }

  async post(req, res) {
    try {
      const user = new Note(req.body);
      await user.save();
      res.json({state: 'success'});
    } catch (error) {
      
    }
  }

  async put(req, res) {
    try {
      await Note.findByIdAndUpdate(req.params.id, req.body);
      res.json({state: 'updated'});
    } catch (error) {
      
    }
  }

  async delete(req, res) {
    try {
      await Note.findByIdAndRemove(req.params.id);
      res.json({state: 'deleted'});
    } catch (error) {
      
    }
  }
}

module.exports = new NoteController();