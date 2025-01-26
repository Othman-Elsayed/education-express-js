const uploadFile = asyncHandler(async (req, res, next) => {
  let data = await Schema.findById(req.params.id).populate(
    "subjects schoolSystems levelsGrades",
    "name img"
  );
  if (!data) return next(new ApiError("Invalid tutor id."));
  return res.json(new ApiSuccess(data, "Fetch tutor successfully."));
});
