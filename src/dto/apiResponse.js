export default {
  success: ({message, result}) => {
    return {
      isSuccess: true,
      message,
      result
    }
  },
  failure: ({message, result}) => {
    return {
      isSuccess: false,
      message,
      result
    }
  }
}