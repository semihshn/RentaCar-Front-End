import { HttpErrorResponse } from '@angular/common/http';

export class ErrorHelper {
  static getMessage(error: HttpErrorResponse): string {
    console.log(error);
    // Validation Hata Yakalama
    if (error.error.ValidationErrors != null) {
        console.log('Validation error run');
      let validationErrors = error.error.ValidationErrors;
      let errorMessages: string = '';
      for (let i = 0; i < validationErrors.length; i++) {
        const error = validationErrors[i];
        errorMessages += "\n"+error.ErrorMessage;
      }
      return errorMessages;
    } else {
      return error.error.message;
    }
  }
}