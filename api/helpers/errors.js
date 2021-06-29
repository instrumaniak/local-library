// Transforms mongoose model validation errors to express validator errors signature
exports.transformModelErrors = (modelErrors) => {
  let errors = []
  Object.keys(modelErrors).forEach((errorKey) => {
    errors.push({
      param: errorKey,
      msg: modelErrors[errorKey].message,
    })
  })
  return { errors }
}
