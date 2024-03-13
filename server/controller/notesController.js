const Note = require('../models/Note');
const User = require('../models/User');
class NoteController {
  async get(req, res) {
    try {
      res.json(await Note.find());
      
    } catch (error) {
      
    }
  }

  async getByUserId(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).populate('notes');
      console.log(user);
      if (!user) {
       return res.status(400).json({message: "Не существует пользователя с таким id"})
      }
      console.log(user.notes);
      res.status(200).json(user.notes);
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: "Ошибка запроса"})
    }
  }

  async post(req, res) {
    try {
      const {title, body, userId} = req.body
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(400).json({message: "Ненайден пользователь, которому приписывается запись"})
      }
      const note = new Note({
        title,
        body,
        user
      });
      const userNotes = user.notes;
      userNotes.push(note._id)
      await User.updateOne(user, {notes: userNotes});
      await user.save();
      await note.save();
      res.json(note);
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: "Ошибка добавления поста"})
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