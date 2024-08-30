const validationToken = (ctx: any) => {
  if(!ctx.member) {
    throw new Error("Unauthentication")
  }
}

export {
  validationToken
}