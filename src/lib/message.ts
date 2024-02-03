export type Message = {
  title: string;
  description: string;
};

export type AuthErrorType =
  | 'INVALID_FIELDS'
  | 'EMAIL_ALREADY_EXIST'
  | 'INVALID_CREDENTIALS'
  | 'SIGN_OUT_ERROR'
  | "UNKNOWN";

export const mapAuthErrorToMessage = (type: AuthErrorType): Message => {
  switch (type) {
    case 'EMAIL_ALREADY_EXIST':
      return {
        title: 'Email Already in Use.',
        description:
          'Uh-oh! It looks like the email address you entered is already associated with an existing account.',
      };
    case 'INVALID_FIELDS':
      return {
        title: 'Oops! Something Went Wrong.',
        description:
          "It seems there's an issue with the information you provided. Please double-check your details and ensure all required fields are filled correctly.",
      };
    case 'INVALID_CREDENTIALS':
      return {
        title: 'Authentication Failed',
        description:
          "We're sorry, but the credentials you entered are not valid. Please double-check your username and password.",
      };
      case "SIGN_OUT_ERROR":
        return {
          title: "Logout Unsuccessful",
          description: "We encountered a problem while trying to log you out. Please try again."
        }
    case "UNKNOWN":
    default:
      return {
        title: 'Technical Difficulties.',
        description:
          "We're experiencing some technical difficulties on our end. Our team is working hard to fix the issue. Please try again later.",
      };
  }
};
