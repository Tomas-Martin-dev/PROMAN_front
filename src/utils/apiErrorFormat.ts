export function formatErrorMessages(error: any) {
    if (error?.response?.data?.errors) {
      return error.response.data.errors.map((e: any) => e.msg).join(" | ");
    }
    return "Campos invalidos";
  }