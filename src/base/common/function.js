export function pipe(...fns) {
  if (fns.length === 1) {
    return (arg) => fns[0](arg)
  }

  return fns.reduce((a, b) => {
    return (arg) => b(a(arg))
  })
}