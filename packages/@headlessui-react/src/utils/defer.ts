export function defer<T>() {
  let actions: { resolve: (value: T | PromiseLike<T>) => void; reject: (reason?: any) => void } = {
    resolve: () => {},
    reject: () => {},
  }

  let state = {
    promise: new Promise<T>((resolve, reject) => {
      Object.assign(actions, { resolve, reject })
    }),
  }

  return {
    get promise() {
      return state.promise
    },
    resolve(value: T | PromiseLike<T>) {
      return actions.resolve(value)
    },
    reject(reason?: any) {
      return actions.reject(reason)
    },
    reset() {
      state.promise = new Promise<T>((resolve, reject) => {
        Object.assign(actions, { resolve, reject })
      })
    },
  }
}
