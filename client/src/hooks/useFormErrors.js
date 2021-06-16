import { useState } from 'react'

function useFormErrors() {
  const [formErrors, setFormErrors] = useState([]) // used for server side errors
  const getParamError = (param) => formErrors.find((er) => er.param === param) // extract error message
  const hasFormValidationError = (param) =>
    getParamError(param) ? 'is-invalid' : '' // used for bootstrap css class

  return {
    formErrors,
    setFormErrors,
    getParamError,
    hasFormValidationError,
  }
}

export default useFormErrors
