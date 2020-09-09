module.exports = (req, res, modelPromise) => {
  const { body } = req;
  modelPromise(body).then(
    (success) => res.status(200).json(success),
    (error) => res.status(200).json(error)
  );
};
