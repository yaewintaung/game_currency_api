const ErrorMessage = (error: any): object => {
  if (error instanceof Error) {
    return { error: error.message };
  } else {
    return { error: "An error occurred" };
  }
};

export default ErrorMessage;
