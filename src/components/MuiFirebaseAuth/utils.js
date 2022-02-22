import { isEmpty } from "lodash"

export const BASE_CLASS_NAME = 'muifirebaseauth'

export const addErrorIfEmpty = (errors, attributes, attribute, message) => {
  if (isEmpty(attributes[attribute])) {
      errors[attribute] = []
      errors[attribute].push(message)
    }
}

export const cssClassName = (clss) => `${BASE_CLASS_NAME}-${clss}`