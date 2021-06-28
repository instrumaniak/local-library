/**
 * Handle form errors
 */

import { useState } from 'react'

// Hook for using in function based components
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

// HOC for using with class based components
export function withFormErrors(WrappedComponent) {
  return function (props) {
    const errorProps = useFormErrors()
    return <WrappedComponent {...props} {...errorProps} />
  }
}

export default useFormErrors
