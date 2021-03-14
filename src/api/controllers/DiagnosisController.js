module.exports = {
  async index(req,res) {
    try {
      return res.status(200).json({"message":"Servidor ok"});
    } catch (error) {
      return res.status(500).json({
        "message-error": "There was a problem when handling this request.",
    });
    }
  }
}
