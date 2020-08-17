const plusInit = func => {
  if (window.plus) {
    func()
  } else {
    document.addEventListener('plusready', func, false)
  }
}

export default plusInit
