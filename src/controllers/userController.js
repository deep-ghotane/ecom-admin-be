export const getUserDetail = (req, res) => {
  res.send({
    status: "success",
    message: "User Details Found",
    user: req.user,
  });
};
