export default {
  toUserDetail(user) {
    return {
      ...user,
      password: undefined,
      sessionId: undefined,
    }
  }
}