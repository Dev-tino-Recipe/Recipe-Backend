export const returnResponse = (success, message, ...result) => {
  return {
    isSuccess: success,
    message: message,
    result: result,
  };
};
